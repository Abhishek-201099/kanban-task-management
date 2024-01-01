import { useDarkMode } from "./useDarkMode";
import { useSelector } from "react-redux";
import { getDarkModeStatus } from "./darkModeSlice";

export default function DarkModeToggle() {
  const toggleDarkMode = useDarkMode();
  const isDarkMode = useSelector(getDarkModeStatus);

  return (
    <div className="aside-toggle-darkmode">
      <div>
        <img src="/icon-light-theme.svg" alt="Light Theme icon" />
      </div>
      <label className="switch">
        <input
          type="checkbox"
          checked={isDarkMode ? true : false}
          onChange={() => toggleDarkMode()}
        />
        <span className="slider round"></span>
      </label>
      <div>
        <img src="/icon-dark-theme.svg" alt="dark theme icon" />
      </div>
    </div>
  );
}
