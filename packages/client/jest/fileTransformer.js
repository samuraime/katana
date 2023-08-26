import path from 'path';

export default {
  process(sourceText, sourcePath, options) {
    return {
      code: `export default ${JSON.stringify(path.basename(sourcePath))};`,
    };
  },
};
