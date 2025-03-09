const { User } = require('../models');
const { comparePassword } = require('../helpers/bcrypt');
const { signToken } = require('../helpers/jwt');

class UserController {
  static async register(req, res, next) {
    try {
      UserController.validateRequestBody(req.body, ['email', 'password', 'name']);

      const { email, password, name, phoneNumber, role } = req.body;

      const validRole = UserController.checkRole(role);

      const user = await UserController.createUser(email, password, name, phoneNumber, validRole);

      res.status(201).json({
        email: user.email,
        name: user.name,
        role: user.role,
      });
    } catch (error) {
      next(error);
    }
  }

  static async login(req, res, next) {
    try {
      UserController.validateRequestBody(req.body, ['email', 'password']);

      const { email, password } = req.body;

      const user = await UserController.checkCredential(email, password);

      const access_token = signToken({
        id: user.id,
        email: user.email,
        role: user.role,
      });

      res.status(200).json({ access_token });
    } catch (error) {
      next(error);
    }
  }

  static checkRole(role) {
    return ['ADMIN', 'USER'].includes(role?.toUpperCase()) ? role.toUpperCase() : 'USER';
  }

  static async createUser(email, password, name, phoneNumber, role) {
    const user = await User.findOne({ where: { email } });
    if (user) throw { name: 'EmailAlreadyRegistered' };

    return await User.create({
      email,
      password,
      name,
      phoneNumber,
      role,
    });
  }

  static async checkCredential(email, password) {
    const user = await User.findOne({ where: { email } });
    if (!user) throw { name: 'InvalidEmailOrPassword' };

    const isPasswordValid = comparePassword(password, user.password);
    if (!isPasswordValid) throw { name: 'InvalidEmailOrPassword' };

    return user;
  }

  static validateRequestBody(body, requiredFields) {
    for (const field of requiredFields) {
      if (!body[field]) throw { name: `${field}IsNull` };
    }
  }
}

module.exports = UserController;
