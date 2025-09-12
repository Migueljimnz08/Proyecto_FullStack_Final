const favQueries = {
    getFavsByUser: `
    SELECT r.*
    FROM Favs f
    JOIN Recetas r ON f.RecetaID = r.RecetaID
    WHERE f.UserID = $1`,
    addFavorite: `
    INSERT INTO Favs(UserID, RecetasID)
    VALUES ($1,$2)`,
    deleteFavorite: `
    DELETE FROM favorites
    WHERE UserID = $1 AND RecetasID = $2`
}

module.exports = favQueries;