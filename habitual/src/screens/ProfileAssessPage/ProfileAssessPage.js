import "../../App.css";
//import React from "react";
import Footer from "../../components/Footer";
import Box from '@material-ui/core/Box';
import Container from '@material-ui/core/Container'
import Button from '@material-ui/core/Button'
import Grid from '@material-ui/core/Grid'
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableRow from "@material-ui/core/TableRow";
import "./styles.css"
import ProfileData from "../../components/ProfileData";
import React, { useState, useEffect, useContext } from "react";
import { UserContext } from "../../contexts/UserContext";
import axios from "axios";
import ArrowForwardIcon from '@material-ui/icons/ArrowForward';

export default function ProfileAssessPage() {
  // const [userProfile, setUserProfile] = useState({ "fullName": "User", "handle": "user" });
  const [isLoading, setLoading] = useState(true);

  const [cloudData, setCloudData] = useState(null);
  const { name, setName, user, setUser, userId, setUserId } =
  useContext(UserContext);

  useEffect(() => {
    axios
      .get("/users/getUsers/" + userId)
      .then((response) => {
          console.log(response.data.assessments );
          setCloudData(response.data.assessments);
          if (cloudData != []) {
            setLoading(false);
          }
      }).catch((error) => {
        console.log(error);
      });
  }, [cloudData]);
  

  return (
    <div className="App">
      <header className="profile-header">
        {/* <div className="mt-5">
          <ProfileData
            name={name}
            userHandle={userProfile.handle}
          />
        </div> */}
      </header>

      <Container maxWidth='lg'>

        <Grid container justify="flex-end" spacing={3}>
          <Grid item xs={12} sm={12} md={4} lg={4} xl={4} alignItems="flex-end" >
            <Button>

              <Box display="flex" maxWidth='lg' maxHeight='lg' textAlign='center' verticalAlign="bottom" sx={{
                display: 'flex',
                flexDirection: 'column', fontSize: 27, fontWeight: 500, height: 400
              }} bgcolor="#BBC9D1"
              >
                <Grid container justifyContent="flex-end">
                  <ArrowForwardIcon className="arrow" />
                </Grid>
                Take Your Self Assessment

              </Box>
            </Button>

          </Grid>




          <Grid item xs={12} sm={12} md={8} lg={8} xl={8}>
            <h3>  Past Assessments</h3>
            <Table className="assessment-list">
              {/* <TableBody>
                <TableRow>
                  <TableCell component="th" scope="row" align="left">
                    11/07/2021
                  </TableCell>
                  <TableCell component="th" scope="row" align="right">
                    Very Good
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell component="th" scope="row" align="left">
                    11/07/2021
                  </TableCell>
                  <TableCell component="th" scope="row" align="right">
                    Very Good
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell component="th" scope="row" align="left">
                    11/07/2021
                  </TableCell>
                  <TableCell component="th" scope="row" align="right">
                    Very Good
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell component="th" scope="row" align="left">
                    11/07/2021
                  </TableCell>
                  <TableCell component="th" scope="row" align="right">
                    Very Good
                  </TableCell>
                </TableRow>
              </TableBody> */}
            </Table>
          </Grid>
        </Grid>
      </Container>
      <Footer />

    </div>
  );
}
