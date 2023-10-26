import * as React from "react";
import Avatar from "@mui/material/Avatar";
import { Button } from "@mui/material";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import LoginStyles from "../Login.module.css";
import { useGoogleLogin } from "@react-oauth/google";
import Link from "@mui/material/Link";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { useState } from "react";
import FacebookLogin from "react-facebook-login";

const defaultTheme = createTheme();

export default function Signup2() {
  const API = axios.create({ baseURL: "http://localhost:8070" });

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const signUpGoogle = (accessToken) =>
    API.post("/users/signup", {
      googleAccessToken: accessToken,
    })
      .then((res) => {
        console.log(res);
        localStorage.setItem("username", res.data.result.firstName);
        navigate("/");
      })
      .catch((err) => {
        if (err.response.status == 400)
          window.alert("User Already Exists.Please Login");
      });
  function handleGoogleLoginSuccess(tokenResponse) {
    const accessToken = tokenResponse.access_token;

    signUpGoogle(accessToken);
  }
  const login = useGoogleLogin({ onSuccess: handleGoogleLoginSuccess });
  const handleSubmit = (event) => {
    event.preventDefault();
    if (firstName == "" || lastName == "" || email == "" || password == "") {
      window.alert("Please fill mandatory fields");
    } else {
      API.post("/users/signup", {
        email: email,
        password: password,
        firstName: firstName,
        lastName: lastName,
      })
        .then((res) => {
          console.log(res);
          localStorage.setItem("username", res.data.result.firstName);
          navigate("/");
        })
        .catch((err) => {
          if (err.response.status == 400)
            window.alert("User Already Exists.Please Login");
        });
    }
  };
  const responseFacebook = (response) => {
    // Handle the response from Facebook here
    API.post("/users/signup", {
      facebookAccessToken: response.accessToken,
    })
      .then((res) => {
        console.log(res);
        localStorage.setItem("username", res.data.result.firstName);
        navigate("/");
      })
      .catch((err) => {
        if (err.response.status == 400)
          window.alert("User Already Exists.Please Login");
      });
  };

  return (
    <ThemeProvider theme={defaultTheme}>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Sign up
          </Typography>
          <Box noValidate sx={{ mt: 3 }}>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                <TextField
                  autoComplete="given-name"
                  name="firstName"
                  required
                  fullWidth
                  id="firstName"
                  label="First Name"
                  autoFocus
                  onChange={(e) => setFirstName(e.target.value)}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  required
                  fullWidth
                  id="lastName"
                  label="Last Name"
                  name="lastName"
                  autoComplete="family-name"
                  onChange={(e) => setLastName(e.target.value)}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  id="email"
                  label="Email Address"
                  name="email"
                  autoComplete="email"
                  onChange={(e) => setEmail(e.target.value)}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  name="password"
                  label="Password"
                  type="password"
                  id="password"
                  autoComplete="new-password"
                  onChange={(e) => setPassword(e.target.value)}
                />
              </Grid>
            </Grid>
            <Button
              onClick={(e) => handleSubmit(e)}
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Sign Up
            </Button>
            or
          </Box>
          <button onClick={() => login()} className={LoginStyles.googleBTN}>
            <i className="fa-brands fa-google"></i> Sign Up with google
          </button>
          <FacebookLogin
            appId="app-id"
            autoLoad={false}
            fields="name,email,picture"
            callback={responseFacebook}
          />
          <Grid container justifyContent="flex-end">
            <Grid item>
              <Link href="login" variant="body2">
                Already have an account? Sign in
              </Link>
            </Grid>
          </Grid>
        </Box>
      </Container>
    </ThemeProvider>
  );
}
