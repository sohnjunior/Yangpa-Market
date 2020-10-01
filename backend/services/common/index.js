const fs = require('fs');

const IMAGE_BASE_PATH = 'public/images';

const readImageToBase64 = (dirname, fllename) => {
  const data = fs.readFileSync(`${IMAGE_BASE_PATH}/${dirname}/${fllename}`);
  const base64Buffer = Buffer.from(data).toString('base64');
  const base64Encode = `data:image/png;base64,${base64Buffer}`;
  return base64Encode;
};

module.exports = { readImageToBase64 };
