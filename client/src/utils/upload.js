// https://developer.qiniu.com/kodo/manual/1650/chunked-upload

import { getAuthHeaders } from '../services/request';

const getLength = (chunk) => {
  if (chunk instanceof ArrayBuffer) {
    return chunk.byteLength;
  }
  return chunk.length;
};

const slice = (buffer, size, index) => buffer.slice(index * size, (index + 1) * size);

const post = (url, headers, body) => new Promise(async (resolve, reject) => {
  const response = await fetch(url, {
    method: 'POST',
    headers,
    body,
    mode: 'cors',
  });
  try {
    const json = await response.json();
    if (response.status !== 200) {
      throw new Error(json.error);
    }
    resolve(json);
  } catch (e) {
    reject(e);
  }
});

/**
 * @param {File} file
 */
const readFile = file => new Promise((resolve, reject) => {
  const fileReader = new FileReader();
  fileReader.addEventListener('load', () => {
    resolve(fileReader.result);
  });
  fileReader.addEventListener('error', reject);
  fileReader.readAsArrayBuffer(file);
});

// POST /mkblk/<blockSize> HTTP/1.1
// Host:           upload.qiniu.com
// Content-Type:   application/octet-stream
// Content-Length: <firstChunkSize>
// Authorization:  UpToken <UploadToken>
// <firstChunkBinary>
const makeBlock = (blockBuffer, firstChunkBuffer, token) => {
  const host = 'http://upload.qiniu.com';
  return post(`${host}/mkblk/${getLength(blockBuffer)}`, {
    'Content-Type': 'application/octet-stream',
    'Content-Length': getLength(firstChunkBuffer),
    Authorization: `UpToken ${token}`,
  }, firstChunkBuffer);
};

// POST /bput/<ctx>/<nextChunkOffset> HTTP/1.1
// Host:           <UpHost>
// Content-Type:   application/octet-stream
// Content-Length: <nextChunkSize>
// Authorization:  UpToken <UploadToken>
// <nextChunkBinary>
const postChunk = (chunkBuffer, lastChunk, token) => {
  const { host, ctx, offset } = lastChunk;
  return post(`${host}/bput/${ctx}/${offset}`, {
    'Content-Type': 'application/octet-stream',
    'Content-Length': getLength(chunkBuffer),
    Authorization: `UpToken ${token}`,
  }, chunkBuffer);
};

// POST /mkfile/<fileSize>/key/<encodedKey>/mimeType/<encodedMimeType>/x:user-var/<encodedUserVars> HTTP/1.1
// Host:           <UpHost>
// Content-Type:   text/plain
// Content-Length: <ctxListSize>
// Authorization:  UpToken <UploadToken>
// <ctxList>
const makeFile = (host, fileSize, ctxList, token) => (
  post(`${host}/mkfile/${fileSize}`, {
    'Content-Type': 'text/plain',
    'Content-Length': getLength(ctxList),
    Authorization: `UpToken ${token}`,
  }, ctxList)
);

const getUploadToken = async () => {
  const res = await fetch(`${API_URL}/upload/token`, {
    headers: getAuthHeaders(),
    mode: 'cors',
  });
  const { token } = await res.json();
  return token;
};

const upload = async (file, options = {}) => {
  const onProgress = options.onProgress || (() => {});
  const blockSize = 4 * 1024 * 1024; // 4MB
  const chunkSize = 256 * 1024; // 256KB
  const token = await getUploadToken();
  const fileBuffer = await readFile(file);
  const fileSize = fileBuffer.byteLength;
  let uploaded = 0;
  const blockCount = Math.ceil(fileSize / blockSize);
  const blockBuffers = Array(blockCount).fill(0)
    .map((_, index) => slice(fileBuffer, blockSize, index));
  const blockResults = await Promise.all(blockBuffers.map(async (blockBuffer) => {
    const chunkCount = Math.ceil(getLength(blockBuffer) / chunkSize);
    let lastUploadedChunk;
    // ctx 是 本次上传成功后的块级上传控制信息，用于后续上传片(bput)及创建文件(mkfile)。
    // 本字段是只能被七牛服务器解读使用的不透明字段，上传端不应修改其内容。
    // 每次返回的<ctx>都只对应紧随其后的下一个上传数据片，上传非对应数据片会返回701状态码。
    // checksum  是 上传块校验码。
    // crc32 是 上传块Crc32,客户可通过此字段对上传块的完整性进行校验。
    // offset  是 下一个上传块在切割块中的偏移。
    // host  是 后续上传接收地址。
    for (let i = 0; i < chunkCount; i++) {
      const chunkBuffer = slice(blockBuffer, chunkSize, i);
      if (i === 0) {
        lastUploadedChunk = await makeBlock(blockBuffer, chunkBuffer, token); // eslint-disable-line
      } else {
        lastUploadedChunk = await postChunk(chunkBuffer, lastUploadedChunk, token); // eslint-disable-line
      }
      uploaded += getLength(chunkBuffer);
      onProgress(uploaded, fileSize);
    }
    return lastUploadedChunk;
  }));
  const lastBlock = blockResults.slice(-1)[0];
  const ctxList = blockResults.map(b => b.ctx);
  const { hash, key } = await makeFile(lastBlock.host, fileSize, ctxList.join(','), token);
  const { name, size, type } = file;
  return {
    hash,
    key,
    name,
    size,
    type,
  };
};

export default upload;
