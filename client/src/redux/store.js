import { configureStore } from "@reduxjs/toolkit";

import DrugReducer from "./feature/drugSlice";

export default configureStore({
   reducer: {
      drugs: DrugReducer,
   },
})
