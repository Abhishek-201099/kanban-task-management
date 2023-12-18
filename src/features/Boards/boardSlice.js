import { createSlice } from "@reduxjs/toolkit";

const initialBoardState = {
  boardsData: [
    {
      boardName: "Sample Board 1",
      boardColumns: [
        {
          columnName: "Todo",
        },
        {
          columnName: "Doing",
        },
        {
          columnName: "Done",
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
    deleteBoardColumn(state, action) {
      const boardToUpdate = state.boardsData.find(
        (board) => board.boardName === action.payload.currentBoard
      );
      if (boardToUpdate) {
        boardToUpdate.boardColumns = boardToUpdate.boardColumns.filter(
          (col) => col.columnName !== action.payload.colToDelete
        );
      }
    },
    deleteBoard(state, action) {
      state.boardsData = state.boardsData.filter(
        (board) => board.boardName !== action.payload.currentBoard
      );
    },
  },
});

export const {
  addBoard,
  addBoardColumn,
  updateBoardName,
  updateBoardColumnName,
  deleteBoardColumn,
  deleteBoard,
} = boardSlice.actions;

export default boardSlice.reducer;

export function getBoards(state) {
  return state.boards.boardsData;
}
