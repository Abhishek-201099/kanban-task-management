import DarkModeToggle from "../DarkMode/DarkModeToggle";

export default function AsideToggles({ setIsOpenBoardAside }) {
  return (
    <div className="aside-toggles">
      <DarkModeToggle />
      <div
        className="aside-toggle-hide"
        onClick={() =>
          setIsOpenBoardAside((isOpenBoardAside) => !isOpenBoardAside)
        }
      >
        <span>
          <img src="/icon-hide-sidebar.svg" alt="hide sidebar icon" />
        </span>
        <p>Hide Sidebar</p>
      </div>
    </div>
  );
}
