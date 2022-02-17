import "../../App.css";
import React from "react";
import Footer from "../../components/Footer";
import HabitMain from "../../components/HabitMain";
import ReflectMain from "../../components/ReflectMain";
import AssessMain from "../../components/AssessMain";
import Typography from "@material-ui/core/Typography";
import Box from "@material-ui/core/Box";
import Container from "@material-ui/core/Container";
import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";
import { useState, useContext, useEffect } from "react";

import { BrowserRouter as Router, Link } from "react-router-dom";
import { UserContext } from "../../contexts/UserContext";
import axios from "axios";

export default function ProfilePage() {
  /* const [userProfile, setUserProfile] = useState({
    fullName: "Sierra Hashi",
    handle: "user",
  }); */
  const userProfile = {
    fullName: "Sierra Hashi",
    handle: "user",
  };

  const { name, setName, user, setUser, userId } = useContext(UserContext);

  const [category, setCategory] = useState("access");
  const [assess, setAssess] = useState(true);
  const [reflect, setReflect] = useState(false);
  const [habits, setHabits] = useState(false);
  const [userr, setUserr] = useState("");
  const [loading, setLoading] = useState(true);

  return (
    <div className="App">
      <header className="align-center">
        <div className="mt-5">
          <Container maxWidth="lg" justifyContent="center">
            <img
              className="img-style"
              src="data:image/png;base64,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"
              alt="Profile Pic"
            />
            <Typography component="div" className="mt-2">
              <Box
                sx={{
                  textAlign: "center",
                  fontSize: 40,
                  lineHeight: "1.1em",
                  fontWeight: 500,
                }}
              >
                {name}
              </Box>
              <Box sx={{ textAlign: "center", typography: "subtitle2", mb: 5 }}>
                @{user}
              </Box>
            </Typography>
            <Box sx={{ mb: 5 }}>
              <Grid container justifyContent="center" spacing={1} margin={5}>
                <Grid item>
                  <Button
                    className="mainButton"
                    variant="outlined"
                    style={{ display: assess ? "none" : "block" }}
                    onClick={() => {
                      // setCategory("assess");
                      setAssess(true);
                      setReflect(false);
                      setHabits(false);
                    }}
                  >
                    Assess
                  </Button>
                  <Button
                    className="mainButtonInverted"
                    variant="outlined"
                    style={{ display: assess ? "block" : "none" }}
                    onClick={() => {
                      // setCategory("assess");
                      setAssess(true);
                      setReflect(false);
                      setHabits(false);
                    }}
                  >
                    Assess
                  </Button>
                </Grid>
                <Grid item>
                  <Button
                    className="mainButton"
                    variant="outlined"
                    style={{ display: reflect ? "none" : "block" }}
                    onClick={() => {
                      // setCategory("reflect");
                      setAssess(false);
                      setReflect(true);
                      setHabits(false);
                    }}
                  >
                    Reflect
                  </Button>
                  <Button
                    className="mainButtonInverted"
                    variant="outlined"
                    style={{ display: reflect ? "block" : "none" }}
                    onClick={() => {
                      // setCategory("reflect");
                      setAssess(false);
                      setReflect(true);
                      setHabits(false);
                    }}
                  >
                    Reflect
                  </Button>
                </Grid>
                <Grid item>
                  <Button
                    className="mainButton"
                    variant="outlined"
                    style={{ display: habits ? "none" : "block" }}
                    onClick={() => {
                      // setCategory("habits");
                      setAssess(false);
                      setReflect(false);
                      setHabits(true);
                    }}
                  >
                    Habits
                  </Button>
                  <Button
                    className="mainButtonInverted"
                    variant="outlined"
                    style={{ display: habits ? "block" : "none" }}
                    onClick={() => {
                      // setCategory("habits");
                      setAssess(false);
                      setReflect(false);
                      setHabits(true);
                    }}
                  >
                    Habits
                  </Button>
                </Grid>
              </Grid>
            </Box>
          </Container>
        </div>
      </header>

      {/* Asses Component */}
      <div style={{ display: assess ? "block" : "none" }}>
        <AssessMain />
      </div>

      {/* Reflect Component */}
      <div style={{ display: reflect ? "block" : "none" }}>
        <ReflectMain />
      </div>

      {/* Habits Component */}
      <div style={{ display: habits ? "block" : "none" }}>
        <HabitMain />
      </div>
      <Footer pageOn={"profile"} />
    </div>
  );
}
