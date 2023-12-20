import { IoMdAdd } from "react-icons/io";

import BoardNameUpdateForm from "../Boards/BoardNameUpdateForm";
import BoardDeleteForm from "../Boards/BoardDeleteForm";
import useOutsideClick from "../../hooks/useOutsideClick";
import useNavbar from "./useNavbar";
import NavMenu from "./NavMenu";
import NavContextMenu from "./NavContextMenu";
import NavLogo from "./NavLogo";
import NavBtns from "./NavBtns";
import NavContextMenuList from "./NavContextMenuList";
import NavContextMenuItem from "./NavContextMenuItem";

export default function NavBar() {
  const {
    isBoardMenu,
    setIsBoardMenu,
    contextMenuPosition,
    isOpenContextMenu,
    setIsOpenContextMenu,
    isOpenBoardNameModal,
    setIsOpenBoardNameModal,
    isOpenBoardDeleteModal,
    setIsOpenBoardDeleteModal,
    currentBoard,
    handleContextMenuToggle,
  } = useNavbar();

  const ref = useOutsideClick(handleOutsideClick);

  function handleOutsideClick() {
    setIsOpenContextMenu(false);
  }

  return (
    <header className="navbar">
      <NavLogo />

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

        <NavBtns>
          <button className="btn-add-task">
            <span>
              <IoMdAdd />
            </span>
            <span>Add New Task</span>
          </button>

          <NavMenu handleContextMenuToggle={handleContextMenuToggle}>
            {isOpenContextMenu && (
              <NavContextMenu>
                <NavContextMenuList
                  refEl={ref}
                  contextMenuPosition={contextMenuPosition}
                >
                  <NavContextMenuItem
                    handleClick={() => {
                      setIsOpenContextMenu(false);
                      setIsOpenBoardNameModal(
                        (isOpenBoardNameModal) => !isOpenBoardNameModal
                      );
                    }}
                  >
                    Edit Board Name
                  </NavContextMenuItem>
                  <NavContextMenuItem
                    handleClick={() => {
                      setIsOpenContextMenu(false);
                      setIsOpenBoardDeleteModal(
                        (isOpenBoardDeleteModal) => !isOpenBoardDeleteModal
                      );
                    }}
                  >
                    Delete Board
                  </NavContextMenuItem>
                </NavContextMenuList>
              </NavContextMenu>
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
          </NavMenu>
        </NavBtns>
      </div>
    </header>
  );
}
