import multer from 'multer';
import { extname, resolve } from 'path';

const aleatory = () => Math.floor(Math.random() * 10000 + 10000);

export default {
  fileFilter: (request, file, cb) => {
    if (file.mimetype !== 'image/png' && file.mimetype !== 'image/jpeg') {
      return cb(new multer.MulterError('file must be of type PNG or JPEG'));
    }
    return cb(null, true);
  },

  storage: multer.diskStorage({
    destination: (request, file, cb) => {
      cb(null, resolve(__dirname, '..', '..', 'uploads', 'images'));
    },
    filename: (request, file, cb) => {
      cb(null, `${Date.now()}_${aleatory()}${extname(file.originalname)}`);
    },
  }),
};
