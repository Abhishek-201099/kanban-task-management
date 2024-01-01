import { useSelector } from "react-redux";
import { getDarkModeStatus } from "../DarkMode/darkModeSlice";

export default function NavLogo() {
  const isDarkMode = useSelector(getDarkModeStatus);

  return (
    <div className="nav-logo-container ">
      {isDarkMode ? (
        <img src="/logo-light.svg" alt="Kanban task management logo" />
      ) : (
        <img src="/logo-dark.svg" alt="Kanban task management logo" />
      )}
    </div>
  );
}
