const errorHandler = (err, req, res, next) => {
  console.log(err);
  switch (err.name) {
    case 'emailIsNull':
      res.status(400).json({ message: 'Email is required' });
      break;
    case 'passwordIsNull':
      res.status(400).json({ message: 'Password is required' });
      break;
    case 'nameIsNull':
      res.status(400).json({ message: 'Name is required' });
      break;
    case 'SequelizeValidationError':
    case 'SequelizeUniqueConstraintError':
      res.status(400).json({
        message: err.errors[0].message,
      });
    case 'InvalidEmailOrPassword':
      res.status(401).json({ message: 'Email or Password is invalid' });
      break;
    case 'EmailAlreadyRegistered':
      res.status(401).json({ message: 'Email Already Registered' });
      break;
    default:
      res.status(500).json({ message: 'Internal Server Error' });
      break;
  }
};

module.exports = errorHandler;
