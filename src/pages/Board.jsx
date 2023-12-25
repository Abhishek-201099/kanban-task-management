import { useSelector } from "react-redux";
import BoardAside from "../features/Boards/BoardAside";
import { getTasksData } from "../features/Tasks/taskSlice";
import { getCurrentOpenBoardData } from "../features/Boards/boardSlice";
// import { DragDropContext } from "react-beautiful-dnd";

export default function Board() {
  const tasksData = useSelector(getTasksData);
  const currentOpenBoardData = useSelector(getCurrentOpenBoardData);

  const currentOpenBoardTasks = tasksData.filter(
    (task) => task.taskForBoard === currentOpenBoardData.boardName
  );

  // function handleDragEnd() {
  //   console.log("dragend happened");
  // }

  return (
    <section className="section-board">
      <BoardAside />

      <div className="container-board">
        {/* <DragDropContext onDragEnd={handleDragEnd}>
          {currentOpenBoardData.boardColumns.map((boardColumn, index) => {
            return (
              <div key={index}>
                <p>{boardColumn.columnName}</p>
                {currentOpenBoardTasks.map((task, index) => {
                  if (task.taskForCol === boardColumn.columnName) {
                    return <div key={index}>{task.taskName}</div>;
                  }
                })}
              </div>
            );
          })}
        </DragDropContext> */}
      </div>
    </section>
  );
}
