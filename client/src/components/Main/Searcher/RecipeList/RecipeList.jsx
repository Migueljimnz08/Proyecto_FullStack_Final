import React from "react";
import RecipeCard from "./RecipeCard/RecipeCard";

const RecipeList = ({recipes, fail}) => {

  const paintData = () => recipes.map((recipe) => <RecipeCard data={recipe} key={recipe.recipeid}/>) 
      
  return ( <div className="recipes-list">
    {fail!=null? <p>{fail}</p>: null}
    {recipes.length != 0? paintData():
    <p>No hay recetas disponibles ahora mismo</p> }
    </div>
  )
};

export default RecipeList;
