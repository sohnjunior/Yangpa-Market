import fs from 'fs';
import { getRepository } from 'typeorm';
import { Photo } from '../models/photo';

const IMAGE_BASE_PATH = 'public/images';
const BASE_URL = 'http://localhost:3000';

const convertBufferToBase64 = (dirname: string, fllename: string) => {
  const data = fs.readFileSync(`${IMAGE_BASE_PATH}/${dirname}/${fllename}`);
  const base64Buffer = Buffer.from(data).toString('base64');
  const base64Encode = `data:image/png;base64,${base64Buffer}`;

  return base64Encode;
};

const createPhotos = (photoNames: string[]) => {
  /** ⚠️ Photo 의 경우 cascade 로 지정되어 있기 때문에 종속된 테이블에서 save 해줘야 함 */
  const photoRepository = getRepository(Photo);
  const photos = photoNames.map((photoName: string) =>
    photoRepository.create({ path: `${BASE_URL}/images/product/${photoName}` })
  );

  return photos;
};

export { createPhotos };
