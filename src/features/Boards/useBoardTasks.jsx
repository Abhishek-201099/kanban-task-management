import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { getTasksData } from "../Tasks/taskSlice";
import { getCurrentOpenBoardData } from "./boardSlice";

export default function useBoardTasks() {
  const [isAddBoardCol, setIsAddBoardCol] = useState(false);
  const [isDeleteCol, setIsDeleteCol] = useState(false);
  const [colToDelete, setColToDelete] = useState("");
  const [isOpenTaskInfo, setIsOpenTaskInfo] = useState(false);
  const [isOpenTaskDel, setIsOpenTaskDel] = useState(false);
  const [selectedTask, setSelectedTask] = useState(null);
  const [isOpenEditTaskForm, setIsOpenEditTaskForm] = useState(false);
  const tasksData = useSelector(getTasksData);
  const currentOpenBoardData = useSelector(getCurrentOpenBoardData);

  useEffect(
    function () {
      if (!isOpenTaskInfo) {
        if (!selectedTask) return;
        setSelectedTask((selectedTask) => {
          const updatedSelectedTask = tasksData.find(
            (task) =>
              task.taskForBoard === selectedTask.taskForBoard &&
              task.taskName === selectedTask.taskName
          );
          return updatedSelectedTask;
        });
      }
    },
    [isOpenTaskInfo, tasksData, selectedTask]
  );

  const currentOpenBoardTasks = tasksData.filter(
    (task) => task.taskForBoard === currentOpenBoardData.boardName
  );

  return {
    isAddBoardCol,
    setIsAddBoardCol,
    isDeleteCol,
    setIsDeleteCol,
    colToDelete,
    setColToDelete,
    isOpenTaskInfo,
    setIsOpenTaskInfo,
    isOpenTaskDel,
    setIsOpenTaskDel,
    selectedTask,
    setSelectedTask,
    isOpenEditTaskForm,
    setIsOpenEditTaskForm,
    currentOpenBoardData,
    currentOpenBoardTasks,
  };
}
