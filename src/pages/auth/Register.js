import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import "bootstrap/dist/css/bootstrap.min.css";
import "./Register.css"; // Custom CSS for additional styling

const Register = () => {
  const [id, idchange] = useState("");
  const [name, namechange] = useState("");
  const [password, passwordchange] = useState("");
  const [email, emailchange] = useState("");
  const [phone, phonechange] = useState("");
  const [country, countrychange] = useState("india");
  const [address, addresschange] = useState("");
  const [gender, genderchange] = useState("female");

  const navigate = useNavigate();

  const IsValidate = () => {
    let isproceed = true;
    let errormessage = "Please enter the value in ";
    if (id === null || id === "") {
      isproceed = false;
      errormessage += " Username";
    }
    if (name === null || name === "") {
      isproceed = false;
      errormessage += " Fullname";
    }
    if (password === null || password === "") {
      isproceed = false;
      errormessage += " Password";
    }
    if (email === null || email === "") {
      isproceed = false;
      errormessage += " Email";
    }

    if (!isproceed) {
      toast.warning(errormessage);
    } else {
      if (/^[a-zA-Z0-9]+@[a-zA-Z0-9]+\.[A-Za-z]+$/.test(email)) {
      } else {
        isproceed = false;
        toast.warning("Please enter the valid email");
      }
    }
    return isproceed;
  };

  const handlesubmit = (e) => {
    e.preventDefault();
    let regobj = {
      id,
      name,
      password,
      email,
      phone,
      country,
      address,
      gender,
      role: "user",
    };
    if (IsValidate()) {
      fetch("http://localhost:8000/user", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify(regobj),
      })
        .then((res) => {
          toast.success("Registered successfully.");
          navigate("/login");
        })
        .catch((err) => {
          toast.error("Failed :" + err.message);
        });
    }
  };

  return (
    <div className="d-flex align-items-center justify-content-center vh-100">
      <div
        className="card shadow-lg p-3 mb-5 bg-white rounded"
        style={{ width: "600px" }}
      >
        <div className="card-header text-center">
          <h1>User Registration</h1>
        </div>
        <div className="card-body">
          <form onSubmit={handlesubmit}>
            <div className="row">
              <div className="col-lg-6 mb-3">
                <div className="form-group">
                  <label>
                    User Name <span className="text-danger">*</span>
                  </label>
                  <input
                    value={id}
                    onChange={(e) => idchange(e.target.value)}
                    className="form-control"
                    placeholder="Enter username"
                  />
                </div>
              </div>
              <div className="col-lg-6 mb-3">
                <div className="form-group">
                  <label>
                    Password <span className="text-danger">*</span>
                  </label>
                  <input
                    value={password}
                    onChange={(e) => passwordchange(e.target.value)}
                    type="password"
                    className="form-control"
                    placeholder="Enter password"
                  />
                </div>
              </div>
              <div className="col-lg-6 mb-3">
                <div className="form-group">
                  <label>
                    Full Name <span className="text-danger">*</span>
                  </label>
                  <input
                    value={name}
                    onChange={(e) => namechange(e.target.value)}
                    className="form-control"
                    placeholder="Enter full name"
                  />
                </div>
              </div>
              <div className="col-lg-6 mb-3">
                <div className="form-group">
                  <label>
                    Email <span className="text-danger">*</span>
                  </label>
                  <input
                    value={email}
                    onChange={(e) => emailchange(e.target.value)}
                    className="form-control"
                    placeholder="Enter email"
                  />
                </div>
              </div>
              <div className="col-lg-6 mb-3">
                <div className="form-group">
                  <label>Phone</label>
                  <input
                    value={phone}
                    onChange={(e) => phonechange(e.target.value)}
                    className="form-control"
                    placeholder="Enter phone number"
                  />
                </div>
              </div>
              <div className="col-lg-6 mb-3">
                <div className="form-group">
                  <label>
                    Country <span className="text-danger">*</span>
                  </label>
                  <select
                    value={country}
                    onChange={(e) => countrychange(e.target.value)}
                    className="form-control"
                  >
                    <option value="india">India</option>
                    <option value="usa">USA</option>
                    <option value="singapore">Singapore</option>
                    <option value="vietnam">Vietnam</option>
                    <option value="thailand">Thailand</option>
                    <option value="malaysia">Malaysia</option>
                    <option value="philippines">Philippines</option>
                    <option value="indonesia">Indonesia</option>
                    <option value="myanmar">Myanmar</option>
                    <option value="cambodia">Cambodia</option>
                    <option value="laos">Laos</option>
                    <option value="brunei">Brunei</option>
                    <option value="timor-leste">Timor-Leste</option>
                  </select>
                </div>
              </div>
              <div className="col-lg-12 mb-3">
                <div className="form-group">
                  <label>Address</label>
                  <textarea
                    value={address}
                    onChange={(e) => addresschange(e.target.value)}
                    className="form-control"
                    placeholder="Enter address"
                  ></textarea>
                </div>
              </div>
              <div className="col-lg-6 mb-3">
                <div className="form-group">
                  <label>Gender</label>
                  <div>
                    <input
                      type="radio"
                      checked={gender === "male"}
                      onChange={(e) => genderchange(e.target.value)}
                      name="gender"
                      value="male"
                      className="form-check-input"
                    />
                    <label className="form-check-label">Male</label>
                    <input
                      type="radio"
                      checked={gender === "female"}
                      onChange={(e) => genderchange(e.target.value)}
                      name="gender"
                      value="female"
                      className="form-check-input ms-3"
                    />
                    <label className="form-check-label">Female</label>
                  </div>
                </div>
              </div>
            </div>
            <div className="d-grid gap-2">
              <button type="submit" className="btn btn-primary">
                Register
              </button>
              <Link to={"/login"} className="btn btn-danger">
                Close
              </Link>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Register;
