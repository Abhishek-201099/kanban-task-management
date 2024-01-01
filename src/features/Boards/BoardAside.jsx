import CreateBoardForm from "./createBoardForm";
import Boards from "./Boards";
import AsideToggles from "./AsideToggles";
import useOutsideClick from "../../hooks/useOutsideClick";
import useBoardAside from "./useBoardAside";

export default function BoardAside() {
  const {
    boardsArray,
    currentOpenBoard,
    setCurrentBoard,
    isOpenModal,
    setIsOpenModal,
    isOpenBoardAside,
    setIsOpenBoardAside,
  } = useBoardAside();

  const ref = useOutsideClick(handleOutsideClick, true);

  function handleOutsideClick() {
    setIsOpenModal(false);
  }

  if (!isOpenBoardAside)
    return (
      <div
        className="aside-show-sidebar"
        onClick={() =>
          setIsOpenBoardAside((isOpenBoardAside) => !isOpenBoardAside)
        }
      >
        <img src="/icon-show-sidebar.svg" alt="show sidebar icon" />
      </div>
    );

  return (
    <div className="container-aside">
      <Boards
        boardsArray={boardsArray}
        setCurrentBoard={setCurrentBoard}
        currentOpenBoard={currentOpenBoard}
        setIsOpenModal={setIsOpenModal}
      />

      <CreateBoardForm
        isOpenModal={isOpenModal}
        mainEl={ref}
        setIsOpenModal={setIsOpenModal}
      />

      <AsideToggles setIsOpenBoardAside={setIsOpenBoardAside} />
    </div>
  );
}
