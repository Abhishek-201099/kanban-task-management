import { useState } from "react";
import { IoMdAdd } from "react-icons/io";

export default function NavBar() {
  const [isBoardMenu, setIsBoardMenu] = useState(false);

  return (
    <header className="navbar">
      <div className="nav-logo-container ">
        <img src="/logo-dark.svg" alt="Kanban task management logo" />
      </div>

      <div className="nav-items">
        <div className="nav-board">
          <img src="/logo-mobile.svg" alt="kanban task management logo" />
          <div onClick={() => setIsBoardMenu((isBoardMenu) => !isBoardMenu)}>
            <p className="nav-board-name">Platform Launch</p>
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
          <button className="btn-context-menu">
            <img src="/icon-vertical-ellipsis.svg" alt="context-menu icon" />
          </button>
        </div>
      </div>
    </header>
  );
}
