// import * as api from '../redux/api';

// // action creator - functions

// export const getDrugs = () => async (dispatch) => {

//    try {
//       const { data } = await api.getDrugs();
//       console.log(' this one is working !! [src/acions/drugs.js')
//       console.log( data )
//       dispatch({ type: 'FETCH_ALL', payload: data })
//    }  catch(error) {
//          console.log(' AN error occurred while fetching drugs from API')
//    }

// }

// export const createDrug = (drug) => async (dispatch) => {
//    try {
//       console.log (' do I come here for update ====')
//      const { data } = await api.createDrug(drug);
 
//      dispatch({ type: 'CREATE', payload: data });
//    } catch (error) {
//      console.log(error.message);
//    }
//  };

// // export const updateDrug = (id, drug) => async (dispatch) => {
// //    try {
// //      const { data } = await api.updateDrug(id, drug);
 
// //      dispatch({ type: UPDATE, payload: data });
// //    } catch (error) {
// //      console.log(error.message);
// //    }
// //  };

// //  export const deleteDrug = (id) => async (dispatch) => {
// //    try {
// //      await api.deleteDrug(id);
 
// //      dispatch({ type: DELETE, payload: id });
// //    } catch (error) {
// //      console.log(error.message);
// //    }
// //  };