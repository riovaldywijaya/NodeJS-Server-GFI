const { User, sequelize } = require('../models');
const { comparePassword } = require('../helpers/bcrypt');
const { signToken } = require('../helpers/jwt');

class UserController {
  static async login(req, res, next) {
    try {
      const { email, password } = req.body;

      if (!email) throw { name: 'EmailIsNull' };
      if (!password) throw { name: 'PasswordIsNull' };

      const user = await User.findOne({ where: { email } });
      if (!user) throw { name: 'InvalidEmailOrPassword' };

      const isPasswordValid = comparePassword(password, user.password);
      if (!isPasswordValid) throw { name: 'InvalidEmailOrPassword' };

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

  static async register(req, res, next) {
    try {
      const { email, password, name, phoneNumber, role } = req.body;
      const allowedRoles = ['ADMIN', 'USER'];
      const userRole = allowedRoles.includes(role.toUpperCase()) ? role : 'USER';

      if (!email) throw { name: 'EmailIsNull' };
      if (!password) throw { name: 'PasswordIsNull' };
      if (!name) throw { name: 'NameIsNull' };

      const user = await User.findOne({ where: { email } });
      if (user) throw { name: 'EmailAlreadyRegistered' };

      const createUser = await User.create({
        email,
        password: password,
        name,
        phoneNumber,
        role : userRole
      });

      res.status(201).json({
        email: createUser.email,
        name: createUser.name,
        role: createUser.role,
      });
    } catch (error) {
      next(error);
    }
  }
}

module.exports = UserController;
