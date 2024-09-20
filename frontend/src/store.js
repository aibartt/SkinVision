import { configureStore } from "@reduxjs/toolkit";

import loggedUserReducer from "./reducers/loggedUserReducer";
import notificationReducer from "./reducers/notificationReducer";

const store = configureStore({
  reducer: {
    loggedUser: loggedUserReducer,
    notification: notificationReducer,
  },
});

export default store;
