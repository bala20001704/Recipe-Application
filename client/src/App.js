import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Home from "./Pages/Home";
import Auth from "./Pages/Auth";
import CreatedRecipes from "./Pages/CreatedRecipes";
import SavedRecipes from "./Pages/SavedRecipes";
import Navbar from "./Components/Navbar";
import "./App.css";

function App() {
  return (
    <div className="App">
      <Router>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/auth" element={<Auth />} />
          <Route path="/created_recipes" element={<CreatedRecipes />} />
          <Route path="/saved_recipes" element={<SavedRecipes />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
