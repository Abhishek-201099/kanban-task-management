import { useDispatch } from "react-redux";
import { deleteTask } from "./taskSlice";
import useOutsideClick from "../../hooks/useOutsideClick";

export default function TaskDeleteForm({
  selectedTask,
  setIsOpenTaskInfo,
  setIsOpenTaskDel,
}) {
  const dispatch = useDispatch();
  const ref = useOutsideClick(handleOutsideClick, true);

  function handleOutsideClick() {
    setIsOpenTaskDel(false);
    setIsOpenTaskInfo(true);
  }

  function handleTaskDelete() {
    dispatch(deleteTask({ taskToRemove: selectedTask }));
    setIsOpenTaskDel(false);
    setIsOpenTaskInfo(false);
  }

  return (
    <div className="modal">
      <div ref={ref} className="taskinfo-delete-container">
        <p>
          Are you sure you want to delete task &quot;
          {selectedTask.taskName}&quot; ?
        </p>
        <div className="taskinfo-delete-btns">
          <button onClick={() => handleTaskDelete()}>Yes</button>
          <button
            onClick={() => {
              setIsOpenTaskDel(false);
              setIsOpenTaskInfo(true);
            }}
          >
            No
          </button>
        </div>
      </div>
    </div>
  );
}
