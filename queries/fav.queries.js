const favQueries = {
    getFavsByUser: `
    SELECT r.*
    FROM Favs f
    JOIN Recipes r ON f.recipeid = r.recipeid
    WHERE f.userid = $1`,
    addFavorite: `
    INSERT INTO Favs(UserID, RecipeID)
    VALUES ($1,$2)`,
    deleteFavorite: `
    DELETE FROM Favs
    WHERE UserID = $1 AND RecipeID = $2`
}

module.exports = favQueries;