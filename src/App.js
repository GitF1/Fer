// App.js
import logo from "./logo.svg";
import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./pages/home/Home";
import Login from "./pages/auth/Login";
import Register from "./pages/auth/Register";
import { ToastContainer } from "react-toastify";
import Appheader from "./pages/auth/Appheader";
import UserAccount from "./pages/auth/UserAccount";

import MovieReview from "./components/MovieReview";
import { Provider } from "react-redux";
import { store } from "./app/store";
import { BrowserRouter as Router } from "react-router-dom";
import MoviesList from "./components/MoviesList";
import ListCinemas from "./pages/admin/cinema/ListCinemas";
import RegisterCinema from "./pages/admin/cinema/RegisterCinema";
import UpdateProject from "./components/UI/form/FormUpdate";
import UdpateCinema from "./pages/admin/cinema/UpdateCinema";

function App() {
  return (
    <Provider store={store}>
      <div className="App">
        <ToastContainer theme="colored" position="top-center"></ToastContainer>
        <BrowserRouter>
          <Appheader></Appheader>
          <Routes>
            <Route path="/" element={<Home />}></Route>
            <Route path="/login" element={<Login />}></Route>
            <Route path="/register" element={<Register />}></Route>
            <Route path="/user" element={<UserAccount />}></Route>
            <Route path="/movielist" element={<MoviesList />}></Route>
            <Route path="/review" element={<MovieReview />}></Route>
            <Route path="/cinema/manage" element={<ListCinemas />}></Route>
            <Route path="/cinema/create" element={<RegisterCinema />}></Route>
            <Route path="/cinema/update/:id" element={<UdpateCinema />}></Route>
          </Routes>
        </BrowserRouter>
      </div>
    </Provider>
  );
}

export default App;
