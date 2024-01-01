import { useFieldArray, useForm } from "react-hook-form";
import useOutsideClick from "../../hooks/useOutsideClick";
import { useSelector } from "react-redux";
import { getCurrentOpenBoardData } from "../Boards/boardSlice";
import { useDispatch } from "react-redux";
import { addTask, editTask, getTasksData, updateTaskForCol } from "./taskSlice";

export default function TaskAddForm({
  setIsOpenAddTaskForm,
  formFor = "add",
  selectedTask = {},
  setIsOpenTaskInfo,
}) {
  const tasksData = useSelector(getTasksData);
  const dispatch = useDispatch();
  const currentOpenBoardData = useSelector(getCurrentOpenBoardData);
  const {
    control,
    register,
    formState: { errors },
    reset,
    handleSubmit,
  } = useForm({
    defaultValues: {
      subtasks: selectedTask?.subtasks?.map((subtask) => ({
        subtaskName: subtask.subtask,
      })) || [{ subtaskName: "" }, { subtaskName: "" }],
    },
  });

  const { append, remove, fields } = useFieldArray({
    name: "subtasks",
    control,
    rules: {
      required: "Add at least one subtask",
    },
  });

  const ref = useOutsideClick(handleOutsideClick, true);

  function handleOutsideClick() {
    setIsOpenAddTaskForm(false);
    setIsOpenTaskInfo?.(true);
  }

  function onSubmit(data) {
    const { taskName, taskDescription, taskCurrentStatus, subtasks } = data;
    const subtasksUpdated = subtasks.map((subtask) => {
      return {
        subtask: subtask.subtaskName,
        subtaskStatus:
          selectedTask?.subtasks?.find(
            (item) => item.subtask === subtask.subtaskName
          )?.subtaskStatus || "unchecked",
      };
    });

    formFor === "add"
      ? dispatch(
          addTask({
            task: {
              taskName: taskName.trim(),
              taskDescription,
              taskForCol: taskCurrentStatus,
              taskForBoard: currentOpenBoardData.boardName,
              subtasks: subtasksUpdated,
            },
          })
        )
      : dispatch(
          editTask({
            prevTask: selectedTask,
            updatedTask: {
              taskName: taskName.trim(),
              taskDescription,
              taskForCol: selectedTask.taskForCol,
              taskForBoard: currentOpenBoardData.boardName,
              subtasks: subtasksUpdated,
            },
          })
        );

    if (formFor === "edit" && selectedTask?.taskForCol !== taskCurrentStatus) {
      console.log(
        `After task edit, task column have changed from ${selectedTask?.taskForCol} to ${taskCurrentStatus}`
      );
      dispatch(
        updateTaskForCol({
          taskToUpdate: {
            taskName,
            taskDescription,
            taskForCol: selectedTask.taskForCol,
            taskForBoard: currentOpenBoardData.boardName,
            subtasks: subtasksUpdated,
          },
          newColumn: taskCurrentStatus,
        })
      );
    }

    reset();
    setIsOpenAddTaskForm(false);
  }

  function checkExistingTask(taskName) {
    let result;
    Object.keys(tasksData).forEach((board) => {
      if (board === currentOpenBoardData.boardName) {
        Object.keys(tasksData[board]).forEach((boardColumn) => {
          tasksData[board][boardColumn].forEach((task) => {
            if (task.taskName.toLowerCase() === taskName.toLowerCase()) {
              result = task;
            }
          });
        });
      }
    });
    if (!result) return false;
    return true;
  }

  return (
    <div className="modal">
      <div ref={ref} className="taskaddform-container">
        <form className="task-add-form" onSubmit={handleSubmit(onSubmit)}>
          <p className="task-form-heading margin-bottom">
            {formFor === "add" ? "Add new task" : "Edit task"}
          </p>
          <div className="task-form-name">
            <label htmlFor="taskName">Task Name</label>
            <input
              type="text"
              id="taskName"
              defaultValue={selectedTask.taskName ? selectedTask.taskName : ""}
              placeholder="e.g. Send mail "
              className={`${
                errors?.taskName?.message ? "board-input-error" : ""
              }`}
              {...register("taskName", {
                required: "This field is required",
                validate: (value) => {
                  if (checkExistingTask(value))
                    return "Task already exist, try with different task name";
                },
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
              defaultValue={
                selectedTask.taskDescription ? selectedTask.taskDescription : ""
              }
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
            <select
              defaultValue={
                selectedTask.taskForCol ? selectedTask.taskForCol : ""
              }
              id="taskCurrentStatus"
              {...register("taskCurrentStatus")}
            >
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
            {formFor === "add"
              ? "Create new task"
              : formFor === "edit"
              ? "Save changes"
              : ""}
          </button>
        </form>
      </div>
    </div>
  );
}
