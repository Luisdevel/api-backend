import Student from '../models/Student';
import Photo from '../models/Photo';

class StudentController {
  async store(request, response) {
    try {
      const newStudent = await Student.create(request.body);
      return response.json(newStudent);
    } catch (e) {
      return response.status(400).json({
        errors: e.errors.map((err) => err.message),
      });
    }
  }

  async index(request, response) {
    try {
      const student = await Student.findAll({
        attributes: ['id', 'name', 'surname', 'email', 'age', 'weight', 'height'],
        include: {
          model: Photo,
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

      const student = await Student.findByPk(request.params.id, {
        attributes: ['id', 'name', 'surname', 'email', 'age', 'weight', 'height'],
        include: {
          model: Photo,
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

      const student = await Student.findByPk(request.params.id);

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

      const student = await Student.findByPk(request.params.id);

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

export default new StudentController();
