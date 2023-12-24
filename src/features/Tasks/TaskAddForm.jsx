import { useFieldArray, useForm } from "react-hook-form";
import useOutsideClick from "../../hooks/useOutsideClick";
import { useSelector } from "react-redux";
import { getCurrentOpenBoardData } from "../Boards/boardSlice";

export default function TaskAddForm({ setIsOpenAddTaskForm }) {
  const currentOpenBoardData = useSelector(getCurrentOpenBoardData);
  const {
    control,
    register,
    formState: { errors },
    reset,
    handleSubmit,
  } = useForm({
    defaultValues: {
      subtasks: [{ subtaskName: "" }, { subtaskName: "" }],
    },
  });

  const { append, remove, fields } = useFieldArray({
    name: "subtasks",
    control,
    rules: {
      required: "Add at least one subtasks",
    },
  });

  const ref = useOutsideClick(handleOutsideClick, true);

  function handleOutsideClick() {
    setIsOpenAddTaskForm(false);
  }

  function onSubmit(data) {
    // ADD STYLES TO TASK ADD FORM
    // HANDLE DISPATCHING ACTION FOR ADDING PROPER TASK DATA
    console.log(data);
    reset();
  }

  return (
    <div className="modal">
      <div ref={ref} className="taskaddform-container">
        <form className="task-add-form" onSubmit={handleSubmit(onSubmit)}>
          <p className="task-form-heading margin-bottom">Add new task</p>
          <div className="task-form-name">
            <label htmlFor="taskName">Task Name</label>
            <input
              type="text"
              id="taskName"
              placeholder="e.g. Send mail "
              className={`${
                errors?.taskName?.message ? "board-input-error" : ""
              }`}
              {...register("taskName", {
                required: "This field is required",
              })}
            />
            {errors?.taskName?.message && (
              <p className="task-form-error">{errors?.taskName?.message}</p>
            )}
          </div>

          <div className="task-form-description">
            <label htmlFor="taskDescription">Description</label>
            <textarea
              id="taskDescription"
              cols="30"
              rows="10"
              className={`${
                errors?.taskDescription?.message ? "board-input-error" : ""
              }`}
              {...register("taskDescription", {
                required: "This field is required",
              })}
            ></textarea>
            {errors?.taskDescription?.message && (
              <p className="task-form-error">
                {errors?.taskDescription?.message}
              </p>
            )}
          </div>

          <div className="task-form-subtasks">
            <label>Subtasks</label>
            <div className="subtask-list">
              {fields.map((subtask, index) => (
                <div key={subtask.id} className="subtask-list-item">
                  <div className="subtask-item-input">
                    <input
                      type="text"
                      placeholder={`Subtask ${index + 1} ...`}
                      {...register(`subtasks.${index}.subtaskName`, {
                        required: "This field is required",
                      })}
                      className={`${
                        errors?.subtasks?.[index]?.subtaskName?.message
                          ? "board-input-error"
                          : ""
                      }`}
                    />
                    <button type="button" onClick={() => remove(index)}>
                      <img src="/icon-cross.svg" alt="remove icon" />
                    </button>
                  </div>
                  {errors?.subtasks?.[index]?.subtaskName?.message && (
                    <p className="task-form-error">
                      {errors?.subtasks?.[index]?.subtaskName?.message}
                    </p>
                  )}
                </div>
              ))}
            </div>
            {errors?.subtasks?.root?.message && (
              <p className="task-form-error">
                {errors?.subtasks?.root?.message}
              </p>
            )}
            <button
              type="button"
              className="task-form-append"
              onClick={() => append({ subtaskName: "" })}
            >
              + Add subtask
            </button>
          </div>

          <div className="task-form-currentStatus">
            <label htmlFor="taskCurrentStatus">Current Status</label>
            <select id="taskCurrentStatus" {...register("taskCurrentStatus")}>
              {currentOpenBoardData.boardColumns.map((boardColumn, index) => {
                return (
                  <option key={index} value={boardColumn.columnName}>
                    {boardColumn.columnName}
                  </option>
                );
              })}
            </select>
          </div>

          <button className="task-form-submit" type="submit">
            Create new task
          </button>
        </form>
      </div>
    </div>
  );
}
