import React from "react";
import { useEffect } from "react";
import { useGetUserid } from "../hooks/useGetUserid";
import axios from "axios";
import { useState } from "react";

function SavedRecipes() {
  const [savedrecipes, setSavedRecipes] = useState([]);
  const userid = useGetUserid();
  useEffect(() => {
    const savedrecipedata = async () => {
      try {
        const response = await axios.get(
          `http://localhost:3001/recipes/savedRecipes/${userid}`
        );
        if (response.data.message) {
          alert(response.data.message);
        } else {
          console.log(response.data);
          setSavedRecipes(response.data.savedrecipe);
        }
      } catch (error) {
        console.error(error);
      }
    };

    savedrecipedata();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => console.log(savedrecipes), [savedrecipes]);

  return (
    <div>
      <>
        <h1>
          <b>Saved Recipes</b>
        </h1>
        <div className="outercontainer">
          {savedrecipes.map((recipe, index) => (
            <div className="Card" key={index}>
              <img
                className="card_img"
                src={recipe.imageUrl}
                alt={recipe.name}
              />
              <div className="card-details">
                <p className="recipename">{recipe.name}</p>
                <div className="ingredients">
                  <b>Ingredients</b>
                  {recipe.ingredients.map((data, ind) => (
                    <p key={ind}>{data}</p>
                  ))}
                </div>
                <div>
                  <p className="time">Cook Timing {recipe.time}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </>
    </div>
  );
}

export default SavedRecipes;
