"use strict";Object.defineProperty(exports, "__esModule", {value: true}); function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }var _Student = require('../models/Student'); var _Student2 = _interopRequireDefault(_Student);
var _Photo = require('../models/Photo'); var _Photo2 = _interopRequireDefault(_Photo);

class StudentController {
  async store(request, response) {
    try {
      const newStudent = await _Student2.default.create(request.body);
      return response.json(newStudent);
    } catch (e) {
      return response.status(400).json({
        errors: e.errors.map((err) => err.message),
      });
    }
  }

  async index(request, response) {
    try {
      const student = await _Student2.default.findAll({
        attributes: ['id', 'name', 'surname', 'email', 'age', 'weight', 'height'],
        include: {
          model: _Photo2.default,
          attributes: ['filename', 'url'],
        },
      });
      return response.json(student);
    } catch (e) {
      return response.status(400).json({
        errors: e.errors.map((err) => err.message),
      });
    }
  }

  async show(request, response) {
    try {
      if (!request.params.id) {
        return response.status(400).json({
          errors: ['ID not found'],
        });
      }

      const student = await _Student2.default.findByPk(request.params.id, {
        attributes: ['id', 'name', 'surname', 'email', 'age', 'weight', 'height'],
        include: {
          model: _Photo2.default,
          attributes: ['filename', 'url'],
        },
      });

      if (!student) {
        return response.status(400).json({
          errors: ['Student not found'],
        });
      }

      return response.json(student);
    } catch (e) {
      return response.status(400).json({
        errors: e.errors.map((err) => err.message),
      });
    }
  }

  async update(request, response) {
    try {
      if (!request.params.id) {
        return response.status(400).json({
          errors: ['ID not found'],
        });
      }

      const student = await _Student2.default.findByPk(request.params.id);

      if (!student) {
        return response.status(400).json({
          errors: ['Student not found'],
        });
      }

      const newDate = await student.update(request.body);
      return response.json(newDate);
    } catch (e) {
      return response.status(400).json({
        errors: e.errors.map((err) => err.message),
      });
    }
  }

  async delete(request, response) {
    try {
      if (!request.params.id) {
        return response.status(400).json({
          errors: ['ID not found'],
        });
      }

      const student = await _Student2.default.findByPk(request.params.id);

      if (!student) {
        return response.status(400).json({
          errors: ['Student not found'],
        });
      }

      const { name } = student;

      await student.destroy();
      return response.json({ Message: `User ${name} deleted` });
    } catch (e) {
      return response.status(400).json({
        errors: e.errors.map((err) => err.message),
      });
    }
  }
}

exports. default = new StudentController();
