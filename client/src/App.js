import React, { useState, useEffect } from 'react';
import { Container, AppBar, Typography, Grow, Grid } from '@material-ui/core';
import { useDispatch } from 'react-redux'; 

//import { getDrugs } from './actions/drugs';
import Drugs from './components/Drugs/Drugs';
import Form from './components/Form/Form';

import drugImage from './images/drugImage.png';

//import Form from './components/Form';


//console.log ( ' in app.js ---', getDrugs);
import useStyles from './styles';

const App = () => {
  const [currentId, setCurrentId] = useState(0);
  const classes = useStyles();
  //const dispatch = useDispatch();

  return (
   <Container maxWidth="lg">
      <AppBar className={classes.appBar} position='static' color='inherit'>
       <Typography className={classes.heading} variant='h2' align='center'>
          Drugs
       </Typography>
       <img className={ classes.image } src={drugImage} alt='drug intake' height='60' />
      </AppBar>
      <Grow in>
        <Container>
          <Grid container justify='space-between' alignItems='stretch' spacing={3}>
              <Grid item xs={12} sm={7}>
                  <Drugs />
              </Grid>
              <Grid item xs={12} sm={4}>
                  <Form />
                </Grid>
          </Grid>
        </Container>
      </Grow>
   </Container>
  );
};

export default App;
