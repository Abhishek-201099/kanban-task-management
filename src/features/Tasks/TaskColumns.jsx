import { DragDropContext, Draggable, Droppable } from "react-beautiful-dnd";
import { MdDeleteOutline } from "react-icons/md";
import { useDispatch } from "react-redux";
import { updateTaskForCol } from "./taskSlice";

export default function TaskColumns({
  currentOpenBoard,
  setColToDelete,
  setIsDeleteCol,
  setSelectedTask,
  setIsOpenTaskInfo,
  setIsAddBoardCol,
  tasksData,
}) {
  const dispatch = useDispatch();

  function handleDragEnd(results) {
    const { source, destination, type } = results;

    if (!source || !destination || type !== "TASKS") return;

    const draggedTask =
      currentOpenBoardTaskInfo[source.droppableId.split("-").at(0)][
        source.index
      ];

    dispatch(
      updateTaskForCol({
        taskToUpdate: draggedTask,
        newColumn: destination.droppableId.split("-").at(0),
        droppedIndex: destination.index,
      })
    );
  }

  const currentOpenBoardTaskInfo = tasksData[currentOpenBoard];

  if (!currentOpenBoardTaskInfo)
    return (
      <div className="no-boards-container">
        <p>No Boards to display</p>
        <p>Please create a board ...</p>
      </div>
    );

  return (
    <DragDropContext onDragEnd={handleDragEnd}>
      {Object.keys(currentOpenBoardTaskInfo).map((boardColumn, index) => {
        return (
          <div className="task-column" key={index}>
            <div className="task-column-heading-container">
              <p className="task-column-heading">
                {boardColumn} ({currentOpenBoardTaskInfo[boardColumn].length})
              </p>
              <button
                className="task-column-deleteBtn"
                onClick={() => {
                  setColToDelete(boardColumn);
                  setIsDeleteCol((isDeleteCol) => !isDeleteCol);
                }}
              >
                <MdDeleteOutline />
              </button>
            </div>
            <Droppable droppableId={`${boardColumn}--${index}`} type="TASKS">
              {(provided) => (
                <div
                  className="task-column-list"
                  {...provided.droppableProps}
                  ref={provided.innerRef}
                >
                  {currentOpenBoardTaskInfo[boardColumn].map((task, index) => {
                    return (
                      <Draggable
                        key={`${task.taskName}-${index}`}
                        draggableId={`${task.taskName}-${task.taskForBoard}`}
                        index={index}
                      >
                        {(provided) => (
                          <div
                            className="task-column-list-item"
                            ref={provided.innerRef}
                            {...provided.dragHandleProps}
                            {...provided.draggableProps}
                            onClick={() => {
                              setSelectedTask(task);
                              setIsOpenTaskInfo(
                                (isOpenTaskInfo) => !isOpenTaskInfo
                              );
                            }}
                          >
                            <p>{task.taskName}</p>
                            <p>{`${task.subtasks.reduce((acc, subtask) => {
                              if (subtask.subtaskStatus === "checked") acc += 1;
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
  );
}
