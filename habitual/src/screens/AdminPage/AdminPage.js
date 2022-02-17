import "../../App.css";
import React from "react";
import Footer from "../../components/Footer";
import HabitMain from "../../components/HabitAdmin";
import ReflectMain from "../../components/ReflectAdmin";
import AssessMain from "../../components/AssessAdmin";

import Typography from "@material-ui/core/Typography";
import Box from "@material-ui/core/Box";
import Container from "@material-ui/core/Container";
import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";
import { useState } from "react";


export default function ProfilePage() {
  // const [category, setCategory] = useState("access");
  const [assess, setAssess] = useState(true);
  const [reflect, setReflect] = useState(false);
  const [habits, setHabits] = useState(false);

  return (
    <div className="App">
      <header className="align-center">
        <div className="mt-5">
          <Container maxWidth="lg" justifyContent="center">
            <img
              className="img-style"
              src="https://i.pinimg.com/564x/75/af/d4/75afd4263c2d06662c52ac8e9fd0e155.jpg"
              alt="Admin Profile Pic"
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
                Admin Dashboard
              </Box>
              <Box sx={{ textAlign: "center", typography: "subtitle2", mb: 5 }}>
                @admin
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
                    Users
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
                    Users
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
                    Posts
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
                    Posts
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
