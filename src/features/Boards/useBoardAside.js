import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";

import {
  getBoards,
  getCurrentOpenBoard,
  setCurrentOpenBoard,
} from "./boardSlice";

export default function useBoardAside() {
  const dispatch = useDispatch();
  const boardsArray = useSelector(getBoards);
  const currentOpenBoard = useSelector(getCurrentOpenBoard);
  const [currentBoard, setCurrentBoard] = useState(boardsArray[0].boardName);
  const [isOpenModal, setIsOpenModal] = useState(false);

  useEffect(
    function () {
      dispatch(setCurrentOpenBoard({ currentBoard }));
    },
    [currentBoard, dispatch]
  );

  return {
    boardsArray,
    currentOpenBoard,
    setCurrentBoard,
    isOpenModal,
    setIsOpenModal,
  };
}
