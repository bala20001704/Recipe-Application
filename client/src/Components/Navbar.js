import React from "react";
import { Link } from "react-router-dom";
import "./Navbar.css";
import { useCookies } from "react-cookie";
import { useNavigate } from "react-router-dom";

function Navbar() {
  const [cookies, setCookies] = useCookies(["accessToken"]);
  const navigate = useNavigate();

  async function logout() {
    setCookies("accessToken", "");
    localStorage.removeItem("userid");
    navigate("/auth");
  }

  return (
    <div className="navbar">
      <div className="inner_navbar">
        <Link to="/">Home</Link>
        <Link to="/created_recipes">Created Recipes</Link>
        <Link to="/saved_recipes">Saved Recipes</Link>
        {cookies.accessToken ? (
          <button onClick={logout}>Logout</button>
        ) : (
          <Link to="/auth">Login/Register</Link>
        )}
      </div>
    </div>
  );
}

export default Navbar;
