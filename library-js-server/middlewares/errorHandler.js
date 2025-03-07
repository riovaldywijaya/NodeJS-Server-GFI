const errorHandler = (err, req, res, next) => {
  console.log(err, '<---------- ini di error handler ');
  switch (err.name) {
    case 'EmailIsNull':
      res.status(400).json({ message: 'Email is required' });
      break;
    case 'PasswordIsNull':
      res.status(400).json({ message: 'Password is required' });
      break;
    case 'NameIsNull':
      res.status(400).json({ message: 'Name is required' });
      break;
    case 'SequelizeValidationError':
    case 'SequelizeUniqueConstraintError':
      res.status(400).json({
        message: err.errors[0].message,
      });
    case 'Unauthenticated':
    case 'JsonWebTokenError':
      res.status(401).json({ message: 'Invalid Token' });
      break;
    case 'InvalidEmailOrPassword':
      res.status(401).json({ message: 'Email or Password is invalid' });
      break;
    case 'EmailAlreadyRegistered':
      res.status(401).json({ message: 'Email Already Registered' });
      break;
    case 'Forbidden':
      res.status(403).json({ message: 'You are not authorized' });
      break;
    default:
      res.status(500).json({ message: 'Internal Server Error' });
      break;
  }
};

module.exports = errorHandler;
