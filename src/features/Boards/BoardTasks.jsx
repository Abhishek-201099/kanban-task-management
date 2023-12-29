import BoardAddColumn from "./BoardAddColumn";
import BoardColDeleteForm from "./BoardColDeleteForm";
import TaskInfo from "../Tasks/TaskInfo";
import TaskDeleteForm from "../Tasks/TaskDeleteForm";
import TaskAddForm from "../Tasks/taskAddForm";
import useBoardTasks from "./useBoardTasks";
import TaskColumns from "../Tasks/TaskColumns";

export default function BoardTasks() {
  const {
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
  } = useBoardTasks();

  return (
    <div className="container-board">
      <TaskColumns
        currentOpenBoard={currentOpenBoard}
        tasksData={tasksData}
        setColToDelete={setColToDelete}
        setIsDeleteCol={setIsDeleteCol}
        setSelectedTask={setSelectedTask}
        setIsOpenTaskInfo={setIsOpenTaskInfo}
        setIsAddBoardCol={setIsAddBoardCol}
      />

      {isAddBoardCol && (
        <BoardAddColumn
          setIsAddBoardCol={setIsAddBoardCol}
          currentOpenBoard={currentOpenBoard}
        />
      )}

      {isDeleteCol && (
        <BoardColDeleteForm
          colToDelete={colToDelete}
          setIsDeleteCol={setIsDeleteCol}
        />
      )}

      {isOpenTaskInfo && (
        <TaskInfo
          selectedTask={selectedTask}
          setIsOpenTaskInfo={setIsOpenTaskInfo}
          setIsOpenTaskDel={setIsOpenTaskDel}
          setIsOpenEditTaskForm={setIsOpenEditTaskForm}
        />
      )}

      {isOpenTaskDel && (
        <TaskDeleteForm
          selectedTask={selectedTask}
          setIsOpenTaskInfo={setIsOpenTaskInfo}
          setIsOpenTaskDel={setIsOpenTaskDel}
        />
      )}

      {isOpenEditTaskForm && (
        <TaskAddForm
          formFor="edit"
          selectedTask={selectedTask}
          setIsOpenTaskInfo={setIsOpenTaskInfo}
          setIsOpenAddTaskForm={setIsOpenEditTaskForm}
        />
      )}
    </div>
  );
}
