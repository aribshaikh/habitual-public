import React, { useState, useEffect, useContext } from "react";
import "../../App.css";
import CommunityPost from "../../components/CommunityPost";
import Footer from "../../components/Footer";
import WriteReflection from "../../components/WriteReflection";
import { communityPostData } from "../../objects/communityPost/communityPostData";
import Container from "@material-ui/core/Container";
import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import axios from "axios";
import { UserContext } from "../../contexts/UserContext";

export default function CommunityPage() {
  const [postData, setPostData] = useState(communityPostData);
  const [cloudData, setCloudData] = useState(null);
  const [category, setCategory] = useState("TRENDING");
  const [trending, setTrending] = useState(true);
  const [stress, setStress] = useState(false);
  const [time, setTime] = useState(false);
  const [isLoading, setLoading] = useState(true);

  const { user, setUser, userId } = useContext(UserContext);

  const AddPost = (data) => {
    setPostData({ ...data });
    //getData();
    //console.log("after");
    //console.log(postData);
  };

  useEffect(() => {
    /* 
    let didCancel = false;
    async function getCloudData() {
      if (!didCancel) {
        let response = await fetch("http://localhost:5000/posts/");
        let data = await response.json();
        console.log("useeffect");
        console.log(data);
        setCloudData(data);
        setLoading(false);
      }
    }
    getCloudData();
       */

    axios
      .get("/posts/")
      .then((response) => {
        if (response.data.length > 0) {
          //console.log("hereooo");
          //console.log(response);
          let x = response.data;
          x = x.reverse();
          setCloudData(x);
          //let x = cloudData.reverse();
          //setCloudData(x);
          //console.log(cloudData);
          if (cloudData != []) {
            setLoading(false);
          }
        }
      })
      .catch((error) => {
        console.log(error);
      });
  });

  return (
    <div className="App">
      <header className="App-header">
        <AppBar position="sticky" elevation={0} className="appBar-style">
          <Container maxWidth="lg">
            <Toolbar>
              <Grid container spacing={2}>
                <Grid item>
                  <Button
                    className="mainButton"
                    variant="outlined"
                    style={{ display: trending ? "none" : "block" }}
                    onClick={() => {
                      setCategory("TRENDING");
                      setTrending(true);
                      setStress(false);
                      setTime(false);
                    }}
                  >
                    Trending
                  </Button>
                  <Button
                    className="mainButtonInverted"
                    variant="outlined"
                    style={{ display: trending ? "block" : "none" }}
                    onClick={() => {
                      setCategory("TRENDING");
                      setTrending(true);
                      setStress(false);
                      setTime(false);
                    }}
                  >
                    Trending
                  </Button>
                </Grid>
                <Grid item>
                  <Button
                    className="mainButton"
                    variant="outlined"
                    style={{ display: stress ? "none" : "block" }}
                    onClick={() => {
                      setCategory("STRESS");
                      setTrending(false);
                      setStress(true);
                      setTime(false);
                    }}
                  >
                    Stress
                  </Button>
                  <Button
                    className="mainButtonInverted"
                    variant="outlined"
                    style={{ display: stress ? "block" : "none" }}
                    onClick={() => {
                      setCategory("STRESS");
                      setTrending(false);
                      setStress(true);
                      setTime(false);
                    }}
                  >
                    Stress
                  </Button>
                </Grid>
                <Grid item>
                  <Button
                    className="mainButton"
                    variant="outlined"
                    style={{ display: time ? "none" : "block" }}
                    onClick={() => {
                      setCategory("TIME");
                      setTrending(false);
                      setStress(false);
                      setTime(true);
                    }}
                  >
                    Time Management
                  </Button>
                  <Button
                    className="mainButtonInverted"
                    variant="outlined"
                    style={{ display: time ? "block" : "none" }}
                    onClick={() => {
                      setCategory("TIME");
                      setTrending(false);
                      setStress(false);
                      setTime(true);
                    }}
                  >
                    Time Management
                  </Button>
                </Grid>
              </Grid>
            </Toolbar>
          </Container>
        </AppBar>
        <Container maxWidth="lg">
          <Grid container spacing={3}>
            <Grid item xs={12} sm={12} md={4} lg={4} xl={4}>
              <WriteReflection
                AddPost={AddPost}
                data={postData}
                category={category}
              />
            </Grid>
            {isLoading ? (
              <div></div>
            ) : (
              <Grid item xs={12} sm={12} md={8} lg={8} xl={8}>
                {cloudData.map((post) => {
                  //console.log(post._id);
                  //console.log(typeof post._id);
                  //console.log("iterate")
                  //console.log(postData)
                  // comments={post.comments}
                  // likedUsers={post.userLiked}
                  //console.log("got heree");
                  //console.log(isLoading);
                  //console.log(cloudData);)
                  if (post.category == category) {
                    //console.log(user ==)
                    if (user == post.username && post.private == true) {
                      return (
                        <CommunityPost
                          postID={post._id}
                          name={post.title}
                          userHandle={post.username}
                          postContent={post.postContent}
                          comments={post.comments}
                          usersLiked={post.usersLiked}
                          isPrivate={true}
                        />
                      );
                    } else if (user == post.username && post.private == false) {
                      return (
                        <CommunityPost
                          postID={post._id}
                          name={post.title}
                          userHandle={post.username}
                          postContent={post.postContent}
                          comments={post.comments}
                          usersLiked={post.usersLiked}
                          isPrivate={false}
                        />
                      );
                    } else if (user != post.username && post.private == false) {
                      return (
                        <CommunityPost
                          postID={post._id}
                          name={post.title}
                          userHandle={post.username}
                          postContent={post.postContent}
                          comments={post.comments}
                          usersLiked={post.usersLiked}
                          isPrivate={false}
                        />
                      );
                    }
                  }
                })}
              </Grid>
            )}
          </Grid>
        </Container>
        <Footer pageOn={"community"} />
      </header>
    </div>
  );
}
