const recipeQueries = {
  createRecipe: `
    INSERT INTO Recipes (UserID, Name, Description, Ingredients, Category, FamilyName, image)
    VALUES ($1, $2, $3, $4, $5, $6, $7)
    RETURNING *;
  `,
  getAllRecipes: `
    SELECT * FROM Recipes;
  `,
  getRecipesByCategory: `
    SELECT * FROM Recipes WHERE Category = $1;
  `,
  getRecipesById: `
    SELECT * FROM Recipes WHERE RecipeID = $1;
  `,
  getRecipesByName:`
    SELECT * FROM Recipes WHERE Name ILIKE '%' || $1 || '%';
  `,
  getRecipesByUserID:`
    SELECT * FROM Recipes WHERE UserID = $1
  `,
  getRecipesByNameAndCategory:`
    SELECT * FROM Recipes WHERE Name ILIKE '%' || $1 || '%' AND Category =$2;
  `,
  updateRecipe: `
    UPDATE Recipes
    SET Name = $2, Description = $3, Ingredients = $4, Category = $5, FamilyName = $6, image = $7
    WHERE RecipeID = $1
    RETURNING *;
  `,
  deleteRecipe: `
    DELETE FROM Recipes WHERE RecipeID = $1 RETURNING *;
  `
};

module.exports = recipeQueries;