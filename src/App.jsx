import {
  Navigate,
  RouterProvider,
  createBrowserRouter,
} from "react-router-dom";
import AppLayout from "./ui/AppLayout";
import Board from "./pages/Board";
import PageNotFound from "./pages/PageNotFound";
import { Toaster } from "react-hot-toast";
import { useSelector } from "react-redux";
import { getDarkModeStatus } from "./features/DarkMode/darkModeSlice";

const router = createBrowserRouter([
  {
    element: <AppLayout />,
    children: [
      {
        path: "/",
        element: <Navigate to="/board" replace />,
      },
      {
        path: "/board",
        element: <Board />,
      },
    ],
  },
  {
    path: "*",
    element: <PageNotFound />,
  },
]);

export default function App() {
  const darkModeStatus = useSelector(getDarkModeStatus);

  return (
    <>
      <RouterProvider router={router} />
      <Toaster
        position="top-center"
        gutter={12}
        containerStyle={{ margin: "8px" }}
        toastOptions={{
          success: {
            duration: 3000,
          },
          error: {
            duration: 3000,
          },
          style: {
            maxWidth: "700px",
            fontSize: "16px",
            padding: "16px 24px",
            backgroundColor: `${darkModeStatus ? "#2b2c37" : "#fff"}`,
            color: `${darkModeStatus ? "#fff" : "#000"}`,
            boxShadow: ` rgba(0, 0, 0, 0.24) 0px 3px 8px`,
          },
        }}
      />
      ;
    </>
  );
}
