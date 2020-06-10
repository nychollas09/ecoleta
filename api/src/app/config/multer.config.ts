import multer from 'multer';
import path from 'path';
import { Request } from 'express';
import crypto from 'crypto';

export default {
  storage: multer.diskStorage({
    destination: path.resolve(__dirname, '..', '..', 'assets', 'upload'),
    filename: (request: Request, file: Express.Multer.File, callback) => {
      const hash = crypto.randomBytes(6).toString('hex');
      const fileName = `${hash}-${file.originalname.replace(/\s/g, '')}`;
      callback(undefined, fileName);
    },
  }),
};
