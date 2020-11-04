"use strict";Object.defineProperty(exports, "__esModule", {value: true}); function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }var _multer = require('multer'); var _multer2 = _interopRequireDefault(_multer);
var _multerConfig = require('../config/multerConfig'); var _multerConfig2 = _interopRequireDefault(_multerConfig);
var _Photo = require('../models/Photo'); var _Photo2 = _interopRequireDefault(_Photo);

const upload = _multer2.default.call(void 0, _multerConfig2.default).single('photo');

class PhotoController {
  store(request, response) {
    return upload(request, response, async (error) => {
      if (error) {
        return response.status(400).json({
          errors: [error.code],
        });
      }

      try {
        const { originalname, filename } = request.file;
        const { student_id } = request.body;
        const photos = await _Photo2.default.create({ originalname, filename, student_id });

        return response.json(photos);
      } catch (e) {
        return response.status(400).json({
          errors: ['Student not found'],
        });
      }
    });
  }
}

exports. default = new PhotoController();
