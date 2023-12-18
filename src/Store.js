import { configureStore } from "@reduxjs/toolkit";

import boardReducer from "./features/Boards/boardSlice";

const store = configureStore({
  reducer: {
    boards: boardReducer,
  },
});

export default store;
