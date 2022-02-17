import "../../App.css";
import React from "react";
import Footer from "../../components/Footer";
import Box from "@material-ui/core/Box";
import Container from "@material-ui/core/Container";
import Button from "@material-ui/core/Button";
import Grid from "@material-ui/core/Grid";
import ArrowForwardIcon from "@material-ui/icons/ArrowForward";
import ProfileData from "../../components/ProfileData";

// import { useState } from "react";

import "./styles.css";
// import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import { BrowserRouter as Link } from "react-router-dom";

export default function ProfileHabitsPage() {
  /* const [userProfile, setUserProfile] = useState({
    fullName: "User",
    handle: "user",
  }); */
  const userProfile = {
    fullName: "Sierra Hashi",
    handle: "user",
  };

  return (
    <div className="App">
      <header className="profile-header">
        <div className="mt-5">
          <ProfileData
            name={userProfile.fullName}
            userHandle={userProfile.handle}
          />
        </div>
      </header>
      <Container maxWidth="lg">
        <Grid container justify="flex-end" spacing={3}>
          <Grid item xs={12} sm={12} md={4} lg={4} xl={4} alignItems="flex-end">
            <Button>
              <Box
                display="flex"
                maxWidth="lg"
                maxHeight="lg"
                textAlign="center"
                verticalAlign="bottom"
                to="/habits"
                component={Link}
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  fontSize: 27,
                  fontWeight: 500,
                  height: 400,
                }}
                bgcolor="#BBC9D1"
              >
                <ArrowForwardIcon />
                Check out the habits gallery
              </Box>
            </Button>
          </Grid>

          <Grid item xs={12} sm={12} md={8} lg={8} xl={8}>
            <h3> Your Habits</h3>
          </Grid>
        </Grid>
      </Container>
      <Footer />
    </div>
  );
}
