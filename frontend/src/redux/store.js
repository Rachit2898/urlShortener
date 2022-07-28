import { configureStore } from "@reduxjs/toolkit";
import UrlSlice from "./features/urlSlice";

export default configureStore({
  reducer: {
    app: UrlSlice,
  },
});
