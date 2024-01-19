import React from "react";
import { useState } from "react";
import axios from "axios";
import { useEffect } from "react";
import "./Home.css";
import { useGetUserid } from "../hooks/useGetUserid";

function Home() {
  const [recipe, setRecipe] = useState([]);
  const [savedrecipes, setSavedRecipes] = useState([]);
  const userid = useGetUserid();

  useEffect(() => {
    const recipedata = async () => {
      try {
        const response = await axios.get("http://localhost:3001/recipes");
        setRecipe(response.data);
      } catch (error) {
        console.error(error);
      }
    };

    const savedrecipedata = async () => {
      try {
        const response = await axios.get(
          `http://localhost:3001/recipes/savedRecipes/ids/${userid}`
        );
        if (response.data.message) {
          setTimeout(() => {
            alert(response.data.message);
          }, 5000);
        }
        console.log(response.data.savedRecipes);
        setSavedRecipes(response.data.savedRecipes);
      } catch (error) {
        console.error(error);
      }
    };

    recipedata();
    savedrecipedata();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  async function saveRecipebtn(recipeid, userid) {
    try {
      const response = await axios.put("http://localhost:3001/recipes", {
        recipeid: recipeid,
        userid: userid,
      });
      console.log(response.data.message);
      if (response.data.message) {
        alert(response.data.message);
      }
      setSavedRecipes(response.data.savedRecipes);
    } catch (error) {
      console.error(error);
    }
  }

  return (
    <div>
      <>
        <h1>
          <b>Recipes</b>
        </h1>
        <div className="outercontainer">
          {recipe.map((recipe, index) => (
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
                <button
                  onClick={() => saveRecipebtn(recipe._id, userid)}
                  style={{
                    backgroundColor:
                      savedrecipes !== undefined &&
                      savedrecipes.includes(recipe._id)
                        ? "#333333"
                        : "#A34656",
                    color: "white", // Text color, adjust as needed
                  }}
                  disabled={
                    savedrecipes !== undefined &&
                    savedrecipes.includes(recipe._id)
                  }
                >
                  {savedrecipes !== undefined &&
                  savedrecipes.includes(recipe._id)
                    ? "Saved"
                    : "Save"}
                </button>
              </div>
            </div>
          ))}
        </div>
      </>
    </div>
  );
}

export default Home;
