import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getRecipeById, getImage } from "../../../services/recipeService";
import { ThreeDots } from 'react-loader-spinner';
import { addFav, deleteFav, getFavs } from "../../../services/favServices";

const RecipeDetails = () => {
  const { id } = useParams();
  const [recipe, setRecipe] = useState(null);
  const [error, setError] = useState(null);
  const [isFav, setIsFav] = useState(false);
  const [loadingFav, setLoadingFav] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getRecipeById(id);
        setRecipe(data);
        setError(null);
      } catch (error) {
        setError(error);
        setRecipe(null);
      }
    };
    fetchData();
  }, [id]);

  useEffect(() => {
    const fetchFavs = async () => {
      try {
        const favs = await getFavs();
        const boolean = favs.some(fav => fav.recipeid == id)
        setIsFav(boolean);
      } catch (error) {
        setError(error);
      }
    };
    fetchFavs();
  }, [id]);

  const handleFavClick = async () => {
    if (!recipe || loadingFav) return;
    setLoadingFav(true);
    try {
      if (isFav) {
        await deleteFav(id);
        setIsFav(false);
      } else {
        await addFav(id);
        setIsFav(true);
      }
    } catch (error) {
      setError(error);
    } 
    setLoadingFav(false);
  };

  if(error){
    return <p>La receta no esta disponible ahora mismo: {error}</p>;
  }

  return <section className="recipe-details">
    {recipe == null?
    <ThreeDots
          visible={true}
          height="80"
          width="80"
          color="#4fa94d"
          radius="9"
          ariaLabel="three-dots-loading"
          wrapperStyle={{}}
          wrapperClass=""
    />:
    <>
    <h2>{recipe.name}</h2>
    <img src={getImage(recipe.category) || recipe.image} alt={recipe.name} />
    <p>{recipe.ingredients}</p>
    <p>{recipe.description}</p>
    <p>{recipe.familyname}</p>
    <p>{recipe.category}</p>
    {loadingFav == true? null:
    <button onClick={handleFavClick}
    className="fav-btn">
      {isFav? 'Eliminar de favoritos' : 'Añadir a favoritos'}  
    </button>}
    </>}
    </section>;
};

export default RecipeDetails;
