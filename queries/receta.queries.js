const recetaQueries = {
  createReceta: `
    INSERT INTO Recetas (UserID, Nombre, Descripcion, Ingredientes, Categoria, NombreFamiliar, Imagen)
    VALUES ($1, $2, $3, $4, $5, $6, $7)
    RETURNING *;
  `,
  getAllRecetas: `
    SELECT * FROM Recetas;
  `,
  getRecetasByCategoria: `
    SELECT * FROM Recetas WHERE Categoria = $1;
  `,
  getRecetaById: `
    SELECT * FROM Recetas WHERE RecetaID = $1;
  `,
  updateReceta: `
    UPDATE Recetas
    SET Nombre = $2, Descripcion = $3, Ingredientes = $4, Categoria = $5, NombreFamiliar = $6, Imagen = $7
    WHERE RecetaID = $1
    RETURNING *;
  `,
  deleteReceta: `
    DELETE FROM Recetas WHERE RecetaID = $1 RETURNING *;
  `
};

module.exports = recetaQueries;