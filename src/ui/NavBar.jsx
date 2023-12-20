import { useEffect, useRef, useState } from "react";
import { IoMdAdd } from "react-icons/io";
import { useSelector } from "react-redux";
import { getCurrentOpenBoard } from "../features/Boards/boardSlice";
import BoardNameUpdateForm from "../features/Boards/BoardNameUpdateForm";
import BoardDeleteForm from "../features/Boards/BoardDeleteForm";

export default function NavBar() {
  const [isBoardMenu, setIsBoardMenu] = useState(false);
  const [contextMenuPosition, setContextMenuPosition] = useState(null);
  const [isOpenContextMenu, setIsOpenContextMenu] = useState(false);
  const [isOpenBoardNameModal, setIsOpenBoardNameModal] = useState(false);
  const [isOpenBoardDeleteModal, setIsOpenBoardDeleteModal] = useState(false);
  const currentBoard = useSelector(getCurrentOpenBoard);
  const ref = useRef();

  useEffect(function () {
    function handleOutsideClick(e) {
      if (ref.current && !ref.current.contains(e.target)) {
        setIsOpenContextMenu(false);
      }
    }

    document.addEventListener("click", handleOutsideClick);

    return () => document.removeEventListener("click", handleOutsideClick);
  }, []);

  function handleContextMenuToggle(e) {
    e.stopPropagation();
    const rect = e.target.closest("button").getBoundingClientRect();
    setContextMenuPosition({
      x: window.innerWidth - rect.x - rect.width,
      y: rect.y + rect.height + 10,
    });
    setIsOpenContextMenu((isOpenContextMenu) => !isOpenContextMenu);
  }

  return (
    <header className="navbar">
      <div className="nav-logo-container ">
        <img src="/logo-dark.svg" alt="Kanban task management logo" />
      </div>

      <div className="nav-items">
        <div className="nav-board">
          <img src="/logo-mobile.svg" alt="kanban task management logo" />
          <div onClick={() => setIsBoardMenu((isBoardMenu) => !isBoardMenu)}>
            <p className="nav-board-name">{currentBoard}</p>
            {!isBoardMenu ? (
              <img src="/icon-chevron-down.svg" alt="board menu toggle" />
            ) : (
              <img src="/icon-chevron-up.svg" alt="board menu toggle" />
            )}
          </div>
        </div>

        <div className="nav-btns">
          <button className="btn-add-task">
            <span>
              <IoMdAdd />
            </span>
            <span>Add New Task</span>
          </button>

          <button
            className="btn-context-menu"
            onClick={(e) => handleContextMenuToggle(e)}
          >
            <img src="/icon-vertical-ellipsis.svg" alt="context-menu icon" />
          </button>
          {isOpenContextMenu && (
            <div
              ref={ref}
              className="navbar-context-menu"
              style={{
                top: `${contextMenuPosition.y}px`,
                right: `${contextMenuPosition.x}px`,
              }}
            >
              <div
                className="navbar-context-item"
                onClick={() => {
                  setIsOpenContextMenu(false);
                  setIsOpenBoardNameModal(
                    (isOpenBoardNameModal) => !isOpenBoardNameModal
                  );
                }}
              >
                Edit Board Name
              </div>
              <div
                className="navbar-context-item"
                onClick={() => {
                  setIsOpenContextMenu(false);
                  setIsOpenBoardDeleteModal(
                    (isOpenBoardDeleteModal) => !isOpenBoardDeleteModal
                  );
                }}
              >
                Delete Board
              </div>
            </div>
          )}
          {isOpenBoardNameModal && (
            <BoardNameUpdateForm
              currentBoard={currentBoard}
              isOpenBoardNameModal={isOpenBoardNameModal}
              setIsOpenBoardNameModal={setIsOpenBoardNameModal}
            />
          )}
          {isOpenBoardDeleteModal && (
            <BoardDeleteForm
              setIsOpenBoardDeleteModal={setIsOpenBoardDeleteModal}
            />
          )}
        </div>
      </div>
    </header>
  );
}
