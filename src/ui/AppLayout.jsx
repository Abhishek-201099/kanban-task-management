import { Outlet } from "react-router-dom";
import NavBar from "../features/NavBar/NavBar";

export default function AppLayout() {
  return (
    <div className="container">
      <NavBar />
      <main>
        <Outlet />
      </main>
    </div>
  );
}
