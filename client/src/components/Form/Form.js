import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
//import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

// Notes: useSelector is used to access the state from redux store


import { createDrug, updateDrug, currentId } from '../../redux/feature/drugSlice';

import { TextField, Button, Typography, Paper } from '@material-ui/core';
import useStyles from './styles';
import axios from "axios";

const initialState = { name: '', description: '', direction: '', strength: '' }
 
const Form = ({ currentId, setCurrentId }) => {
   const [formData, setFormData] = useState( initialState );

   // getting the state variable drug for edit
   const drugState = useSelector((state) => (state.drugs)); // access the store named drugs
   const {drugs} = drugState; // destructuring
   const drug = useSelector((state) => (currentId ? drugs.find((drug) => drug._id === currentId) : null));

   // autocomplete 
   const [drugNames, setDrugNames] = useState([]);
   const [suggestions, setSuggestions] = useState([]);
   const [text, setText] = useState('');

   useEffect(() => {
      const loadDrugNames = async() => {
         const uri = 'https://clinicaltables.nlm.nih.gov/fhir/R4/ValueSet/$expand?url=https://clinicaltables.nlm.nih.gov/fhir/R4/ValueSet/rxterms';
         const response = await axios.get(uri, {
            params: {
               filter: text,
              // _format: "application-json",
               count:6
            }
         })
         setDrugNames(response.data.expansion.contains)
      }
      loadDrugNames();
   }, [text])

   const onChangeHandler = (text) => {
      let matches = [];
      if (text.length > 1) {
         matches = drugNames.map(dr => {return dr.display.split(" ")[0]})   
      }
      setText(text);
      setSuggestions(matches)
      setFormData({ ...formData, name: text })
   };

   const onSuggestHandler = (text) => {
      setText(text);
      setFormData({ ...formData, name: text })
      setSuggestions([]);
   }

   const dispatch = useDispatch(); // initialising todos
   const classes = useStyles();

   useEffect(() => {
      if (drug) setFormData(drug);
    }, [drug]);

   const clear = () => {
     setCurrentId(0);
     setFormData({  name: '', description: '', direction: '', strength: '' });
   };

   const handleSubmit = async (e) => {
      e.preventDefault();
      const id = currentId;
      if (!currentId) {
         dispatch(createDrug(formData)); // this is how we pass data from form. dispatch will dispatch the formdata on component load and then it will hit api in slice which will then call
         clear();
      } else {
         dispatch(updateDrug({id, formData}));
         clear();
      }
   };
   return (
      <Paper className={classes.paper}>
         <form autoComplete="off" noValidate className={`${classes.root} ${classes.form} ${classes.suggestion}`} onSubmit={handleSubmit}>
            <Typography variant="h6">{currentId ? `Editing "${drug.name}"` : 'Creating a Drug'}</Typography>
            <TextField name="name" variant="outlined" label="Drug Name" fullWidth value={formData.name} onChange={(e) => onChangeHandler(e.target.value)/*setFormData({ ...formData, name: e.target.value })*/} />
            {suggestions && suggestions.map((suggestion, i) => <div key={i} onClick={()=>onSuggestHandler(suggestion)}>{suggestion} </div>)}
            <TextField name="strength" variant="outlined" label="Strength" fullWidth value={formData.strength} onChange={(e) => setFormData({ ...formData, strength: e.target.value })} />
            <TextField name="direction" variant="outlined" label="Direction" fullWidth value={formData.direction} onChange={(e) => setFormData({ ...formData, direction: e.target.value })} />
            <TextField name="description" variant="outlined" label="Description" fullWidth multiline minRows={4} value={formData.description} onChange={(e) => setFormData({ ...formData, description: e.target.value })} />
            <Button className={classes.buttonSubmit} variant="contained" color="primary" size="large" type="submit" fullWidth>Submit</Button>
            <Button variant="contained" color="secondary" size="small" onClick={clear} fullWidth>Clear</Button>
         </form>
      </Paper>
   );
 };

export default Form;

//https://rxnav.nlm.nih.gov/REST/rxcui.json?name=Advil&search=1
//https://lhncbc.nlm.nih.gov/RxNav/APIs/api-RxNorm.findRxcuiByString.html
////https://rxnav.nlm.nih.gov/REST/interaction/interaction.json?rxcui=88014&sources=ONCHigh
//https://lhncbc.nlm.nih.gov/RxNav/APIs/api-Interaction.findDrugInteractions.html