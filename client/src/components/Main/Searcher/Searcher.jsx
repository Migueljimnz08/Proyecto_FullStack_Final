import React,{ useState, useEffect } from "react";
import { getRecipes } from "../../../services/recipeService";
import RecipeList from "./RecipeList/RecipeList";
import { ThreeDots } from 'react-loader-spinner'; 

const Searcher = () => {
  const [fetched, setFetched] = useState(null);
  const [name, setName] = useState('')
  const [category, setCategory] = useState('')
  const [error, setError] = useState(null)

  useEffect(() => {
    const fetchRecipe = async () => {
      try {
          const search = await getRecipes();
          setFetched(search);
        } catch (error) {
          setError(error.message);
        }
      };  
      fetchRecipe();
  }, []);

  async function fetchWithFilters(newName = name, newCategory = category) {
    try {
      const search = await getRecipes(newName.trim(), newCategory);
      setFetched(search);
    } catch (error) {
      setError(error.message);
    }
  }

  async function handleSearch() {
    await fetchWithFilters(name, category);
    setName('');
  }

  async function handleChange(e) {
    const value = e.target.value;
    setCategory(value);
    await fetchWithFilters(name, value);
  }

  return <section className="home">
    <h3>¿Qué te apetece hoy?</h3>
    <div className="search-box">
      <input type="text" 
      placeholder="Busca una receta"
      value={name}
      onChange={(e) => setName(e.target.value)}  
      />
      <button onClick={() => handleSearch()}>Buscar</button>
      <label htmlFor="category">Categoría</label>
      <select id="category" value={category} onChange={handleChange}>
        <option value="">Todas</option>
        <option value="Arroces">Arroces</option>
        <option value="Cuchara">Cuchara</option>
        <option value="Carnes">Carnes</option>
        <option value="Pescados">Pescados</option>
        <option value="Postres">Postres</option>
      </select>
    </div>
    {fetched!=null?<RecipeList recipes={fetched} fail={error}/>:
    <ThreeDots
      visible={true}
      height="80"
      width="80"
      color="#4fa94d"
      radius="9"
      ariaLabel="three-dots-loading"
      wrapperStyle={{}}
      wrapperClass=""
    />}
  </section>;
};

export default Searcher;
