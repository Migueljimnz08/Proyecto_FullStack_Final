import React from "react";
import { Route, Routes } from 'react-router-dom';
import Searcher from "./Searcher";
import RecipeDetails from "./RecipeDetails/RecipeDetails";
import Login from "./Login/Login";
import Register from "./Register/Register";
import NotFound from './NotFound';


const Main = () => {
  return (
    <main className="main">
      <Routes>
        <Route path='/' element={<Searcher/>} />
        <Route path='/recipe-details/:id' element={<RecipeDetails/>} />
        <Route path='/login' element={<Login/>} />
        <Route path='/register' element={<Register/>} />
        <Route path='/*' element={<NotFound/>} />
      </Routes>
    </main>
  );
};

export default Main;
