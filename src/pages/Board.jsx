import { useState } from "react";

const boardsArray = ["Platform launch", "Marketing Plan", "Roadmap"];

export default function Board() {
  const [activeBoard, setIsActiveBoard] = useState(0);

  return (
    <section className="section-board">
      <div className="container-aside">
        <div className="aside-boards">
          <p className="aside-boards-count">
            All boards ({boardsArray.length})
          </p>
          <ul className="aside-boards-list">
            {boardsArray.map((board, index) => (
              <li
                key={board}
                onClick={() => setIsActiveBoard(index)}
                className={`${index === activeBoard ? "active-board" : ""}`}
              >
                <span>
                  <img src="/icon-board.svg" alt="board icon" />
                </span>
                <span className="aside-board-name">{board}</span>
              </li>
            ))}
          </ul>
          <p className="aside-add-board">
            <span>
              <img src="/icon-board.svg" alt="board icon" />
            </span>
            <span>+ Create New Board</span>
          </p>
        </div>

        <div className="aside-toggles">
          <div className="aside-toggle-darkmode">darkmodetoggle</div>
          <div className="aside-toggle-hide">
            <span>
              <img src="/icon-hide-sidebar.svg" alt="hide sidebar icon" />
            </span>
            <span>Hide Sidebar</span>
          </div>
        </div>
      </div>

      <div className="container-board">board</div>
    </section>
  );
}
