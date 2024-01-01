import { useState } from "react";
import { useSelector } from "react-redux";
import { getTasksData } from "../Tasks/taskSlice";
import { getCurrentOpenBoard } from "./boardSlice";

export default function useBoardTasks() {
  const [isAddBoardCol, setIsAddBoardCol] = useState(false);
  const [isDeleteCol, setIsDeleteCol] = useState(false);
  const [colToDelete, setColToDelete] = useState("");
  const [isOpenTaskInfo, setIsOpenTaskInfo] = useState(false);
  const [isOpenTaskDel, setIsOpenTaskDel] = useState(false);
  const [selectedTask, setSelectedTask] = useState(null);
  const [isOpenEditTaskForm, setIsOpenEditTaskForm] = useState(false);
  const tasksData = useSelector(getTasksData);
  const currentOpenBoard = useSelector(getCurrentOpenBoard);

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
    currentOpenBoard,
    tasksData,
  };
}
