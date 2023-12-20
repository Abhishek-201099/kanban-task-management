import { useSelector } from "react-redux";
import {
  deleteBoard,
  getBoards,
  getCurrentOpenBoard,
  setCurrentOpenBoard,
} from "./boardSlice";
import { useDispatch } from "react-redux";
import useOutsideClick from "../../hooks/useOutsideClick";

export default function BoardDeleteForm({ setIsOpenBoardDeleteModal }) {
  const dispatch = useDispatch();
  const currentBoard = useSelector(getCurrentOpenBoard);
  const boardsArray = useSelector(getBoards);

  const ref = useOutsideClick(handleOutsideClick, true);

  function handleOutsideClick() {
    setIsOpenBoardDeleteModal(false);
  }

  function handleBoardDelete() {
    dispatch(deleteBoard({ currentBoard }));
    dispatch(setCurrentOpenBoard({ currentBoard: boardsArray[0].boardName }));
    setIsOpenBoardDeleteModal(false);
  }

  return (
    <div className="modal">
      <div className="boardDelete-form-container" ref={ref}>
        <p>Are you sure you want to delete board {currentBoard}?</p>
        <div className="boardDelete-btns">
          <button onClick={() => handleBoardDelete()}>Yes</button>
          <button onClick={() => setIsOpenBoardDeleteModal(false)}>No</button>
        </div>
      </div>
    </div>
  );
}
