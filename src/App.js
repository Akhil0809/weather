import React,{useState,useEffect} from 'react';
import Recipe from "./Recipe"
import './App.css';

const App=() =>{
  const APP_ID="d641fe8b";
  const APP_KEY="62e2e37db03e7901940450efb23a362d	";

  const [recipes,setRecipe] = useState([]);
  const [search,setSearch] = useState("")
  const [query,setQuery] = useState("chicken");
  
  useEffect(()=>{
     getRecipes();
  });

  const getRecipes = async () =>{
    const response = await fetch(
      `https://api.edamam.com/search?q=${query}&app_id=${APP_ID}&app_key=${APP_KEY}`);
    const data= await response.json();
    setRecipe(data.hits);
    console.log(data.hits);
  }

  const updateSearch = e=>{
    setSearch(e.target.value);
  }

  const getSearch = e =>{
    e.preventDefault();
    setQuery(search);
    setSearch('');
  }
  return(
    <div className="App">
      <form onSubmit={getSearch} className="search-box">
        <input className="search-bar" type="text" value={search} onChange={updateSearch}/>
        <button className="search-button" type="submit">Search</button>
        
      </form>
      {recipes.map(recipe =>(
        <Recipe
        key={recipe.recipe.label}
        title={recipe.recipe.label}
        calories={recipe.recipe.calories}
        image={recipe.recipe.image} 
        ingredients={recipe.recipe.ingredients}/>
        
      ))}
     </div>
  )
}

export default App;
