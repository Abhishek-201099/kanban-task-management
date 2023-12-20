import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import { updateBoardName } from "./boardSlice";
import useOutsideClick from "../../hooks/useOutsideClick";

export default function BoardNameUpdateForm({
  isOpenBoardNameModal,
  currentBoard,
  setIsOpenBoardNameModal,
}) {
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
    if (currentBoard !== newBoardName)
      dispatch(updateBoardName({ prevBoardName: currentBoard, newBoardName }));
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
