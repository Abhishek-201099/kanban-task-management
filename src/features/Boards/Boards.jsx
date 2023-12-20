export default function Boards({
  boardsArray,
  setCurrentBoard,
  currentOpenBoard,
  setIsOpenModal,
}) {
  return (
    <div className="aside-boards">
      <p className="aside-boards-count">All boards ({boardsArray.length})</p>
      <ul className="aside-boards-list">
        {boardsArray.map((board, index) => (
          <li
            key={index}
            onClick={() => setCurrentBoard(board.boardName)}
            className={`${
              board.boardName === currentOpenBoard ? "active-board" : ""
            }`}
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
  );
}
