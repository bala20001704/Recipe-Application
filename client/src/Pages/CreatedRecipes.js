import React from "react";
import "./CreatedRecipes.css";
import { useState } from "react";
import { useEffect } from "react";
import axios from "axios";
import { useGetUserid } from "../hooks/useGetUserid";

function CreatedRecipes() {
  const userid = useGetUserid();

  const [recipe, setRecipe] = useState({
    name: "",
    ingredients: [],
    instructions: "",
    imageUrl: "",
    time: 0,
    user: userid,
  });

  function handlechange(event) {
    const { name, value } = event.target;
    console.log(value);
    setRecipe((prevRecipe) => {
      const updatedRecipe = { ...prevRecipe, [name]: value };
      console.log(updatedRecipe);
      return updatedRecipe;
    });
  }

  function addIngredients() {
    setRecipe((prevRecipe) => {
      const updatedRecipe = {
        ...prevRecipe,
        ingredients: [...prevRecipe.ingredients, ""],
      };
      return updatedRecipe;
    });
  }

  function addIngredientsitem(event, index) {
    const { value } = event.target;
    setRecipe((prevRecipe) => {
      const updatedIngredients = [...prevRecipe.ingredients];
      updatedIngredients[index] = value;

      return {
        ...prevRecipe,
        ingredients: updatedIngredients,
      };
    });
  }

  useEffect(() => {
    console.log(recipe);
  }, [recipe]);

  function deleteitem(index) {
    setRecipe((prevRecipe) => {
      const Ingredients = recipe.ingredients;
      const del = Ingredients.filter((val, ind) => ind !== index);
      return { ...prevRecipe, ingredients: del };
    });
  }

  async function onSubmit() {
    try {
      const response = await axios.post(
        "http://localhost:3001/recipes",
        recipe
      );
      alert("Created Recipes Successfully");
      console.log(response);
    } catch (error) {
      console.error(error);
    }
  }

  return (
    <div>
      <h4>Create Your Recipe</h4>
      <div className="outerform_container">
        <form className="form_container" onSubmit={onSubmit}>
          <label htmlFor="name">Name:</label>
          <input
            type="text"
            id="name"
            name="name"
            value={recipe.name}
            onChange={handlechange}
          />
          <label htmlFor="ingredients">Ingredients</label>
          {recipe.ingredients.map(function (ingredients, index) {
            return (
              <div key={index}>
                <input
                  key={index}
                  value={ingredients}
                  name={ingredients}
                  onChange={(event) => addIngredientsitem(event, index)}
                />
                <button
                  className="rightsideofinput"
                  type="button"
                  onClick={() => deleteitem(index)}
                >
                  delete
                </button>
              </div>
            );
          })}
          <button type="button" onClick={addIngredients}>
            Add Ingredients
          </button>
          <label htmlFor="instructions">Instructions</label>
          <textarea
            id="instructions"
            name="instructions"
            value={recipe.instructions}
            onChange={handlechange}
          />
          <label htmlFor="imageurl">ImageUrl</label>
          <input
            id="imageurl"
            name="imageUrl"
            value={recipe.imageUrl}
            onChange={handlechange}
          />
          <label htmlFor="time">Cooking Time</label>
          <input
            id="time"
            name="time"
            value={recipe.time}
            onChange={handlechange}
          />
          <label htmlFor="user">User</label>
          <input
            id="user"
            name="user"
            value={recipe.user}
            onChange={handlechange}
          />
          <button type="submit">submit</button>
        </form>
      </div>
    </div>
  );
}
export default CreatedRecipes;
