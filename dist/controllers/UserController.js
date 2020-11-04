"use strict";Object.defineProperty(exports, "__esModule", {value: true}); function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }var _User = require('../models/User'); var _User2 = _interopRequireDefault(_User);

class UserController {
  async store(request, response) {
    try {
      const newUser = await _User2.default.create(request.body);
      return response.json(newUser);
    } catch (e) {
      return response.status(400).json({
        errors: e.errors.map((err) => err.message),
      });
    }
  }

  async index(request, response) {
    try {
      const user = await _User2.default.findAll({
        attributes: ['id', 'name', 'email'],
      });
      return response.json(user);
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

      const user = await _User2.default.findByPk(request.params.id, {
        attributes: ['id', 'name', 'email'],
      });

      if (!user) {
        return response.status(400).json({
          errors: ['User not found'],
        });
      }

      return response.json(user);
    } catch (e) {
      return response.status(400).json({
        errors: e.errors.map((err) => err.message),
      });
    }
  }

  async update(request, response) {
    try {
      const user = await _User2.default.findByPk(request.userId);

      if (!user) {
        return response.status(400).json({
          errors: ['User not found'],
        });
      }

      const newDate = await user.update(request.body);
      return response.json(newDate);
    } catch (e) {
      return response.status(400).json({
        errors: e.errors.map((err) => err.message),
      });
    }
  }

  async delete(request, response) {
    try {
      const user = await _User2.default.findByPk(request.userId);

      if (!user) {
        return response.status(400).json({
          errors: ['User not found'],
        });
      }

      const { name } = user;

      await user.destroy();
      return response.json({ Message: `User ${name} deleted` });
    } catch (e) {
      return response.status(400).json({
        errors: e.errors.map((err) => err.message),
      });
    }
  }
}

exports. default = new UserController();
