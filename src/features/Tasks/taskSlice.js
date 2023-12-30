import { createSlice, current } from "@reduxjs/toolkit";

const initialTaskState = {
  tasksData: {
    "Sample Board": {
      Todo: [
        {
          taskName: "Sample Todo task",
          taskForBoard: "Sample Board",
          taskForCol: "Todo",
          taskDescription: "lorem ipsum woho",
          subtasks: [
            { subtask: "Design the task board", subtaskStatus: "unchecked" },
            { subtask: "Clear the board once done", subtaskStatus: "checked" },
          ],
        },
      ],
      Doing: [
        {
          taskName: "Sample Doing task 1",
          taskForBoard: "Sample Board",
          taskForCol: "Doing",
          taskDescription: "lorem ipsum woho",
          subtasks: [
            { subtask: "Sample subtask 1", subtaskStatus: "unchecked" },
            { subtask: "Sample subtask 2", subtaskStatus: "unchecked" },
          ],
        },
        {
          taskName: "Sample Doing task 2",
          taskForBoard: "Sample Board",
          taskForCol: "Doing",
          taskDescription: "lorem ipsum woho",
          subtasks: [
            { subtask: "Sample subtask 1", subtaskStatus: "checked" },
            { subtask: "Sample subtask 2", subtaskStatus: "checked" },
          ],
        },
      ],
      Done: [],
    },
  },
};

const taskSlice = createSlice({
  name: "tasks",
  initialState: initialTaskState,
  reducers: {
    addTask(state, action) {
      const taskToAdd = action.payload.task;
      const { taskForBoard, taskForCol } = taskToAdd;
      Object.keys(state.tasksData).forEach((board) => {
        if (board === taskForBoard) {
          Object.keys(state.tasksData[board]).forEach((boardColumn) => {
            if (boardColumn === taskForCol) {
              state.tasksData[board][boardColumn].push(taskToAdd);
            }
          });
        }
      });
    },
    editTask(state, action) {
      const { prevTask, updatedTask } = action.payload;

      Object.keys(state.tasksData).forEach((board) => {
        if (board === prevTask.taskForBoard) {
          Object.keys(state.tasksData[board]).forEach((boardColumn) => {
            if (boardColumn === prevTask.taskForCol) {
              const findResult = state.tasksData[board][boardColumn].find(
                (task) => task.taskName === prevTask.taskName
              );
              if (findResult) {
                findResult.taskName = updatedTask.taskName;
                findResult.taskDescription = updatedTask.taskDescription;
                findResult.taskForBoard = updatedTask.taskForBoard;
                findResult.taskForCol = updatedTask.taskForCol;
                findResult.subtasks = updatedTask.subtasks;
              }
            }
          });
        }
      });
    },
    updateTaskForCol(state, action) {
      const { taskToUpdate, newColumn, droppedIndex } = action.payload;

      let mainTask;

      Object.keys(state.tasksData).forEach((board) => {
        if (board === taskToUpdate.taskForBoard) {
          Object.keys(state.tasksData[board]).forEach((boardColumn) => {
            if (boardColumn === taskToUpdate.taskForCol) {
              const result = state.tasksData[board][boardColumn].find(
                (task) => task.taskName === taskToUpdate.taskName
              );
              if (result) {
                mainTask = result;
              }
            }
          });
        }
      });

      Object.keys(state.tasksData).forEach((board) => {
        if (board === mainTask.taskForBoard) {
          Object.keys(state.tasksData[board]).forEach((boardColumn) => {
            if (boardColumn === mainTask.taskForCol) {
              state.tasksData[board][boardColumn] = state.tasksData[board][
                boardColumn
              ].filter((task) => task.taskName !== mainTask.taskName);
            }

            if (boardColumn === newColumn) {
              droppedIndex === undefined
                ? state.tasksData[board][boardColumn].push({
                    ...mainTask,
                    taskForCol: newColumn,
                  })
                : state.tasksData[board][boardColumn].splice(droppedIndex, 0, {
                    ...mainTask,
                    taskForCol: newColumn,
                  });
            }
          });
        }
      });
    },
    updateSubtaskStatus(state, action) {
      const { taskToUpdate, checkedSubtasks } = action.payload;

      Object.keys(state.tasksData).forEach((board) => {
        if (board === taskToUpdate.taskForBoard) {
          Object.keys(state.tasksData[board]).forEach((boardColumn) => {
            if (boardColumn === taskToUpdate.taskForCol) {
              state.tasksData[board][boardColumn].forEach((task) => {
                if (task.taskName === taskToUpdate.taskName) {
                  task.subtasks.forEach((subtask) => {
                    if (checkedSubtasks.includes(subtask.subtask)) {
                      subtask.subtaskStatus = "checked";
                    } else {
                      subtask.subtaskStatus = "unchecked";
                    }
                  });
                }
              });
            }
          });
        }
      });
    },
    updateBoard(state, action) {
      const { prevBoardName, newBoardName } = action.payload;
      Object.keys(state.tasksData).forEach((board) => {
        if (board === prevBoardName) {
          state.tasksData[newBoardName] = state.tasksData[board];
          delete state.tasksData[board];
          Object.keys(state.tasksData[newBoardName]).forEach((boardColumn) => {
            state.tasksData[newBoardName][boardColumn].forEach((task) => {
              task.taskForBoard = newBoardName;
            });
          });
        }
      });
    },
    deleteTask(state, action) {
      const { taskToRemove } = action.payload;
      const { taskName, taskForBoard, taskForCol } = taskToRemove;
      Object.keys(state.tasksData).forEach((board) => {
        if (board === taskForBoard) {
          Object.keys(state.tasksData[board]).forEach((boardColumn) => {
            if (boardColumn === taskForCol) {
              state.tasksData[board][boardColumn] = state.tasksData[board][
                boardColumn
              ].filter((task) => task.taskName !== taskName);
            }
          });
        }
      });
    },
    addNewBoardData(state, action) {
      const { boardName, boardColumns } = action.payload;
      const result = boardColumns.reduce((acc, boardColumn) => {
        return { ...acc, [boardColumn.columnName]: [] };
      }, {});
      state.tasksData[boardName] = result;
    },
    addNewBoardTaskColumn(state, action) {
      const { currentBoard, newBoardColumn } = action.payload;
      state.tasksData[currentBoard][newBoardColumn] = [];
    },
    deleteBoardData(state, action) {
      const { currentBoard } = action.payload;
      const taskDataCopy = Object.assign({}, current(state.tasksData));
      delete taskDataCopy[currentBoard];
      state.tasksData = taskDataCopy;
    },
    deleteBoardTaskColumn(state, action) {
      const { currentBoard, colToDelete } = action.payload;

      const currentBoardData = Object.assign(
        {},
        current(state.tasksData[currentBoard])
      );
      delete currentBoardData[colToDelete];
      state.tasksData[currentBoard] = currentBoardData;
    },
  },
});

export const {
  addTask,
  editTask,
  updateTaskForCol,
  updateSubtaskStatus,
  deleteTask,
  addNewBoardData,
  deleteBoardData,
  deleteBoardTaskColumn,
  addNewBoardTaskColumn,
  updateBoard,
} = taskSlice.actions;

export default taskSlice.reducer;

export function getTasksData(state) {
  return state.tasks.tasksData;
}
