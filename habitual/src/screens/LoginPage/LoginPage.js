import React, { useState, useEffect, useContext } from "react";
import LoginBox from "../../components/LoginBox/loginBox";
import "./styles.css";
import {
  TextField,
  Button,
  Grid,
  Typography,
  Container,
} from "@material-ui/core";
import { Link } from "react-router-dom";
import Box from "@material-ui/core/Box";
import "../../App.css";
import Footer from "../../components/Footer";
import Axios from "axios";
import { UserContext } from "../../contexts/UserContext";
import {red } from "@material-ui/core/colors";


export default function LoginPage({ Login }) {
  // this is for the login
  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");

  // this is for the sign up
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [signUpUsername, setSignUpUsername] = useState("");
  const [signUpPassword, setSignUpPassword] = useState("");

  // to check login status
  const [loginStatus, setLoginStatus] = useState("");
  const [signUpStatus, setSignUpStatus] = useState("");

  const { name, setName, user, setUser, userId, setUserId } =
    useContext(UserContext);

  console.log(user);
  Axios.defaults.withCredentials = true;

  const loginHandler = (e) => {
    if (userName === "user" && password === "user") {
      Login("user");
    } else if (userName === "admin" && password === "admin") {
      Login("admin");
    } else {
      Login("");
    }
  };
  // csr

  const signup = () => {
    if (
      fullName == "" ||
      signUpUsername == "" ||
      email == "" ||
      signUpPassword == ""
    ) {
      setSignUpStatus("All fields are required");
      return;
    }
    const user = {
      name: fullName,
      username: signUpUsername,
      email: email,
      password: signUpPassword,
    };
    console.log(user);

    return Axios.post("/users/add/", {
      name: fullName,
      username: signUpUsername,
      email: email,
      password: signUpPassword,
    }).then((res) => {
      if (res.data.message && res.data.newUser) {
        setSignUpStatus("Successfully Signed Up. You may now log in.");
      } else {
        setSignUpStatus("Username already in use");
      }
    });
  };

  const singUpHandler = () => {
    signup();
    setFullName("");
    setEmail("");
    setSignUpUsername("");
    setSignUpPassword("");
  };

  const login = () => {
    const user = {
      username: userName,
      password: password,
    };
    console.log(user);
    return Axios.post("/users/login", user).then((res) => {
      console.log("hellooo ");
      if (res.data.message && res.data.user) {
        setLoginStatus("Logged in as " + res.data.user.username);
        setUser(res.data.user.username);
        setName(res.data.user.name);
        setUserId(res.data.user.userId);
        console.log(res.data.message);
      } else {
        setLoginStatus("Username/Password Incorrect");
      }
    });
  };

  const getUser = () => {
    return Axios.get("/users/login").then((response) => {
      console.log("hello");
      console.log(response);
    });
  };

  const logout = () => {
    return Axios.get("/users/logout").then((response) => {
      setLoginStatus("Logged Out");
    });
  };

  useEffect(() => {
    console.log("UseEffect");
    return Axios.get("/users/login").then((response) => {
      if (response.data.loggedIn == true) {
        console.log("axios response");
        console.log(response.data.user);
        setUser(response.data.user);
        setName(response.data.name);
        setUserId(response.data.userId);
        setLoginStatus("Logged in as " + response.data.user.username);
      }
    });
  });

  return (
    <Container>
    <Container>
      <Grid
        container
        spacing={7}
        alignItems="center"
        justify="center"
        style={{ minHeight: "100vh" }}
      >
        <Grid item xs={6}>
        {/* Sign Up */}
        <Grid container className="round-edge  signin-style shadow" spacing={1}>
          <Grid item xs={12} align="center">
            <Typography component="div">
              <Box sx={{ textAlign: "center", fontSize: 35, fontWeight: 500 }}>
                Sign up
              </Box>
            </Typography>
          </Grid>
          <Grid item xs={12} align="center">
            <TextField
              id="standard-multiline-static"
              variant="standard"
              label="Full Name"
              onChange={(e) => {
                setFullName(e.target.value);
              }}
              value={fullName}
            />
          </Grid>
          <Grid item xs={12} align="center">
            <TextField
              id="standard-multiline-static"
              variant="standard"
              label="email"
              onChange={(e) => {
                setEmail(e.target.value);
              }}
              value={email}
            />
          </Grid>
          <Grid item xs={12} align="center">
            <TextField
              id="standard-multiline-static"
              variant="standard"
              label="username"
              onChange={(e) => {
                setSignUpUsername(e.target.value);
              }}
              value={signUpUsername}
            />
          </Grid>
          <Grid item xs={12} align="center">
            <TextField
              id="standard-multiline-static"
              variant="standard"
              label="password"
              type="password"
              onChange={(e) => {
                setSignUpPassword(e.target.value);
              }}
              value={signUpPassword}
            />
          </Grid>
          <Grid item xs={12} align="center">
            <Button className="smallButton" onClick={signup}>
              Sign Up
            </Button>
            <Typography component="div">
              <Box
                sx={{
                  textAlign: "centre",
                  fontSize: 12,
                  fontWeight: 500,
                  mt: 10,
                }}
              >
                HABITUAL
              </Box>
            </Typography>
            <Typography component="div">
              <Box
                sx={{
                  textAlign: "centre",
                  fontSize: 15,
                  fontWeight: 500,
                  mt: 10,
                  color: red[500]
                }}
              >
                {signUpStatus}
              </Box>
            </Typography>
          </Grid>
        </Grid>
        </Grid>
        <Grid item xs={6}>
        {/* Login */}
        <Grid container className="round-edge  signin-style shadow" spacing={1}>
          <Grid item xs={12} align="center">
            <Typography component="div">
              <Box sx={{ textAlign: "center", fontSize: 35, fontWeight: 500 }}>
                Log in
              </Box>
            </Typography>
          </Grid>
          <Grid item xs={12} align="center">
            <TextField
              id="standard-multiline-static"
              variant="standard"
              label="username"
              onChange={(e) => {
                setUserName(e.target.value);
              }}
              value={userName}
            />
          </Grid>
          <Grid item xs={12} align="center">
            <TextField
              id="standard-multiline-static"
              variant="standard"
              label="password"
              type="password"
              onChange={(e) => {
                setPassword(e.target.value);
              }}
              value={password}
            />
          </Grid>
          <Grid item xs={12} align="center">
            <Button className="smallButton" onClick={login}>
              Login
            </Button>
            <Typography component="div">
              <Box
                sx={{
                  textAlign: "centre",
                  fontSize: 12,
                  fontWeight: 500,
                  mt: 10,
                }}
              >
                HABITUAL
              </Box>
            </Typography>
            <Typography component="div">
              <Box
                sx={{
                  textAlign: "centre",
                  fontSize: 15,
                  fontWeight: 500,
                  mt: 10,
                  color: red[500]
                }}
              >
                {loginStatus}
              </Box>
            </Typography>
          </Grid>
        </Grid>
      </Grid>
      </Grid>
    </Container>
    </Container>
  );
}
