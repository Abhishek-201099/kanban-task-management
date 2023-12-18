import { createSlice } from "@reduxjs/toolkit";

const initialBoardState = {
  boardsData: [
    {
      boardName: "Sample Board 1",
      boardColumns: [
        {
          columnName: "Todo",
          columnTasks: [
            {
              taskName: "Sample Task 1",
              taskDescription: "Sample description",
              subTasks: ["Sample subtask 1", "Sample subtask 2"],
            },
            {
              taskName: "Sample Task 2",
              taskDescription: "Sample description",
              subTasks: ["Sample subtask 1", "Sample subtask 2"],
            },
            {
              taskName: "Sample Task 3",
              taskDescription: "Sample description",
              subTasks: ["Sample subtask 1", "Sample subtask 2"],
            },
          ],
        },
        {
          columnName: "Doing",
          columnTasks: [
            {
              taskName: "Sample Task 1",
              taskDescription: "Sample description",
              subTasks: ["Sample subtask 1", "Sample subtask 2"],
            },
            {
              taskName: "Sample Task 2",
              taskDescription: "Sample description",
              subTasks: ["Sample subtask 1", "Sample subtask 2"],
            },
            {
              taskName: "Sample Task 3",
              taskDescription: "Sample description",
              subTasks: ["Sample subtask 1", "Sample subtask 2"],
            },
          ],
        },
        {
          columnName: "Done",
          columnTasks: [
            {
              taskName: "Sample Task 1",
              taskDescription: "Sample description",
              subTasks: ["Sample subtask 1", "Sample subtask 2"],
            },
            {
              taskName: "Sample Task 2",
              taskDescription: "Sample description",
              subTasks: ["Sample subtask 1", "Sample subtask 2"],
            },
            {
              taskName: "Sample Task 3",
              taskDescription: "Sample description",
              subTasks: ["Sample subtask 1", "Sample subtask 2"],
            },
          ],
        },
      ],
    },
  ],
};

const boardSlice = createSlice({
  name: "boards",
  initialState: initialBoardState,
  reducers: {
    addBoard(state, action) {
      state.boardsData = [
        ...state.boardsData,
        {
          boardName: action.payload.boardName,
          boardColumns: action.payload.boardColumns,
        },
      ];
    },
    addBoardColumn(state, action) {
      state.boardsData.forEach((board) => {
        if (board.boardName === action.payload.currentBoard) {
          board.boardColumns = [
            ...board.boardColumns,
            { columnName: action.payload.newBoardColumn },
          ];
        }
      });
    },
    updateBoardName(state, action) {
      const boardToUpdate = state.boardsData.find(
        (board) => board.boardName === action.payload.prevBoardName
      );
      if (boardToUpdate) boardToUpdate.boardName = action.payload.newBoardName;
    },
    updateBoardColumnName(state, action) {
      const boardToUpdate = state.boardsData.find(
        (board) => board.boardName === action.payload.currentBoard
      );

      if (boardToUpdate) {
        let colToUpdate = boardToUpdate.boardColumns.find(
          (col) => col.columnName === action.payload.prevColName
        );
        if (colToUpdate) colToUpdate.columnName = action.payload.newColName;
      }
    },
  },
});

export const { addBoard } = boardSlice.actions;

export default boardSlice.reducer;
