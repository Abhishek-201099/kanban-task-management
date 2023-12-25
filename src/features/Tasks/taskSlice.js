import { createSlice } from "@reduxjs/toolkit";

const initialTaskState = {
  tasksData: [
    {
      taskName: "Sample Task",
      taskForBoard: "Sample Board",
      taskForCol: "Todo",
      taskDescription: "lorem ipsum woho",
      subtasks: [
        { subtask: "Design the task board", subtaskStatus: "unchecked" },
        { subtask: "Clear the board once done", subtaskStatus: "checked" },
      ],
    },
  ],
};

const taskSlice = createSlice({
  name: "tasks",
  initialState: initialTaskState,
  reducers: {
    addTask(state, action) {
      state.tasksData = [...state.tasksData, action.payload.task];
    },
    editTask(state, action) {
      const { updatedTask } = action.payload;
      const taskToUpdate = state.tasksData.find(
        (task) =>
          task.taskName === updatedTask.prevTaskName &&
          task.taskForBoard === updatedTask.taskForBoard
      );

      if (taskToUpdate) {
        taskToUpdate.taskName = updatedTask.taskName;
        taskToUpdate.taskForBoard = updatedTask.taskForBoard;
        taskToUpdate.taskDescription = updatedTask.taskDescription;
        taskToUpdate.taskForCol = updatedTask.taskForCol;
        taskToUpdate.subtasks = updatedTask.subtasks;
      }
    },
    deleteTask(state, action) {
      const { taskToRemove } = action.payload;
      const taskToDelete = state.tasksData.find(
        (task) =>
          task.taskName === taskToRemove.taskName &&
          task.taskForBoard === taskToRemove.taskForBoard
      );

      if (taskToDelete) {
        state.tasksData = state.tasksData.filter(
          (task) =>
            task.taskName !== taskToDelete.taskName &&
            task.taskForBoard === taskToDelete.taskForBoard
        );
      }
    },
  },
});

export const { addTask } = taskSlice.actions;

export default taskSlice.reducer;

export function getTasksData(state) {
  return state.tasks.tasksData;
}
