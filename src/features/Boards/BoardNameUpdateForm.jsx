import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import { getBoards, updateBoardName } from "./boardSlice";
import useOutsideClick from "../../hooks/useOutsideClick";
import { updateBoard } from "../Tasks/taskSlice";
import { useSelector } from "react-redux";
import { capAndTrim } from "../../helpers/helpers";

export default function BoardNameUpdateForm({
  isOpenBoardNameModal,
  currentBoard,
  setIsOpenBoardNameModal,
}) {
  const boardsData = useSelector(getBoards);
  const dispatch = useDispatch();
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();

  const ref = useOutsideClick(handleOutsideClick, true);

  useEffect(
    function () {
      reset();
    },
    [isOpenBoardNameModal, reset]
  );

  function handleOutsideClick() {
    setIsOpenBoardNameModal(false);
  }

  function onSubmit(data) {
    const { newBoardName } = data;
    if (currentBoard !== newBoardName) {
      dispatch(
        updateBoardName({
          prevBoardName: currentBoard,
          newBoardName: capAndTrim(newBoardName),
        })
      );
      dispatch(
        updateBoard({
          prevBoardName: currentBoard,
          newBoardName: capAndTrim(newBoardName),
        })
      );
    }
    setIsOpenBoardNameModal(false);
    reset();
  }

  return (
    <div className="modal">
      <form
        ref={ref}
        className="boardName-update-form"
        onSubmit={handleSubmit(onSubmit)}
      >
        <label htmlFor="boardName">Board Name</label>
        <div className="boardName-input-container">
          <input
            type="text"
            id="boardName"
            defaultValue={currentBoard}
            placeholder="Board name..."
            {...register("newBoardName", {
              required: "This field is required",
              validate: (value) => {
                const board = boardsData.find(
                  (board) =>
                    board.boardName.toLowerCase() === value.toLowerCase()
                );
                if (board) return "Board name already exists";
              },
            })}
            className={`${
              errors?.newBoardName?.message ? "boardName-input-error" : ""
            }`}
          />
          {errors?.newBoardName?.message && (
            <p>{errors?.newBoardName?.message}</p>
          )}
        </div>
        <button type="submit">Update</button>
      </form>
    </div>
  );
}
