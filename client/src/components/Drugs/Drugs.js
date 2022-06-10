import React, { useState, useEffect } from "react";
import { Grid, CircularProgress } from '@material-ui/core';
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import Drug from "./Drug/Drug";
import useStyles from './styles';

const Drugs = ({ setCurrentId }) => {
   const {drugs} = useSelector((state) => ({...state.drugs}));
   //const [currentId, setCurrentId] = useState(0);
   //const dispatch = useDispatch();
  
   const classes = useStyles();

  //  useEffect(() => {
  //     dispatch(getDrugs());
  //   }, [dispatch ]);
    
   return (
      !drugs.length ? <CircularProgress /> : (
        <Grid className={classes.container} container alignItems="stretch" spacing={3}>
          {drugs.map((drug) => (
            <Grid key={drug._id} item xs={12} sm={6} md={6}>
              <Drug drug={drug} setCurrentId={setCurrentId} />
            </Grid>
          ))}
        </Grid>
      )
    );
}

export default Drugs;