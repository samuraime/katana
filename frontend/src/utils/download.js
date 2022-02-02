/**
 * @param {string} url
 * @param {string} filename
 */
async function download(url, filename) {
  const data = await fetch(url).then((res) => res.blob());
  const a = document.createElement('a');
  const objectURL = URL.createObjectURL(data);
  a.href = objectURL;
  a.download = filename;
  a.click();
  URL.revokeObjectURL(objectURL);
}

export default download;
