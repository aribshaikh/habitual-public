import React, { useEffect, useState, useContext } from "react";
import "../../App.css";
import "./styles.css";
import Container from "@material-ui/core/Container";
import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";
import AppBar from "@material-ui/core/AppBar";
import Typography from "@material-ui/core/Typography";
import Box from "@material-ui/core/Box";
import Toolbar from "@material-ui/core/Toolbar";
import CssBaseline from "@material-ui/core/CssBaseline";
import { Link, Navigate } from "react-router-dom";
import { UserContext } from "../../contexts/UserContext";
import Axios from "axios";

export default function Footer(props) {
  const [community, setCommunity] = useState(null);
  const [profile, setProfile] = useState(null);

  const { user, setUser } = useContext(UserContext);

  const findPage = (category) => {
    if (props.pageOn === "community") {
      setCommunity(true);
      setProfile(false);
    } else if (props.pageOn === "profile") {
      setCommunity(false);
      setProfile(true);
    }
  };
  const logout = () => {
    return Axios.get("/users/logout").then((response) => {
      setUser("");
    });
  };

  useEffect(() => {
    findPage(props.pageOn);
  });
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        minHeight: "20vh",
      }}
    >
      <CssBaseline />
      <Box
        display="flex"
        component="footer"
        sx={{
          height: "7vh",
        }}
      >
        <AppBar className="bottomBar-style" position="relative">
          <Toolbar>
            <Container maxWidth="lg">
              <Grid container spacing={2} className="buttons-position">
                <Grid item xs>
                  <Typography component="div">
                    <Box
                      sx={{
                        textAlign: "left",
                        fontSize: 12,
                        fontWeight: 500,
                        pt: 1.25,
                      }}
                    >
                      HABITUAL
                    </Box>
                  </Typography>
                </Grid>
                <Grid
                  item
                  direction="column"
                  alignItems="flex-end"
                  justifyContent="flex-end"
                >
                  <Button
                    className="smallButtonInverted"
                    variant="outlined"
                    style={{
                      display: community ? "block" : "none",
                    }}
                    to="/community"
                    component={Link}
                  >
                    Community
                  </Button>
                  <Button
                    className="smallButton"
                    variant="outlined"
                    style={{
                      display: community ? "none" : "block",
                    }}
                    to="/community"
                    component={Link}
                  >
                    Community
                  </Button>
                </Grid>
                <Grid
                  item
                  direction="column"
                  alignItems="flex-end"
                  justifyContent="flex-end"
                >
                  <Button
                    className="smallButtonInverted"
                    variant="outlined"
                    style={{
                      display: profile ? "block" : "none",
                    }}
                    to="/profile"
                    component={Link}
                  >
                    Profile
                  </Button>
                  <Button
                    className="smallButton"
                    variant="outlined"
                    style={{
                      display: profile ? "none" : "block",
                    }}
                    to="/profile"
                    component={Link}
                  >
                    Profile
                  </Button>
                </Grid>
                <Grid
                  item
                  direction="column"
                  alignItems="flex-end"
                  justifyContent="flex-end"
                >
                  <Button
                    className="smallButton"
                    variant="outlined"
                    onClick={logout}
                  >
                    Log Out
                  </Button>
                </Grid>
              </Grid>
            </Container>
          </Toolbar>
        </AppBar>
      </Box>
    </Box>
  );
}
