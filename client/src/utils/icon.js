const extname = (filename) => {
  const ext = filename.includes('.') ? filename.split('.').pop() : '';
  return ext.toLowerCase();
};

const icons = [
  { icon: 'file-archive-o', code: 0xf1c6, exts: ['zip', 'rar', 'tar', 'tar.gz', 'tgz'] },
  { icon: 'file-audio-o', code: 0xf1c7, exts: ['mp3', 'wav'] },
  { icon: 'file-video-o', code: 0xf1c8, exts: ['mp4', 'avi', 'rmvb', 'mkv', 'ogg'] },
  { icon: 'file-image-o', code: 0xf1c5, exts: ['png', 'jpg', 'gif'] },
  { icon: 'file-excel-o', code: 0xf1c3, exts: ['xls', 'xlsx'] },
  { icon: 'file-word-o', code: 0xf1c2, exts: ['doc', 'docx'] },
  { icon: 'file-powerpoint-o', code: 0xf1c4, exts: ['ppt', 'pptx'] },
  { icon: 'file-pdf-o', code: 0xf1c1, exts: ['pdf'] },
  { icon: 'file-code-o', code: 0xf1c9, exts: ['html', 'css', 'js', 'php', 'sh', 'json'] },
  { icon: 'file-text-o', code: 0xf0f6, exts: ['txt', 'md'] },
  { icon: 'file', code: 0xf15b, exts: ['exe', 'msi', 'apk', 'dmg'] },
  { icon: 'file-o', code: 0xf016, exts: [''] },
];

/**
 * fontawesome icon class by file extname
 */
export default function icon(filename) {
  const ext = extname(filename);
  const found = icons.find(d => d.exts.includes(ext));
  if (!found) {
    return icon('');
  }
  return String.fromCharCode(found.code);
}
