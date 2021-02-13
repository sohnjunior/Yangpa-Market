import fs from 'fs';
import { getRepository } from 'typeorm';
import { Photo } from '../models/photo';

const IMAGE_BASE_PATH = 'public/images';

const convertBufferToBase64 = (dirname: string, fllename: string) => {
  const data = fs.readFileSync(`${IMAGE_BASE_PATH}/${dirname}/${fllename}`);
  const base64Buffer = Buffer.from(data).toString('base64');
  const base64Encode = `data:image/png;base64,${base64Buffer}`;

  return base64Encode;
};

const createPhotos = (imagePaths: string[]) => {
  const photoRepository = getRepository(Photo);
  const photos = imagePaths.map((imagePath) =>
    photoRepository.create({ path: imagePath })
  );

  photoRepository.save(photos);

  return photos;
};

export { createPhotos };
