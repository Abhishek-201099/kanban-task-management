import { useSelector } from "react-redux";
import useOutsideClick from "../../hooks/useOutsideClick";
import { deleteBoardColumn, getCurrentOpenBoard } from "./boardSlice";
import { useDispatch } from "react-redux";
import { deleteBoardTaskColumn } from "../Tasks/taskSlice";

export default function BoardColDeleteForm({ setIsDeleteCol, colToDelete }) {
  const dispatch = useDispatch();
  const ref = useOutsideClick(handleOutsideClick, true);
  const currentOpenBoard = useSelector(getCurrentOpenBoard);

  function handleOutsideClick() {
    setIsDeleteCol(false);
  }

  function handleColumnDelete() {
    dispatch(
      deleteBoardColumn({
        currentBoard: currentOpenBoard,
        colToDelete,
      })
    );
    dispatch(
      deleteBoardTaskColumn({
        currentBoard: currentOpenBoard,
        colToDelete,
      })
    );
    setIsDeleteCol(false);
  }

  return (
    <div className="modal">
      <div ref={ref} className="boardCol-delete-container">
        <p>
          Are you sure you want to delete column &quot;
          {colToDelete}&quot; ?
        </p>
        <div className="boardCol-delete-btns">
          <button onClick={(e) => handleColumnDelete(e)}>Yes</button>
          <button onClick={() => setIsDeleteCol(false)}>No</button>
        </div>
      </div>
    </div>
  );
}
