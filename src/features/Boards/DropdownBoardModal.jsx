import { useDispatch } from "react-redux";
import useOutsideClick from "../../hooks/useOutsideClick";
import useBoardAside from "./useBoardAside";
import { setCurrentOpenBoard } from "./boardSlice";
import DarkModeToggle from "../DarkMode/DarkModeToggle";

export default function DropdownBoardModal({
  setIsOpenDropDown,
  setIsOpenModal,
}) {
  const dispatch = useDispatch();
  const { boardsArray, setCurrentBoard, currentOpenBoard } = useBoardAside();

  const ref = useOutsideClick(handleOutsideClick, false);

  function handleOutsideClick() {
    setIsOpenDropDown(false);
  }

  return (
    <div className="modal-dropdown">
      <div ref={ref} className="dropdown-container">
        <p className="dropdown-board-count">
          All boards ({boardsArray.length})
        </p>

        <ul className="dropdown-board-list">
          {boardsArray.map((board, index) => (
            <li
              key={index}
              onClick={() => {
                setCurrentBoard(board.boardName);
                setIsOpenDropDown(false);
                dispatch(
                  setCurrentOpenBoard({ currentBoard: board.boardName })
                );
              }}
              className={`${
                board.boardName === currentOpenBoard ? "active-board" : ""
              }`}
            >
              <span>
                <img src="/icon-board.svg" alt="board icon" />
              </span>
              <span className="dropdown-board-name">{board.boardName}</span>
            </li>
          ))}
        </ul>

        <p
          className="dropdown-add-board"
          onClick={() => {
            setIsOpenDropDown(false);
            setIsOpenModal(true);
          }}
        >
          <span>
            <img src="/icon-board.svg" alt="board icon" />
          </span>
          <span>+ Create New Board</span>
        </p>

        <div className="dropdown-toggle">
          <DarkModeToggle />
        </div>
      </div>
    </div>
  );
}
