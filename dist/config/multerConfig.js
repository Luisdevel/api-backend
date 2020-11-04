"use strict";Object.defineProperty(exports, "__esModule", {value: true}); function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }var _multer = require('multer'); var _multer2 = _interopRequireDefault(_multer);
var _path = require('path');

const aleatory = () => Math.floor(Math.random() * 10000 + 10000);

exports. default = {
  fileFilter: (request, file, cb) => {
    if (file.mimetype !== 'image/png' && file.mimetype !== 'image/jpeg') {
      return cb(new _multer2.default.MulterError('file must be of type PNG or JPEG'));
    }
    return cb(null, true);
  },

  storage: _multer2.default.diskStorage({
    destination: (request, file, cb) => {
      cb(null, _path.resolve.call(void 0, __dirname, '..', '..', 'uploads', 'images'));
    },
    filename: (request, file, cb) => {
      cb(null, `${Date.now()}_${aleatory()}${_path.extname.call(void 0, file.originalname)}`);
    },
  }),
};
