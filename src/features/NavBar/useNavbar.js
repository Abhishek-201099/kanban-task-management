import { useState } from "react";
import { useSelector } from "react-redux";
import { getCurrentOpenBoard } from "../Boards/boardSlice";

export default function useNavbar() {
  const [isBoardMenu, setIsBoardMenu] = useState(false);
  const [contextMenuPosition, setContextMenuPosition] = useState(null);
  const [isOpenContextMenu, setIsOpenContextMenu] = useState(false);
  const [isOpenBoardNameModal, setIsOpenBoardNameModal] = useState(false);
  const [isOpenBoardDeleteModal, setIsOpenBoardDeleteModal] = useState(false);
  const currentBoard = useSelector(getCurrentOpenBoard);

  function handleContextMenuToggle(e) {
    e.stopPropagation();
    const rect = e.target.closest("button").getBoundingClientRect();
    setContextMenuPosition({
      x: window.innerWidth - rect.x - rect.width,
      y: rect.y + rect.height + 10,
    });
    setIsOpenContextMenu((isOpenContextMenu) => !isOpenContextMenu);
  }

  return {
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
  };
}
