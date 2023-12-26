import { useState } from "react";
import { useSelector } from "react-redux";
import { DragDropContext, Draggable, Droppable } from "react-beautiful-dnd";
import { MdDeleteOutline } from "react-icons/md";

import { getCurrentOpenBoardData } from "./boardSlice";
import { getTasksData } from "../Tasks/taskSlice";
import BoardAddColumn from "./BoardAddColumn";
import BoardColDeleteForm from "./BoardColDeleteForm";

export default function BoardTasks() {
  const [isAddBoardCol, setIsAddBoardCol] = useState(false);
  const [isDeleteCol, setIsDeleteCol] = useState(false);
  const [colToDelete, setColToDelete] = useState("");
  const tasksData = useSelector(getTasksData);
  const currentOpenBoardData = useSelector(getCurrentOpenBoardData);

  function handleDragEnd() {
    console.log("dragend happened");
  }

  const currentOpenBoardTasks = tasksData.filter(
    (task) => task.taskForBoard === currentOpenBoardData.boardName
  );

  return (
    <div className="container-board">
      <DragDropContext onDragEnd={handleDragEnd}>
        {currentOpenBoardData.boardColumns.map((boardColumn, index) => {
          return (
            <div className="task-column" key={index}>
              <div className="task-column-heading-container">
                <p className="task-column-heading">
                  {boardColumn.columnName} (
                  {currentOpenBoardTasks.reduce((acc, task) => {
                    if (task.taskForCol === boardColumn.columnName) acc += 1;
                    return acc;
                  }, 0)}
                  )
                </p>
                <button
                  className="task-column-deleteBtn"
                  onClick={() => {
                    setColToDelete(boardColumn.columnName);
                    setIsDeleteCol((isDeleteCol) => !isDeleteCol);
                  }}
                >
                  <MdDeleteOutline />
                </button>
              </div>
              <Droppable droppableId={`${boardColumn.columnName}--${index}`}>
                {(provided) => (
                  <div
                    className="task-column-list"
                    {...provided.droppableProps}
                    ref={provided.innerRef}
                  >
                    {currentOpenBoardTasks.map((task, index) => {
                      if (boardColumn.columnName === task.taskForCol)
                        return (
                          <Draggable
                            key={index}
                            draggableId={`${task.taskName}-${task.taskForBoard}`}
                            index={index}
                          >
                            {(provided) => (
                              <div
                                className="task-column-list-item"
                                ref={provided.innerRef}
                                {...provided.dragHandleProps}
                                {...provided.draggableProps}
                              >
                                <p>{task.taskName}</p>
                                <p>{`${task.subtasks.reduce((acc, subtask) => {
                                  if (subtask.subtaskStatus === "checked")
                                    acc += 1;
                                  return acc;
                                }, 0)} of ${task.subtasks.length} subtasks`}</p>
                              </div>
                            )}
                          </Draggable>
                        );
                    })}
                    {provided.placeholder}
                  </div>
                )}
              </Droppable>
            </div>
          );
        })}
        <div
          className="task-column add-new-column"
          onClick={() => setIsAddBoardCol((isAddBoardCol) => !isAddBoardCol)}
        >
          <p>+ New Column</p>
        </div>
      </DragDropContext>

      {isAddBoardCol && (
        <BoardAddColumn
          setIsAddBoardCol={setIsAddBoardCol}
          currentOpenBoardData={currentOpenBoardData}
        />
      )}

      {isDeleteCol && (
        <BoardColDeleteForm
          colToDelete={colToDelete}
          setIsDeleteCol={setIsDeleteCol}
        />
      )}
    </div>
  );
}
