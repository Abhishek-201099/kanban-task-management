import { configureStore } from "@reduxjs/toolkit";

import boardReducer from "./features/Boards/boardSlice";
import taskReducer from "./features/Tasks/taskSlice";
import darkModeReducer from "./features/DarkMode/darkModeSlice";

const store = configureStore({
  reducer: {
    boards: boardReducer,
    tasks: taskReducer,
    darkMode: darkModeReducer,
  },
});

export default store;
