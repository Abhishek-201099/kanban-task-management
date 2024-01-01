import { useEffect } from "react";
import { useFieldArray, useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import { addBoard, getBoards } from "./boardSlice";
import { addNewBoardData } from "../Tasks/taskSlice";
import { useSelector } from "react-redux";

export default function CreateBoardForm({
  isOpenModal,
  mainEl,
  setIsOpenModal,
}) {
  const boardsData = useSelector(getBoards);
  const dispatch = useDispatch();
  const {
    register,
    control,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    defaultValues: {
      boardName: "",
      boardColumns: [{ columnName: "Todo" }, { columnName: "Doing" }],
    },
  });

  const { append, remove, fields } = useFieldArray({
    name: "boardColumns",
    control,
    rules: {
      required: "Add at least one column",
    },
  });

  useEffect(
    function () {
      reset();
    },
    [isOpenModal, reset]
  );

  function capAndTrim(str) {
    return str
      .split(" ")
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      .join(" ")
      .trim();
  }

  function onSubmit(data) {
    const { boardName, boardColumns } = data;
    dispatch(
      addBoard({
        boardName: capAndTrim(boardName),
        boardColumns,
      })
    );
    dispatch(
      addNewBoardData({ boardName: capAndTrim(boardName), boardColumns })
    );
    reset();
    setIsOpenModal(false);
  }

  if (!isOpenModal) return null;

  return (
    <div className="modal">
      <form
        ref={mainEl}
        onSubmit={handleSubmit(onSubmit)}
        className="create-board-form"
      >
        <p className="board-form-heading">Add new board</p>
        <div className="board-form-name">
          <label htmlFor="boardName">Board Name</label>
          <input
            type="text"
            id="boardName"
            placeholder="e.g. Web Design"
            className={`${
              errors?.boardName?.message ? "board-input-error" : ""
            }`}
            {...register("boardName", {
              required: "This field is required",
              validate: (value) => {
                const board = boardsData.find(
                  (board) =>
                    board.boardName.toLowerCase() === value.toLowerCase().trim()
                );
                if (board) return "Board name already exists";
              },
            })}
          />
          {errors?.boardName?.message && (
            <p className="board-form-error">{errors?.boardName?.message}</p>
          )}
        </div>

        <div className="board-form-columns">
          <label>Board Column</label>
          <div className="column-list">
            {fields.map((column, index) => (
              <div key={column.id} className="column-list-item">
                <div className="column-item-input">
                  <input
                    type="text"
                    {...register(`boardColumns.${index}.columnName`, {
                      required: "This field is required",
                    })}
                    className={`${
                      errors?.boardColumns?.[index]?.columnName?.message
                        ? "board-input-error"
                        : ""
                    }`}
                    defaultValue=""
                    placeholder={`Column name ${index + 1}`}
                  />
                  <button type="button" onClick={() => remove(index)}>
                    <img src="/icon-cross.svg" alt="remove icon" />
                  </button>
                </div>
                {errors?.boardColumns?.[index]?.columnName?.message && (
                  <p className="board-form-error margin-top">
                    {errors?.boardColumns?.[index]?.columnName?.message}
                  </p>
                )}
              </div>
            ))}
          </div>
          {errors?.boardColumns?.root?.message && (
            <p className="board-form-error">
              {errors?.boardColumns?.root?.message}
            </p>
          )}
        </div>

        <div className="board-form-btns">
          <button
            className="board-form-append"
            type="button"
            onClick={() => append({ columnName: "" })}
          >
            + Add New Column
          </button>

          <button className="board-form-submit" type="submit">
            Create New Board
          </button>
        </div>
      </form>
    </div>
  );
}
