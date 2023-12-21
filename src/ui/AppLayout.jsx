import { Outlet } from "react-router-dom";
import { useState } from "react";

import NavBar from "../features/NavBar/NavBar";
import DropdownBoardModal from "../features/Boards/DropdownBoardModal";
import useBoardAside from "../features/Boards/useBoardAside";
import CreateBoardForm from "../features/Boards/createBoardForm";
import useOutsideClick from "../hooks/useOutsideClick";

export default function AppLayout() {
  const [isOpenDropDown, setIsOpenDropDown] = useState(false);
  const { isOpenModal, setIsOpenModal } = useBoardAside();

  const ref = useOutsideClick(handleOutsideClick, true);

  function handleOutsideClick() {
    setIsOpenModal(false);
  }

  return (
    <div className="container">
      <NavBar
        isOpenDropDown={isOpenDropDown}
        setIsOpenDropDown={setIsOpenDropDown}
      />
      <main>
        <>
          {isOpenDropDown && (
            <DropdownBoardModal
              setIsOpenDropDown={setIsOpenDropDown}
              setIsOpenModal={setIsOpenModal}
            />
          )}
          <CreateBoardForm
            isOpenModal={isOpenModal}
            mainEl={ref}
            setIsOpenModal={setIsOpenModal}
          />
          <Outlet />
        </>
      </main>
    </div>
  );
}
