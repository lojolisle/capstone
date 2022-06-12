import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

import * as api from "../api";

// THIS IS OUR ACTION
//creating an action (this is in action folder previously)
// here "drugs/" should be name of slice

export const createDrug = createAsyncThunk(
   "drugs/createDrug", 
   async(formData, {rejectWithValue}) => {
   try {
      console.log(' save ', formData)
      const response = await  api.createDrug(formData);
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
      return response.data;
   } catch(error) {
      console.log(error)
      return rejectWithValue(error.response.data);
   }
});

export const getDrug = createAsyncThunk(
   "drugs/getDrug",
   async (id, { rejectWithValue }) => {
     try {
       const response = await api.getDrug(id);
       return response.data;
     } catch (err) {
       return rejectWithValue(err.response.data);
     }
   }
 );

 export const updateDrug = createAsyncThunk(
   "drugs/updateDrug",
   async ({id, formData}, { rejectWithValue }) => {
     try {
       const response = await api.updateDrug(id, formData);
       return response.data;
     } catch (err) {
        console.log(err)
       return rejectWithValue(err.response.data);
     }
   }
 );

export const deleteDrug = createAsyncThunk(
   "drugs/deleteDrug", 
   async(id, {rejectWithValue}) => {
   try {
      const response = await  api.deleteDrug(id);
      return response.data;
   } catch(error) {
      console.log(error)
      return rejectWithValue(error.response.data);
   }
});

const drugSlice = createSlice({
   name: "drugs",
   initialState: {
      drug: {},
      drugs: [],
      currentId: 0,
      error: "",
      loading: false,
   },

   extraReducers: {
      [createDrug.pending]: (state, action) => {
            state.loading = true
      },
      [createDrug.fulfilled]: (state, action) => {
         state.loading = false
         //localStorage.setItem("create", JSON.stringify({...action.payload}));
         console.log(' in create drug state ---', action)
         //state.drugs = [...state.drugs, action.payload]
         state.drugs.push(action.payload);
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
         //localStorage.setItem("get", JSON.stringify({...action.payload}));
         state.drugs = action.payload;
         
      },
      [getDrugs.rejected]: (state, action) => {
         state.loading = false
         state.error = action.payload.message;
      },
      [getDrug.pending]: (state, action) => {
         state.loading = true;
      },
      [getDrug.fulfilled]: (state, action) => {
         
      state.loading = false;
      state.drug = action.payload;
      state.currentId = action.payload._id;
      },
      [getDrug.rejected]: (state, action) => {
      state.loading = false;
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
      },
      [updateDrug.pending]: (state, action) => {
         state.loading = true
      },
      [updateDrug.fulfilled]: (state, action) => {
         state.loading = false
         //localStorage.setItem("create", JSON.stringify({...action.payload}));
         //state.drugs = [...state.drugs, action.payload]
         const updatedDrugs = state.drugs.map((drug) => drug._id === action.payload._id ? action.payload : drug);
         state.drugs = updatedDrugs;
      },
      [updateDrug.rejected]: (state, action) => {
         state.loading = false
         state.error = action.payload.message;
      },
   }
});

 
export default drugSlice.reducer;