import React from "react";
import LoginStyles from "../Login.module.css";
import { useGoogleLogin } from "@react-oauth/google";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import Avatar from "@mui/material/Avatar";
import { Button } from "@mui/material";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import Link from "@mui/material/Link";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { useState } from "react";

export default function Login() {
  const defaultTheme = createTheme();
  const API = axios.create({ baseURL: "http://localhost:8070" });
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const signInGoogle = (accessToken) =>
    API.post("/users/signin", {
      googleAccessToken: accessToken,
    })
      .then((res) => {
        console.log(res);
        localStorage.setItem("username", res.data.result.firstName);
        navigate("/");
      })
      .catch((err) => {
        if (err.response.status == 404)
          window.alert("Email Id doesn't exists.Please Signup first");
      });
  function handleGoogleLoginSuccess(tokenResponse) {
    const accessToken = tokenResponse.access_token;
    console.log(accessToken);

    signInGoogle(accessToken);
  }
  const login = useGoogleLogin({ onSuccess: handleGoogleLoginSuccess });
  const handleSubmit = (event) => {
    event.preventDefault();
    if (email == "" || password == "") {
      window.alert("Please fill mandatory fields");
    } else {
      API.post("/users/signin", {
        email: email,
        password: password,
      })
        .then((res) => {
          console.log(res);
          localStorage.setItem("username", res.data.result.firstName);
          navigate("/");
        })
        .catch((err) => {
          if (err.response.status == 404)
            window.alert("Email Id doesn't exists.Please Signup first");
          else if (err.response.status == 400)
            window.alert("Invalid Credentials");
        });
    }
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
            Sign In
          </Typography>
          <Box component="form" sx={{ mt: 3 }}>
            <Grid container spacing={2}>
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
              Sign In
            </Button>
            or
          </Box>
          <button onClick={() => login()} className={LoginStyles.googleBTN}>
            <i className="fa-brands fa-google"></i> Sign In with google
          </button>
          <Grid container justifyContent="flex-end">
            <Grid item>
              <Link href="signup2" variant="body2">
                Not Registered yet? Sign up
              </Link>
            </Grid>
          </Grid>
        </Box>
      </Container>
    </ThemeProvider>
  );
}
