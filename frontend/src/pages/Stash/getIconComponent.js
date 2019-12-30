import {
  File,
  FileBinary,
  FileCode,
  FileMedia,
  FilePdf,
  FileZip,
} from '@primer/octicons-react';

const getExtIconMap = () => {
  const iconConfigs = [
    { icon: FileZip, exts: ['zip', 'rar', 'tar', 'tar.gz', 'tgz'] },
    { icon: FileMedia, exts: ['mp3', 'wav'] },
    { icon: FileMedia, exts: ['mp4', 'avi', 'rmvb', 'mkv', 'ogg'] },
    { icon: FileMedia, exts: ['png', 'jpg', 'gif'] },
    { icon: FilePdf, exts: ['pdf'] },
    { icon: FileCode, exts: ['html', 'css', 'js', 'php', 'sh', 'json'] },
    { icon: FileBinary, exts: ['exe', 'msi', 'apk', 'dmg'] },
    { icon: File, exts: ['xls', 'xlsx'] },
    { icon: File, exts: ['doc', 'docx'] },
    { icon: File, exts: ['ppt', 'pptx'] },
    { icon: File, exts: ['txt', 'md', ''] },
  ];

  const map = {};
  iconConfigs.forEach(({ icon, exts }) => {
    exts.forEach(ext => {
      map[ext] = icon;
    });
  });

  return map;
};

const extname = filename => {
  const ext = filename.includes('.') ? filename.split('.').pop() : '';
  return ext.toLowerCase();
};

const extIconMap = getExtIconMap();

/**
 * @param {string} filename
 * @return {ElementType}
 */
export default function getIconComponent(filename) {
  const ext = extname(filename);
  return extIconMap[ext] || File;
}
