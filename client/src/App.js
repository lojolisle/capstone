import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux'; 
import { BrowserRouter, Routes, Route } from "react-router-dom";

import { Container, AppBar, Typography, Grow, Grid } from '@material-ui/core';

//import { getDrugs } from './actions/drugs';
import Drugs from './components/Drugs/Drugs';
import Form from './components/Form/Form';

import drugImage from './images/drugImage.png';
import { getDrugs } from './redux/feature/drugSlice';
//import Form from './components/Form';

import Login from './components/Login/Login';
import Register from './components/Register/Register'

import useStyles from './styles';


const App = () => {
  const [currentId, setCurrentId] = useState(0);
  const dispatch = useDispatch();
  const classes = useStyles();

  useEffect(() => {
    dispatch(getDrugs());
  }, [currentId, dispatch ]);

  return (
   <Container maxWidth="lg">
      <AppBar className={classes.appBar} position='static' color='inherit'>
       <Typography className={classes.heading} variant='h2' align='center'>
          Stay Healthy
       </Typography>
       <img className={ classes.image } src={drugImage} alt='drug intake' height='60' />
      </AppBar>
      <Grow in>
        <Container>
          <Grid container justifyContent='space-between' alignItems='stretch' spacing={3}>
              <Grid item xs={12} sm={7}>
                  <Drugs setCurrentId={setCurrentId} />
              </Grid>
              <Grid item xs={12} sm={4}>
                  <Form currentId={currentId} setCurrentId={setCurrentId} />
                </Grid>
          </Grid>
        </Container>
      </Grow>
      <Container>
          <Grid container justifyContent='space-between' alignItems='stretch' spacing={3}>
              <Grid item xs={12} sm={7}>
              </Grid>
             
          </Grid>
      </Container>
   </Container>
  );
};

export default App;