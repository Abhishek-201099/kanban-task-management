import { useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";
import { getBoards, setCurrentOpenBoard } from "../features/Boards/boardSlice";
import CreateBoardForm from "../features/Boards/createBoardForm";
import { useDispatch } from "react-redux";

// const boardsArray = ["Platform launch", "Marketing Plan", "Roadmap"];

export default function Board() {
  const dispatch = useDispatch();
  const boardsArray = useSelector(getBoards);
  const [activeBoard, setIsActiveBoard] = useState(0);
  const [currentBoard, setCurrentBoard] = useState(boardsArray[0].boardName);
  const [isOpenModal, setIsOpenModal] = useState(false);

  const ref = useRef();

  useEffect(
    function () {
      dispatch(setCurrentOpenBoard({ currentBoard }));
    },
    [currentBoard, dispatch]
  );

  useEffect(function () {
    function handleClick(e) {
      if (ref.current && !ref.current.contains(e.target)) {
        setIsOpenModal(false);
      }
    }

    function handleKeyDown(e) {
      if (e.key === "Escape") setIsOpenModal(false);
    }

    document.addEventListener("click", handleClick, true);
    document.addEventListener("keydown", handleKeyDown);

    return () => {
      document.removeEventListener("click", handleClick, true);
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, []);

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
                key={board.boardName}
                onClick={() => {
                  setCurrentBoard(board.boardName);
                  setIsActiveBoard(index);
                }}
                className={`${index === activeBoard ? "active-board" : ""}`}
              >
                <span>
                  <img src="/icon-board.svg" alt="board icon" />
                </span>
                <span className="aside-board-name">{board.boardName}</span>
              </li>
            ))}
          </ul>
          <p className="aside-add-board" onClick={() => setIsOpenModal(true)}>
            <span>
              <img src="/icon-board.svg" alt="board icon" />
            </span>
            <span>+ Create New Board</span>
          </p>
        </div>

        <CreateBoardForm
          isOpenModal={isOpenModal}
          mainEl={ref}
          setIsOpenModal={setIsOpenModal}
        />

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
