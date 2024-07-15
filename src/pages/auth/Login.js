import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import "bootstrap/dist/css/bootstrap.min.css";
import "./Login.css"; // Add a custom CSS file for additional styling

const Login = () => {
  const [username, usernameupdate] = useState("");
  const [password, passwordupdate] = useState("");

  const usenavigate = useNavigate();

  useEffect(() => {
    sessionStorage.clear();
  }, []);

  const ProceedLogin = (e) => {
    e.preventDefault();
    if (validate()) {
      fetch("http://localhost:8000/user/" + username)
        .then((res) => {
          return res.json();
        })
        .then((resp) => {
          if (Object.keys(resp).length === 0) {
            toast.error("Please Enter valid username");
          } else {
            if (resp.password === password) {
              toast.success("Success");
              sessionStorage.setItem("username", username);
              sessionStorage.setItem("userrole", resp.role);
              usenavigate("/");
            } else {
              toast.error("Please Enter valid credentials");
            }
          }
        })
        .catch((err) => {
          toast.error("Login Failed due to :" + err.message);
        });
    }
  };

  const ProceedLoginusingAPI = (e) => {
    e.preventDefault();
    if (validate()) {
      let inputobj = { username: username, password: password };
      fetch("https://localhost:44308/User/Authenticate", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify(inputobj),
      })
        .then((res) => {
          return res.json();
        })
        .then((resp) => {
          if (Object.keys(resp).length === 0) {
            toast.error("Login failed, invalid credentials");
          } else {
            toast.success("Success");
            sessionStorage.setItem("username", username);
            sessionStorage.setItem("jwttoken", resp.jwtToken);
            usenavigate("/");
          }
        })
        .catch((err) => {
          toast.error("Login Failed due to :" + err.message);
        });
    }
  };

  const validate = () => {
    let result = true;
    if (username === "" || username === null) {
      result = false;
      toast.warning("Please Enter Username");
    }
    if (password === "" || password === null) {
      result = false;
      toast.warning("Please Enter Password");
    }
    return result;
  };

  return (
    <div className="d-flex align-items-center justify-content-center vh-100">
      <div
        className="card shadow-lg p-3 mb-5 bg-white rounded"
        style={{ width: "400px" }}
      >
        <div className="card-header text-center">
          <h2>Login</h2>
        </div>
        <div className="card-body">
          <form onSubmit={ProceedLogin}>
            <div className="form-group mb-3">
              <label>
                User Name <span className="text-danger">*</span>
              </label>
              <input
                value={username}
                onChange={(e) => usernameupdate(e.target.value)}
                className="form-control"
                placeholder="Enter username"
              />
            </div>
            <div className="form-group mb-3">
              <label>
                Password <span className="text-danger">*</span>
              </label>
              <input
                type="password"
                value={password}
                onChange={(e) => passwordupdate(e.target.value)}
                className="form-control"
                placeholder="Enter password"
              />
            </div>
            <div className="d-grid gap-2">
              <button type="submit" className="btn btn-primary btn-block">
                Login
              </button>
              <Link className="btn btn-success btn-block" to={"/register"}>
                Register
              </Link>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
