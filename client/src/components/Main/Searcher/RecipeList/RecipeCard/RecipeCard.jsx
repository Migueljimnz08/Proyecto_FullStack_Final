import React from "react";
import { getImage } from "../../../../../services/recipeService";
import { Link } from "react-router-dom";

const RecipeCard = ({data}) => {
const {name, description, category, image, recipeid } = data
  
  return <article className="recipe-card">
    <img src={getImage(category) || image} alt={name} />
    <h4>
      <Link to={`/recipe-details/${recipeid}`}>{name}</Link>
    </h4>
    <p>{description}</p>
    <p>{category}</p>
    </article>;
};

export default RecipeCard;
