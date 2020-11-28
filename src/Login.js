import { Button } from "@material-ui/core";
import { auth, provider } from "./firebase";
import React from "react";
import "./Login.css";

function Login() {
  const signIn = () => {
    auth.signInWithPopup(provider).catch((error) => alert(error.message));
  };

  return (
    <div className="login">
      <div className="bg"></div>
      <div className="bg bg2"></div>
      <div className="bg bg3"></div>
      <h2>I AM MISTER LOGIN PAGE</h2>

      <div className="login__logo">
        <img
          src="https://media.tenor.com/images/7645a8d8641078195b89b1b7f096c7b2/tenor.gif"
          alt=""
        />
      </div>

      <Button onClick={signIn}>Sign In</Button>
    </div>
  );
}

export default Login;
