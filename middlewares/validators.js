const { body, validationResult } = require('express-validator');

const recipeValidation = [
  body('nombre')
    .notEmpty().withMessage('Recipe name is required')
    .isLength({ min: 3 }).withMessage('Name must be at least 3 characters long'),
  body('descripcion')
    .notEmpty().withMessage('A description is required')
    .isLength({ min: 10 }).withMessage('Description must be at least 10 characters long'),
  body('ingredientes')
    .notEmpty().withMessage('Must include the ingredients used in the recipe'),
  body('categoria')
    .isIn(['Cuchara', 'Arroces', 'Pescados', 'Carnes', 'Postres'])
    .withMessage('This category is not valid'),
  body('nombreFamiliar')
    .notEmpty().withMessage('Family name is required')
    .isLength({ min: 3 }).withMessage('Name of the family member that gave you the recipe'),
];

const userValidation = [
  body('username')
    .notEmpty().withMessage('Username is required'),
  body('email')
    .isEmail().withMessage('Introduce a valid email'),
  body('password')
    .isStrongPassword({
      minLength: 8,
      minLowercase: 1,
      minUppercase: 1,
      minNumbers: 1,
      minSymbols: 1
    }).withMessage('Password must be 8 characters long and must include an uppercase letter, lowercase letter, a number and a symbol'),
];

const validateRequest = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({
      success: false,
      errors: errors.array().map(err => ({ campo: err.param, msg: err.msg }))
    });
  }
  next();
};

module.exports = { recipeValidation, userValidation, validateRequest };