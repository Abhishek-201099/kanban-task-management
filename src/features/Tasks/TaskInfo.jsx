import { useSelector } from "react-redux";
import useOutsideClick from "../../hooks/useOutsideClick";
import { getCurrentOpenBoardData } from "../Boards/boardSlice";
import { useDispatch } from "react-redux";
import { updateSubtaskStatus, updateTaskForCol } from "./taskSlice";
import { useState } from "react";

export default function TaskInfo({
  selectedTask,
  setIsOpenTaskInfo,
  setIsOpenTaskDel,
  setIsOpenEditTaskForm,
}) {
  const dispatch = useDispatch();
  const [isOpenContextMenu, setIsOpenContextMenu] = useState(false);
  const [contextMenuPosition, setContextMenuPosition] = useState(null);
  const [currentStatusValue, setCurrentStatusValue] = useState(
    selectedTask.taskForCol
  );
  const [checkedSubtasks, setCheckedSubtasks] = useState(
    selectedTask.subtasks
      .filter((subtask) => subtask.subtaskStatus === "checked")
      .map((subtask) => subtask.subtask)
  );
  const currentOpenBoardData = useSelector(getCurrentOpenBoardData);
  const ref = useOutsideClick(handleOutsideClick, true);

  function handleOutsideClick() {
    setIsOpenTaskInfo(false);

    dispatch(
      updateSubtaskStatus({
        taskToUpdate: selectedTask,
        checkedSubtasks,
      })
    );

    // FIX THE TASK SWITCH ISSUE WHERE CHECKING AIN'T WORKING AFTER SWITCHING COLS

    if (selectedTask.taskForCol !== currentStatusValue) {
      dispatch(
        updateTaskForCol({
          taskToUpdate: selectedTask,
          newColumn: currentStatusValue,
        })
      );
    }
  }

  function handleUpdateSubtask(subtask) {
    checkedSubtasks.includes(subtask)
      ? setCheckedSubtasks((checkedSubtasks) =>
          checkedSubtasks.filter((item) => item !== subtask)
        )
      : setCheckedSubtasks((checkedSubtasks) => [...checkedSubtasks, subtask]);
  }

  function handleContextMenuToggle(e) {
    // FIX OUTSIDE CLICK FOR CONTEXT MENU
    // e.stopPropagation();
    const rect = e.target.closest("div").getBoundingClientRect();
    setContextMenuPosition({
      x: window.innerWidth - rect.x - rect.width,
      y: rect.y + rect.height + 10,
    });
    setIsOpenContextMenu((isOpenContextMenu) => !isOpenContextMenu);
  }

  return (
    <div className="modal">
      <div ref={ref} className="taskinfo-container">
        <div className="taskinfo-heading">
          <p className="taskinfo-taskName">{selectedTask.taskName}</p>
          <div
            className="taskinfo-contextMenu-icon"
            onClick={(e) => handleContextMenuToggle(e)}
          >
            <img src="/icon-vertical-ellipsis.svg" alt="context menu icon" />
          </div>
          {isOpenContextMenu && (
            <div
              className="taskinfo-context-menu"
              style={{
                top: `${contextMenuPosition.y}px`,
                right: `${contextMenuPosition.x}px`,
              }}
            >
              <div
                className="taskinfo-context-item"
                onClick={() => {
                  setIsOpenEditTaskForm(
                    (isOpenEditTaskForm) => !isOpenEditTaskForm
                  );
                  handleOutsideClick();
                }}
              >
                Edit task
              </div>
              <div
                className="taskinfo-context-item"
                onClick={() => {
                  setIsOpenTaskDel((isOpenTaskDel) => !isOpenTaskDel);
                  handleOutsideClick();
                }}
              >
                Delete task
              </div>
            </div>
          )}
        </div>

        <p className="taskinfo-description">{selectedTask.taskDescription}</p>

        <div className="taskinfo-subtasks">
          <p>
            Subtasks ({checkedSubtasks.length} of {selectedTask.subtasks.length}
            )
          </p>

          <div className="taskinfo-subtasks-list">
            {selectedTask.subtasks.map((subtask, index) => {
              return (
                <div key={index} className="taskinfo-subtasks-item">
                  <input
                    type="checkbox"
                    id={`subtask-${subtask.subtask}`}
                    checked={checkedSubtasks.includes(subtask.subtask)}
                    onChange={() => handleUpdateSubtask(subtask.subtask)}
                  />
                  <label
                    htmlFor={`subtask-${subtask.subtask}`}
                    className={`${
                      checkedSubtasks.includes(subtask.subtask) ? "checked" : ""
                    }`}
                  >
                    {subtask.subtask}
                  </label>
                </div>
              );
            })}
          </div>
        </div>

        <div className="taskinfo-currentStatus">
          <label htmlFor="task-status">Current status</label>
          <select
            id="task-status"
            value={currentStatusValue}
            onChange={(e) => setCurrentStatusValue(e.target.value)}
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
      </div>
    </div>
  );
}
