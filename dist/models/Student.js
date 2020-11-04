"use strict";Object.defineProperty(exports, "__esModule", {value: true}); function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }var _sequelize = require('sequelize'); var _sequelize2 = _interopRequireDefault(_sequelize);

 class Student extends _sequelize.Model {
  static init(sequelize) {
    super.init({
      name: {
        type: _sequelize2.default.STRING,
        defaultValue: '',
        validate: {
          len: {
            args: [3, 20],
            msg: 'The name must be between 3 and 20 characters',
          },
        },
      },
      surname: {
        type: _sequelize2.default.STRING,
        defaultValue: '',
        validate: {
          len: {
            args: [3, 20],
            msg: 'The surname must be between 3 and 20 characters',
          },
        },
      },
      email: {
        type: _sequelize2.default.STRING,
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
        type: _sequelize2.default.INTEGER,
        defaultValue: '',
        validate: {
          isInt: {
            msg: 'Age must be an integer',
          },
        },
      },
      weight: {
        type: _sequelize2.default.FLOAT,
        defaultValue: '',
        validate: {
          isFloat: {
            msg: 'Weight must be a whole number separated by periods',
          },
        },
      },
      height: {
        type: _sequelize2.default.FLOAT,
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
} exports.default = Student;
