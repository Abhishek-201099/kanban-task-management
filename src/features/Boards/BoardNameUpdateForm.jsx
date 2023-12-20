import { useEffect, useRef } from "react";
import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import { updateBoardName } from "./boardSlice";

export default function BoardNameUpdateForm({
  isOpenBoardNameModal,
  currentBoard,
  setIsOpenBoardNameModal,
}) {
  const dispatch = useDispatch();
  const ref = useRef();
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();

  useEffect(function () {
    function handleClick(e) {
      if (ref.current && !ref.current.contains(e.target)) {
        setIsOpenBoardNameModal(false);
      }
    }

    function handleKeyDown(e) {
      if (e.key === "Escape") setIsOpenBoardNameModal(false);
    }

    document.addEventListener("keydown", handleKeyDown);
    document.addEventListener("click", handleClick, true);

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      document.removeEventListener("click", handleClick, true);
    };
  });

  useEffect(
    function () {
      reset();
    },
    [isOpenBoardNameModal, reset]
  );

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
