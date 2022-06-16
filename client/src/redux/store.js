import { configureStore } from "@reduxjs/toolkit";

import DrugReducer from "./feature/drugSlice";
import AuthReducer from "./feature/authSlice";

export default configureStore({
   reducer: {
      drugs: DrugReducer,
      auth: AuthReducer,
   },
})
