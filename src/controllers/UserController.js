import User from '../models/User';

class UserController {
  async store(request, response) {
    try {
      const newUser = await User.create(request.body);
      return response.json(newUser);
    } catch (e) {
      return response.status(400).json({
        errors: e.errors.map((err) => err.message),
      });
    }
  }

  async index(request, response) {
    try {
      const user = await User.findAll({
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

      const user = await User.findByPk(request.params.id, {
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
      const user = await User.findByPk(request.userId);

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
      const user = await User.findByPk(request.userId);

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

export default new UserController();
