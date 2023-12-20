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
  } = useBoardAside();

  const ref = useOutsideClick(handleOutsideClick, true);

  function handleOutsideClick() {
    setIsOpenModal(false);
  }

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

      <AsideToggles />
    </div>
  );
}
