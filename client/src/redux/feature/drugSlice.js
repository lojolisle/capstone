import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

import * as api from "../api";

// THIS IS OUR ACTION
//creating an action (this is in action folder previously)

export const createDrug = createAsyncThunk(
   "drugs/createDrug", 
   async(formData, {rejectWithValue}) => {
   try {
      const response = await  api.createDrug(formData);
      //console.log('Suceess- in create drug actions-----');
      return response.data;
   } catch(error) {
      console.log(error)
      return rejectWithValue(error.response.data);
   }
});

export const getDrugs = createAsyncThunk(
   "drugs/getDrugs", 
   async(_, {rejectWithValue}) => {
   try {
      const response = await  api.getDrugs();
      //console.log('Suceess in getDrugs action------', response.data);
      return response.data;
   } catch(error) {
      console.log(error)
      return rejectWithValue(error.response.data);
   }
});

export const deleteDrug = createAsyncThunk(
   "drugs/deleteDrug", 
   async(id, {rejectWithValue}) => {
   try {
      const response = await  api.deleteDrug(id);
      //console.log('Suceess in deleteDrug action------', response.data);
      return response.data;
   } catch(error) {
      console.log(error)
      return rejectWithValue(error.response.data);
   }
});

const drugSlice = createSlice({
  // name: auth
   name: "drugs",
   initialState: {
      drug: {},
      drugs: [],
      error: "",
      loading: false,
   },

   extraReducers: {
      [createDrug.pending]: (state, action) => {
            state.loading = true
      },
      [createDrug.fulfilled]: (state, action) => {
         state.loading = false
         localStorage.setItem("create", JSON.stringify({...action.payload}));
         state.drug = action.payload
      },
      [createDrug.rejected]: (state, action) => {
         state.loading = false
         state.error = action.payload.message;
      },
      [getDrugs.pending]: (state, action) => {
         state.loading = true
      },
      [getDrugs.fulfilled]: (state, action) => {
         state.loading = false
         localStorage.setItem("get", JSON.stringify({...action.payload}));
         state.drugs = action.payload;
         
      },
      [getDrugs.rejected]: (state, action) => {
         state.loading = false
         state.error = action.payload.message;
      },
      [deleteDrug.pending]: (state, action) => {
         state.loading = true
      },
      [deleteDrug.fulfilled]: (state, action) => {
         state.loading = false
         console.log('action in dele', action)
         const {arg} = action.meta;
         if ( arg ) {
            state.drugs = state.drugs.filter((item) => item._id !== arg)
         }  
      },
      [deleteDrug.rejected]: (state, action) => {
         state.loading = false
         state.error = action.payload.message;
      } 
   

   }
});

export default drugSlice.reducer;