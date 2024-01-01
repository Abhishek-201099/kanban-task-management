import { createSlice } from "@reduxjs/toolkit";
import toast from "react-hot-toast";

const initialBoardState = {
  boardsData: [
    {
      boardName: "Sample Board",
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
  currentBoard: "Sample Board",
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

      if (!state.currentBoard) state.currentBoard = action.payload.boardName;
      toast.success(
        `Successfully added new board "${action.payload.boardName}"`
      );
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
      toast.success(
        `Successfully added new board column "${action.payload.newBoardColumn}"`
      );
    },
    updateBoardName(state, action) {
      const boardToUpdate = state.boardsData.find(
        (board) => board.boardName === action.payload.prevBoardName
      );
      if (boardToUpdate) {
        boardToUpdate.boardName = action.payload.newBoardName;
        state.currentBoard = action.payload.newBoardName;
      }
      toast.success(
        `Successfully updated board name "${action.payload.newBoardName}"`
      );
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

      toast.success(
        `Successfully updated board column name "${action.payload.newColName}"`
      );
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
      toast.success(
        `Successfully deleted board column "${action.payload.colToDelete}"`
      );
    },
    deleteBoard(state, action) {
      state.boardsData = state.boardsData.filter(
        (board) => board.boardName !== action.payload.currentBoard
      );
      state.currentBoard = state.boardsData.at(0)?.boardName || "";
      toast.success(
        `Successfully deleted board "${action.payload.currentBoard}"`
      );
    },
    setCurrentOpenBoard(state, action) {
      state.currentBoard = action.payload.currentBoard;
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
  setCurrentOpenBoard,
} = boardSlice.actions;

export default boardSlice.reducer;

export function getBoards(state) {
  return state.boards.boardsData;
}

export function getCurrentOpenBoardData(state) {
  const board = state.boards.boardsData.find(
    (boards) => boards.boardName === state.boards.currentBoard
  );
  return board;
}

export function getCurrentOpenBoard(state) {
  return state.boards.currentBoard;
}
