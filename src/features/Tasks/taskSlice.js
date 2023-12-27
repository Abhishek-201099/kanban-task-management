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
        console.log("tasktoupdate does exist");
        taskToUpdate.taskName = updatedTask.taskName;
        taskToUpdate.taskForBoard = updatedTask.taskForBoard;
        taskToUpdate.taskDescription = updatedTask.taskDescription;
        taskToUpdate.taskForCol = updatedTask.taskForCol;
        taskToUpdate.subtasks = updatedTask.subtasks;
      }
    },
    updateTaskForCol(state, action) {
      const { currentBoard, selectedTask, newTaskForCol } = action.payload;
      const taskToUpdate = state.tasksData.find((task) => {
        return (
          task.taskForCol === selectedTask.taskForCol &&
          task.taskForBoard === currentBoard
        );
      });

      taskToUpdate.taskForCol = newTaskForCol;
    },
    updateSubtaskStatus(state, action) {
      const { currentBoard, selectedTask, checkedSubtasks } = action.payload;
      const taskToUpdate = state.tasksData.find(
        (task) =>
          task.taskName === selectedTask.taskName &&
          task.taskForBoard === currentBoard
      );
      taskToUpdate.subtasks.forEach((subtask) => {
        if (checkedSubtasks.includes(subtask.subtask))
          subtask.subtaskStatus = "checked";
        else subtask.subtaskStatus = "unchecked";
      });
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

export const {
  addTask,
  editTask,
  updateTaskForCol,
  updateSubtaskStatus,
  deleteTask,
} = taskSlice.actions;

export default taskSlice.reducer;

export function getTasksData(state) {
  return state.tasks.tasksData;
}
