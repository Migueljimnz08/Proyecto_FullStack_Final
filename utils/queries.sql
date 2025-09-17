-- Borrar todo si ya existía
DROP TABLE IF EXISTS Favs;
DROP TABLE IF EXISTS Recipes;
DROP TABLE IF EXISTS Users;
DROP TYPE IF EXISTS category_enum;

-- Crear tipo ENUM para Categorías
CREATE TYPE category_enum AS ENUM (
  'Cuchara',
  'Arroces',
  'Pescados',
  'Carnes',
  'Postres'
);

-- Tabla de Usuarios
CREATE TABLE Users (
  UserID SERIAL PRIMARY KEY,
  Username VARCHAR(100) NOT NULL,
  Email VARCHAR(150) UNIQUE NOT NULL,
  Password VARCHAR(255) NOT NULL,
  Role VARCHAR(20) DEFAULT 'User', 
  Logged BOOLEAN DEFAULT false NOT NULL
);

-- Tabla de Recetas
CREATE TABLE Recipes (
  RecipeID SERIAL PRIMARY KEY,
  UserID INT NOT NULL,
  Name VARCHAR(100) NOT NULL,
  Description TEXT,
  Ingredients TEXT,
  Category category_enum NOT NULL,
  FamilyName VARCHAR(100),
  Image TEXT,
  FOREIGN KEY (UserID) REFERENCES Users(UserID) ON DELETE CASCADE
);

-- Tabla de Favoritos
CREATE TABLE Favs (
  ID SERIAL PRIMARY KEY,
  UserID INT NOT NULL,
  RecipeID INT NOT NULL,
  FOREIGN KEY (UserID) REFERENCES Users(UserID) ON DELETE CASCADE,
  FOREIGN KEY (RecipeID) REFERENCES Recipes(RecipeID) ON DELETE CASCADE,
  UNIQUE (UserID, RecipeID)
);

--INSERTAR DATOS PRUEBA :
-- USUARIO NORMAL:
INSERT INTO Users (Username, Email, Password, Role, Logged)
VALUES ('UserPrueba', 'User.prueba@example.com', 'hashedpassword1', 'User', false);

-- ADMINISTRADOR:
INSERT INTO Users (Username, Email, Password, Role, Logged)
VALUES ('adminprueba', 'admin.prueba@example.com', 'hashedpassword2', 'admin', false);

--CREAR USUARIO SIGNUP:
INSERT INTO Users (Username, Email, Password)
VALUES ($1, $2, $3);

--OBTENER USUARIO POR EMAIL PARA LOGIN:
SELECT * FROM Users WHERE Email = $1;

--SELECT ALL FROM USER
SELECT * FROM Users;

--OBTENER PERFIL POR ID PARA /API/USER:
SELECT UserID, Username, Email, Role FROM Users WHERE id = $1;

--ACTUALIZAR PERFIL USER:
UPDATE Users
SET Username = $2, Email = $3, Password = $4
WHERE UserID = $1;

--logIn:
UPDATE User 
SET logged = true
WHERE Email =$1;

--logOut: `
UPDATE User
SET logged = false
WHERE Email =$1;

--ELIMINAR USUARIO (SOLO PUEDE EL ADMIN):
DELETE FROM Users WHERE Email = $1

--LISTAR TODOS LOS USERS, ADMIN EN /USERS:
SELECT UserID, Username, Email, role FROM Users;
 
