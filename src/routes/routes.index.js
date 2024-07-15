import { createBrowserRouter } from "react-router-dom";
import Root from "../pages/home/Root";
import ErrorPage from "../pages/error/ErrorPage";
import App from "../App";
import MovieForm from '../components/MovieForm';
import MoviesList from '../components/MoviesList';

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
  {
    path: "/movies",
    element: 
    <>
    <MovieForm></MovieForm>
    <MoviesList></MoviesList>
    </>
  },
 
]);

export default router;
