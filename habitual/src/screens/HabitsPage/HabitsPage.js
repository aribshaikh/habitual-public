
import React, { useState, useEffect } from "react";
import "../../App.css";
import HabitCategory from "../../components/HabitCategory";
import Footer from "../../components/Footer";
import { habitCategoryData } from "../../objects/habitCategory/habitCategoryData";
import Typography from "@material-ui/core/Typography";
import Box from "@material-ui/core/Box";
import Container from "@material-ui/core/Container";
import axios from "axios";
import Grid from "@material-ui/core/Grid";

export default function HabitsPage() {
  const [cloudData, setCloudData] = useState(null);
  const [isLoading, setLoading] = useState(true);

  useEffect(() => {
    axios
      .get("/habits/")
      .then((response) => {
        if (response.data.length > 0) {
          console.log("hereooo");
          console.log(response);
          setCloudData(response.data);
          //console.log(cloudData);
          if (cloudData != []) {
            setLoading(false);
          }
        }
      })
      .catch((error) => {
        console.log(error);
      });
  }, [cloudData]);
  return (
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
                  textDecoration: "none"
                }}
              >
                Habit Gallery
              </Box>
          </Typography>
      </Container>
      </header>
      
        {/* {cloudData.map((post) => {
          return (
            <HabitCategory
              name={post.name}
              habit1={post.habit1}
              habit2={post.habit2}
              habit3={post.habit3}
              />
          );
        
          })} */}
        {isLoading ? (
              <div></div>
            ) : (
              <div>
                {cloudData.map((post) => {
                  //console.log(post._id);
                  //console.log(typeof post._id);
                  //console.log("iterate")
                  //console.log(postData)
                  // comments={post.comments}
                  // likedUsers={post.userLiked}
                  //console.log("got heree");
                  //console.log(isLoading);
                  //console.log(cloudData);
                  
                    return (
                      <HabitCategory
              name={post.name}
              habit1={post.habit1}
              habit2={post.habit2}
              habit3={post.habit3}
              />
                    );
                  
                })}
                            </div>

            )}
        <Footer />
    </div>
  );
}







