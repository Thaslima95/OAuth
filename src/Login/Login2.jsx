import React from "react";
import LoginStyles from "../Login.module.css";
import { useGoogleLogin } from "@react-oauth/google";
import axios from "axios";
import { useNavigate } from "react-router-dom";
export default function Login2() {
  const API = axios.create({ baseURL: "http://localhost:8070" });

  const navigate = useNavigate();
  const signUpGoogle = (accessToken) =>
    API.post("/users/signin", {
      googleAccessToken: accessToken,
    })
      .then((res) => {
        console.log(res);
        localStorage.setItem("username", res.data.result.firstName);
        navigate("/");
      })
      .catch((err) => console.log(err));
  function handleGoogleLoginSuccess(tokenResponse) {
    const accessToken = tokenResponse.access_token;

    signUpGoogle(accessToken);
  }
  const login = useGoogleLogin({ onSuccess: handleGoogleLoginSuccess });
  return (
    <button onClick={() => login()} className={LoginStyles.googleBTN}>
      <i class="fa-brands fa-google"></i> Sign In with google
    </button>
  );
}
