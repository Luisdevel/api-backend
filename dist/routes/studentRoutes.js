"use strict";Object.defineProperty(exports, "__esModule", {value: true}); function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }var _express = require('express');
var _StudentController = require('../controllers/StudentController'); var _StudentController2 = _interopRequireDefault(_StudentController);
var _loginRequired = require('../middlewares/loginRequired'); var _loginRequired2 = _interopRequireDefault(_loginRequired);

const routes = new (0, _express.Router)();

routes.post('/', _StudentController2.default.store);
routes.get('/', _StudentController2.default.index);
routes.get('/:id', _loginRequired2.default, _StudentController2.default.show);
routes.put('/:id', _loginRequired2.default, _StudentController2.default.update);
routes.delete('/:id', _loginRequired2.default, _StudentController2.default.delete);

exports. default = routes;
