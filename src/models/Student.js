import Sequelize, { Model } from 'sequelize';

export default class Student extends Model {
  static init(sequelize) {
    super.init({
      name: {
        type: Sequelize.STRING,
        defaultValue: '',
        validate: {
          len: {
            args: [3, 20],
            msg: 'The name must be between 3 and 20 characters',
          },
        },
      },
      surname: {
        type: Sequelize.STRING,
        defaultValue: '',
        validate: {
          len: {
            args: [3, 20],
            msg: 'The surname must be between 3 and 20 characters',
          },
        },
      },
      email: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: {
          msg: 'Email already exists.',
        },
        validate: {
          isEmail: {
            msg: 'Invalid E-mail',
          },
        },
      },
      age: {
        type: Sequelize.INTEGER,
        defaultValue: '',
        validate: {
          isInt: {
            msg: 'Age must be an integer',
          },
        },
      },
      weight: {
        type: Sequelize.FLOAT,
        defaultValue: '',
        validate: {
          isFloat: {
            msg: 'Weight must be a whole number separated by periods',
          },
        },
      },
      height: {
        type: Sequelize.FLOAT,
        defaultValue: '',
        validate: {
          isFloat: {
            msg: 'Height must be a whole number separated by periods',
          },
        },
      },
    }, {
      sequelize,
    });
  }

  static associate(models) {
    this.hasMany(models.Photo, { foreignKey: 'student_id' });
  }
}
