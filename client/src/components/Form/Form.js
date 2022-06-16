import React, { useState, useEffect, Component } from "react";
//import { useNavigate, useParams } from "react-router-dom";
//import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

// Notes: useSelector is used to access the state from redux store
import { TextField, Button, Typography, Paper } from '@material-ui/core';

import { createDrug, updateDrug, currentId } from '../../redux/feature/drugSlice';
import Popup from '../../components/controls/Popup'


import useStyles from './styles';
import axios from "axios";

const initialState = { name: '', rxnormId: '', description: '', direction: '', strength: '' }
const initialDrugInteractionState = {disclaimer: '', interactionResults: ''};


const Form = ({ currentId, setCurrentId }) => {
   const [formData, setFormData] = useState( initialState );

   // getting the state variable drug for edit
   const drugState = useSelector((state) => (state.drugs)); // access the store named drugs
   const {drugs} = drugState; // destructuring
   const drug = useSelector((state) => (currentId ? drugs.find((drug) => drug._id === currentId) : null));

   const dispatch = useDispatch(); // initialising todos
   const classes = useStyles();

   // autocomplete 
   const [drugNames, setDrugNames] = useState([]);
   const [suggestions, setSuggestions] = useState([]);
   const [text, setText] = useState('');
   const [rxId, setRxId] = useState('');
   const [checkInteraction, setcheckInteraction] = useState(false);
   const [drugInteractionDetails, setDrugInteractionDetails] = useState([initialDrugInteractionState]);
   const [openPopup, setOpenPopup] = useState(false);

   useEffect(() => {
      if (drug) setFormData(drug);
    }, [drug]);

   const clear = () => {
     setCurrentId(0);
     setFormData({  name: '', rxnormId: '', description: '', direction: '', strength: '' });
   }; 


   useEffect(() => {
      const autoLoadDrugNames = async() => {
         const uri = 'https://clinicaltables.nlm.nih.gov/fhir/R4/ValueSet/$expand?url=https://clinicaltables.nlm.nih.gov/fhir/R4/ValueSet/rxterms';
         const response = await axios.get(uri, {
            params: {
               filter: text,
               _format: "application/json",
               count:7
            }
         })
         setDrugNames(response.data.expansion.contains)
      }
      autoLoadDrugNames();
   }, [text])

   const onChangeHandler = (text) => {
      let matches = [];
      if (text.length > 1) {
        // matches = drugNames.map(dr => {return dr.display.split(" ")[0]})   
         matches = drugNames.map(dr => {return dr.display})   
      }
      setText(text);
      setSuggestions(matches)
      setFormData({ ...formData, name: text })
   };

   const onSuggestHandler = (text) => {
      setText(text);
      setFormData({ ...formData, name: text})
      setSuggestions([]);
   }


   useEffect(() => {
      const getRxnormId = async() => {
         const uri = 'https://rxnav.nlm.nih.gov/REST/rxcui.json';
         if (formData.name) {
            const response = await axios.get(uri, {
               params: {
                  name: formData.name.split(" ")[0], //+'+200+mg+Tab',
                  search:1
               }
            });
            if (response.data.idGroup.rxnormId) {
               setRxId(response.data.idGroup.rxnormId[0]);
            }
         }
      }
      getRxnormId();
   }, [text])


  // rizatriptan "rizatriptan (88014) is resolved to rizatriptan (88014)"
   const callDIAPi = async () => {
      let drugIds = drugs.map(drug => {return drug.rxnormId})
      drugIds = drugIds.join('+');
  
      //const uri =   'https://rxnav.nlm.nih.gov/REST/interaction/interaction.json?rxcui=88014';
      const uri =   'https://rxnav.nlm.nih.gov/REST/interaction/list.json?rxcuis='+ drugIds +'&source=ONCHigh';  
      const response = await axios.get(uri);
      if (response.data) {
         console.log(response.data.fullInteractionTypeGroup === undefined);
         setDrugInteractionDetails(
           {'disclaimer': response.data.nlmDisclaimer,
            'interactionResults': (response.data.fullInteractionTypeGroup !== undefined) ?response.data.fullInteractionTypeGroup[0].fullInteractionType : ''           });
      } else {
         console.log( ' something went wrong in drug interaction API call')
      }
      setOpenPopup(true)
   }

   const handleSubmit = async (e) => {
      e.preventDefault();
      const id = currentId;
      formData.rxnormId = rxId;
      formData.name = formData.name.toUpperCase();
      if (!currentId) {
         dispatch(createDrug(formData)); // this is how we pass data from form. dispatch will dispatch the formdata on component load and then it will hit api in slice which will then call
         clear();
      } else {
         console.log(' update ', formData)
         dispatch(updateDrug({id, formData}));
         clear();
      }
   };

   return (
      <>
         <Paper className={classes.paper}>
            <form autoComplete="off" noValidate className={`${classes.root} ${classes.form} ${classes.suggestion}`} onSubmit={handleSubmit}>
               <Typography variant="h6">{currentId ? `Editing "${drug.name}"` : 'Creating a Drug'}</Typography>
               <TextField name="name" variant="outlined" label="Drug Name" fullWidth value={formData.name} onChange={(e) => onChangeHandler(e.target.value)/*setFormData({ ...formData, name: e.target.value })*/} />
               {suggestions && suggestions.map((suggestion, i) => <div key={i} onClick={()=>onSuggestHandler(suggestion)}> {suggestion} </div>)}
               <TextField name="strength" variant="outlined" label="Strength" fullWidth value={formData.strength} onChange={(e) => setFormData({ ...formData, strength: e.target.value })} />
               <TextField name="direction" variant="outlined" label="Direction" fullWidth value={formData.direction} onChange={(e) => setFormData({ ...formData, direction: e.target.value })} />
               <TextField name="description" variant="outlined" label="Description" fullWidth multiline minRows={4} value={formData.description} onChange={(e) => setFormData({ ...formData, description: e.target.value })} />
               <Button className={classes.buttonSubmit} variant="contained" color="primary" size="large" type="submit" fullWidth>Submit</Button>
               <Button variant="contained" color="secondary" size="small" onClick={clear} fullWidth>Clear</Button>
            </form>
         </Paper>
         <Paper className={classes.paper} style={{marginTop: 20}}>
            <Button variant="contained" color="primary" size="small" onClick={callDIAPi} fullWidth>Drug Interaction Checker</Button>
         </Paper>
         <Popup
            openPopup = {openPopup}
            setOpenPopup = {setOpenPopup}
         >
            {drugInteractionDetails}
         </Popup>
      </>
   );
 };

export default Form;
