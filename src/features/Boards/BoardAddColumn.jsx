import { useForm } from "react-hook-form";
import useOutsideClick from "../../hooks/useOutsideClick";
import { useDispatch } from "react-redux";
import { addBoardColumn } from "./boardSlice";

export default function BoardAddColumn({
  setIsAddBoardCol,
  currentOpenBoardData,
}) {
  const dispatch = useDispatch();
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const ref = useOutsideClick(handleOutsideClick, true);

  function handleOutsideClick() {
    reset();
    setIsAddBoardCol(false);
  }

  function onSubmit(data) {
    const { newBoardColumn } = data;
    dispatch(
      addBoardColumn({
        currentBoard: currentOpenBoardData.boardName,
        newBoardColumn,
      })
    );
    reset();
    setIsAddBoardCol(false);
  }

  return (
    <div className="modal">
      <form
        ref={ref}
        className="new-board-col-form"
        onSubmit={handleSubmit(onSubmit)}
      >
        <div className="new-board-col-input">
          <label htmlFor="new-board-col">New board column</label>
          <input
            id="new-board-col"
            type="text"
            className={`${
              errors?.newBoardColumn?.message ? "boardName-input-error" : ""
            }`}
            {...register("newBoardColumn", {
              required: "This field is required",
            })}
          />
          {errors?.newBoardColumn?.message && (
            <p>{errors?.newBoardColumn?.message}</p>
          )}
        </div>
        <button className="">+ Add new column</button>
      </form>
    </div>
  );
}
