import arrozImg from '../assets/Arroz.jpeg';
import cucharaImg from '../assets/Cuchara.jpeg';
import carneImg from '../assets/Carne.jpeg';
import pescadoImg from '../assets/Pescado.jpeg';
import postresImg from '../assets/Postres.jpeg';

export const getRecipes = async (name='', category='') => {
        try{
            const res = await fetch(`http://localhost:3000/api/recipes?name=${name}&category=${category}`);
            if (!res.ok) {
                throw new Error(`Unable to retrieve recipes from the data base`);
            }
            const recipes = res.json()
            return await recipes;
        } catch (error) {
            throw new Error(error.message);
        }
} 

export const getRecipeById = async (id) => {
    try{
        const res = await fetch(`http://localhost:3000/api/recipes/id/${id}`);
        if (!res.ok) {
                throw new Error(`Unable to retrieve recipes from the data base`);
            }
            const recipes = res.json()
            return await recipes;
        } catch (error) {
            throw new Error(error.message);
        }
}

export const getImage = (category) => {
  if (category === 'Arroces') return arrozImg;
  if (category === 'Cuchara') return cucharaImg;
  if (category === 'Carnes') return carneImg;
  if (category === 'Pescados') return pescadoImg;
  else return postresImg;
};