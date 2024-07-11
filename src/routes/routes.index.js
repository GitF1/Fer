import { createBrowserRouter } from "react-router-dom";
import Root from "../pages/home/Root";
import ErrorPage from "../pages/error/ErrorPage";
import App from "../App";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
  },
  {
    path: "/root",
    element: <Root />,
  },
  {
    path: "*",
    element: <ErrorPage />,
  },
]);

export default router;
