import { useSelector } from "react-redux";
import { deleteBoard, getCurrentOpenBoard } from "./boardSlice";
import { useDispatch } from "react-redux";
import useOutsideClick from "../../hooks/useOutsideClick";
import { deleteBoardData } from "../Tasks/taskSlice";

export default function BoardDeleteForm({ setIsOpenBoardDeleteModal }) {
  const dispatch = useDispatch();
  const currentBoard = useSelector(getCurrentOpenBoard);

  const ref = useOutsideClick(handleOutsideClick, true);

  function handleOutsideClick() {
    setIsOpenBoardDeleteModal(false);
  }

  function handleBoardDelete() {
    dispatch(deleteBoard({ currentBoard }));
    dispatch(deleteBoardData({ currentBoard }));
    setIsOpenBoardDeleteModal(false);
  }

  return (
    <div className="modal">
      <div className="boardDelete-form-container" ref={ref}>
        <p>
          Are you sure you want to delete board &quot;{currentBoard}&quot; ?
        </p>
        <div className="boardDelete-btns">
          <button onClick={() => handleBoardDelete()}>Yes</button>
          <button onClick={() => setIsOpenBoardDeleteModal(false)}>No</button>
        </div>
      </div>
    </div>
  );
}
