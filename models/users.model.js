const bcrypt = require('bcryptjs')
const queries = require('../queries/user.queries');
const { executeQuery } = require('../utils/pgHelper');
const regex = require('../utils/regex');

/**
 * Registra un nuevo usuario en la base de datos.
 *
 * @async
 * @function signUpUser
 * @param {string} username - Nombre de usuario.
 * @param {string} email - Correo electrónico del usuario.
 * @param {string} password - Contraseña del usuario (se almacenará hasheada).
 * @throws {Error} Si el email o la contraseña no tienen un formato válido.
 * @returns {Promise<Object>} - Resultado de la operación de inserción.
 */
const signUpUser = async (username, email, password) => {
  const hashedPassword = await bcrypt.hash(password, 10);
  if (!regex.validateEmail(email)) {
    throw new Error('Introduce a valid email')
  }
  if (!regex.validatePassword(password)) {
    throw new Error('Password must be 8 characters long and must include an uppercase letter, lowercase letter, a number and a symbol')
  }
  const newUser = [username, email, hashedPassword];
  return await executeQuery(queries.signUpUser, newUser);
}

/**
 * Obtiene un usuario por su correo electrónico.
 *
 * @async
 * @function getUserByEmail
 * @param {string} email - Correo electrónico del usuario.
 * @returns {Promise<Object|null>} - Objeto del usuario o null si no se encuentra.
 */
const getUserByEmail = async (email) => {
  const result = await executeQuery(queries.getUserByEmail, [email]);
  return result[0];
}


// Obtener todos los usuarios
/**
 * Obtiene todos los usuarios registrados.
 *
 * @async
 * @function getAllUsers
 * @returns {Promise<Array>} - Lista de usuarios.
 */
const getAllUsers = async () => {
  return await executeQuery(queries.getAllUser);
};

// Actualizar un usuario
/**
 * Actualiza los datos de un usuario existente.
 *
 * @async
 * @function updateUser
 * @param {string} oldEmail - Email actual del usuario (clave para buscarlo).
 * @param {string} username - Nuevo nombre de usuario.
 * @param {string} email - Nuevo correo electrónico.
 * @param {string} password - Nueva contraseña (se almacenará hasheada).
 * @throws {Error} Si el email o la contraseña no tienen un formato válido.
 * @returns {Promise<Object>} - Resultado de la operación de actualización.
 */
const updateUser = async (oldEmail, username, email, password) => {
  const hashedPassword = await bcrypt.hash(password, 10);
  if (!regex.validateEmail(email)) {
    throw new Error('Introduce a valid email')
  }
  if (!regex.validatePassword(password)) {
    throw new Error('Password must be 8 characters long and must include an uppercase letter, lowercase letter, a  number and a symbol')
  }
  const updatedUser = [oldEmail, username, email, hashedPassword];
  return await executeQuery(queries.updateUser, updatedUser);
};

// Eliminar usuario por email
/**
 * Elimina un usuario de la base de datos por su email.
 *
 * @async
 * @function deleteUser
 * @param {string} email - Correo electrónico del usuario.
 * @returns {Promise<Object>} - Resultado de la operación de eliminación.
 */
const deleteUser = async (email) => {
  return await executeQuery(queries.deleteUser, [email]);
};

// Marcar usuario como logueado
/**
 * Marca al usuario como logueado (por ejemplo, cambiando su estado en base de datos).
 *
 * @async
 * @function logIn
 * @param {string} email - Correo electrónico del usuario.
 * @returns {Promise<Object>} - Resultado de la operación.
 */
const logIn = async (email) => {
  return await executeQuery(queries.logIn, [email]);
};

// Marcar usuario como deslogueado
/**
 * Marca al usuario como deslogueado.
 *
 * @async
 * @function logOut
 * @param {string} email - Correo electrónico del usuario.
 * @returns {Promise<Object>} - Resultado de la operación.
 */
const logOut = async (email) => {
  return await executeQuery(queries.logOut, [email]);
};

module.exports = {
  signUpUser,
  getUserByEmail,
  getAllUsers,
  updateUser,
  deleteUser,
  logIn,
  logOut
};


// signUpUser('userPrueba', 'userPrueba@gmail.com', 'Prueba-123');
// signUpUser('adminPrueba', 'adminPrueba@gmail.com', 'Admin-321');
