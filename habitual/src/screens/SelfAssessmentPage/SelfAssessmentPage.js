import React, { useState, useContext, useEffect } from "react";
import "../../App.css";
import { quizQuestions } from "../../objects/questions/questionsData";
import Container from "@material-ui/core/Container";
import Box from "@material-ui/core/Box";
import Typography from "@material-ui/core/Typography";
import { Button } from "@material-ui/core";
import Footer from "../../components/Footer";
import Answers from "../../components/Answers/Answers";
import { Link } from "react-router-dom";
import Grid from "@material-ui/core/Grid";
import axios from "axios";
import { UserContext } from "../../contexts/UserContext";

export default function SelfAssessmentPage() {
  const { name, setName, user, setUser, userId, setUserId } =
    useContext(UserContext);

  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [showScore, setShowScore] = useState(false);
  const [result, setResult] = useState(0);
  const [valuez, setValuez] = useState(0);
  const resultsObj = {
    0: "We're so happy to hear you're doing well :)",
    1: "You seem to be okay. Keep on going champ!",
    2: "The only direction from being at rock bottom is up <3",
  };

  const resultsProfile = {
    0: "Very Well",
    1: "Okay",
    2: "Needs Improvement",
  };

  const onClickz = (value) => {
    setValuez(value);
    setResult(result + value);
    const nextQuestion = currentQuestion + 1;
    if (nextQuestion < quizQuestions.length) {
      setCurrentQuestion(nextQuestion);
    } else {
      setValuez(value);
      //console.log("value "+ value);
      setResult(Math.round((result + value) / 6));
      //console.log(Math.round((result + value) / 6));
      setShowScore(true);
      //console.log(result);
      handleAssessment();
    }
  };

  const addAssessment = (assessment) => {
    return axios
      .post("/users/addAsssessment/" + userId, assessment)
      .then((res) => console.log(res.data));
  };

  const handleAssessment = () => {
    let assessment = {
      result: resultsProfile[Math.round((result + valuez) / 6)],
    };
    console.log(assessment);
    addAssessment(assessment);
  };

  return (
    <div>
      {showScore ? (
        <>
          {/* Style this if you can lol */}
          <div>
            <Container maxWidth="xs">
              <Grid
                container
                spacing={0}
                alignItems="center"
                justify="center"
                style={{ minHeight: "100vh" }}
              >
                <Grid
                  container
                  className="round-edge quiz-card shadow"
                  spacing={1}
                >
                  <Grid item xs={12} align="center">
                    <Typography component="div">
                      <Box
                        sx={{
                          textAlign: "center",
                          fontSize: 25,
                          fontWeight: 500,
                          lineHeight: 1.2,
                          mb: 5,
                        }}
                      >
                        {resultsObj[result]}
                      </Box>
                    </Typography>
                  </Grid>

                  <Grid item xs={12} align="center">
                    <Button
                      className="mainButton"
                      variant="outlined"
                      to="/profile"
                      component={Link}
                    >
                      Back to Profiles
                    </Button>
                  </Grid>
                  <Grid item xs={12} align="center">
                    <Button
                      className="smallerButton"
                      variant="outlined"
                      onClick={() => {
                        setCurrentQuestion(0);
                        setShowScore(false);
                        setResult(0);
                      }}
                    >
                      Do quiz again
                    </Button>
                  </Grid>
                </Grid>
              </Grid>
            </Container>
            {/*  <h1>{resultsObj[result]}</h1>
          <Button
            className="mainButton"
            variant="outlined"
            to="/profile"
            component={Link}
          >
            Back to Profiles
          </Button>
          <Button
            className="mainButton"
            variant="outlined"
            onClick={() => {
              setCurrentQuestion(0);
              setShowScore(false);
              setResult(0)
            }}
          >
            Do quiz again
          </Button> */}
            <Footer />
          </div>
        </>
      ) : (
        <>
          <div className="App">
            <header className="App-header">
              <Container maxWidth="lg">
                <Typography component="div" className="mt-6">
                  <Box
                    sx={{
                      textAlign: "left",
                      fontSize: 44,
                      lineHeight: "1.75em",
                      fontWeight: 500,
                    }}
                  >
                    {quizQuestions[currentQuestion].questionName}
                  </Box>
                </Typography>
              </Container>
            </header>
            {quizQuestions[currentQuestion].options.map((question, index) => {
              return <Answers id={index} name={question} onClickz={onClickz} />;
            })}

            <Footer />
          </div>
        </>
      )}
    </div>
  );
}
