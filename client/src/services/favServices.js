export const addFav = async (recipeId) => {
    try{
        const res = await fetch(`http://localhost:3000/api/favs/${recipeId}`, {
            method: "POST",
            credentials: "include", // importante para enviar cookies
        });
        if (!res.ok) {
            throw new Error("Error adding favorite");
        }
        return await res.json();
    } catch (error) {
        throw new Error(error.message);
    }
};

export const deleteFav = async (recipeId) => {
    try{    
        const res = await fetch(`http://localhost:3000/api/favs/${recipeId}`, {
            method: "DELETE",
            credentials: "include",
        });
        if (!res.ok) {
            throw new Error("Error deleting favorite");
        }
        return await res.json();
    } catch (error) {
        throw new Error(error.message);
    }
};

export const getFavs = async () => {
    try{
        const res = await fetch(`http://localhost:3000/api/favs/user/me`, {
            method: "GET",
            credentials: "include",
        });
        if (!res.ok) throw new Error("Error fetching Favo");
        const favs = await res.json();
        return favs;
    } catch (error) {
        throw new Error(error.message);
    }
};