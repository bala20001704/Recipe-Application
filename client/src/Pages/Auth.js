import React from "react";
import { useState } from "react";
import "./Auth.css";
import axios from "axios";
import { useCookies } from "react-cookie";
import { useNavigate } from "react-router-dom";

function Auth() {
  return (
    <div className="outercontainer">
      <div className="leftside_innercontainer">
        <Login />
      </div>
      <div className="rightside_innercontainer">
        <Register />
      </div>
    </div>
  );
}

export default Auth;

function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [cookies, setCookies] = useCookies(["accessToken"]);
  const navigate = useNavigate();

  async function onSubmit(event) {
    event.preventDefault();

    try {
      const response = await axios.post("http://localhost:3001/auth/login", {
        username: username,
        password: password,
      });

      if (response.data.message) {
        alert(response.data.message);
      } else {
        console.log(response);
        console.log(cookies.accessToken);
        setCookies("accessToken", response.data.token);
        console.log(cookies);
        console.log(response.data.userid);
        localStorage.setItem("userid", response.data.userid);
        alert("Welcome");
        navigate("/");
      }
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <div>
      <Form
        username={username}
        setUsername={setUsername}
        password={password}
        setPassword={setPassword}
        label="Login"
        onSubmit={onSubmit}
      />
    </div>
  );
}

function Register() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  async function onSubmit(event) {
    event.preventDefault();

    try {
      const response = await axios.post("http://localhost:3001/auth/register", {
        username: username,
        password: password,
      });

      if (response.data.message) {
        alert(response.data.message);
        setPassword("");
        setUsername("");
      } else {
        alert("Registration successful! Log in now.");
        setPassword("");
        setUsername("");
      }
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <div>
      <Form
        username={username}
        setUsername={setUsername}
        password={password}
        setPassword={setPassword}
        label="Register"
        onSubmit={onSubmit}
      />
    </div>
  );
}

function Form({
  username,
  setUsername,
  password,
  setPassword,
  label,
  onSubmit,
}) {
  return (
    <div className="Form_outercontainer">
      <form onSubmit={onSubmit}>
        <h2>{label}</h2>
        <div className="formgroup">
          <label htmlFor="username">Username:</label>
          <input
            type="text"
            id="username"
            value={username}
            onChange={(event) => setUsername(event.target.value)}
          />
        </div>
        <div className="formgroup">
          <label htmlFor="password">Password:</label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(event) => setPassword(event.target.value)}
          />
        </div>
        <button type="submit">{label}</button>
      </form>
    </div>
  );
}
