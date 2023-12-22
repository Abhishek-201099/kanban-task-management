import { configureStore } from "@reduxjs/toolkit";

import boardReducer from "./features/Boards/boardSlice";
import taskReducer from "./features/Tasks/taskSlice";

const store = configureStore({
  reducer: {
    boards: boardReducer,
    tasks: taskReducer,
  },
});

export default store;
