import { useEffect, useReducer, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import axios from "axios";

const initialState = {
  userlist: [],
  haveedit: false,
  haveview: false,
  haveadd: false,
  haveremove: false,
};

const reducer = (state, action) => {
  switch (action.type) {
    case "SET_USER_LIST":
      return { ...state, userlist: action.payload };
    case "SET_PERMISSIONS":
      return {
        ...state,
        haveedit: action.payload.haveedit,
        haveview: action.payload.haveview,
        haveadd: action.payload.haveadd,
        haveremove: action.payload.haveremove,
      };
    default:
      return state;
  }
};

const UserAccount = () => {
  const [state, dispatch] = useReducer(reducer, initialState);
  const { userlist, haveedit, haveview, haveadd, haveremove } = state;
  const [editingUser, setEditingUser] = useState(null); // State for the user being edited
  const [formValues, setFormValues] = useState({}); // State for form values
  const navigate = useNavigate();

  useEffect(() => {
    const userrole = sessionStorage.getItem("userrole") || "";
    if (userrole !== "admin") {
      navigate("/");
      toast.warning("You are not authorized to access");
      return;
    }

    GetUserAccess();
    loadusers();
  }, []);

  const loadusers = async () => {
    try {
      const response = await axios.get("http://localhost:8000/user");
      const filteredUsers = response.data.filter(
        (user) => user.role === "user"
      );
      dispatch({ type: "SET_USER_LIST", payload: filteredUsers });
    } catch (error) {
      console.error(error);
      toast.error("Failed to load users.");
    }
  };

  const GetUserAccess = () => {
    const userrole = sessionStorage.getItem("userrole") || "";
    fetch(`http://localhost:8000/roleaccess?role=${userrole}&menu=user`)
      .then((res) => {
        if (!res.ok) {
          throw new Error("Unauthorized");
        }
        return res.json();
      })
      .then((data) => {
        if (data.length > 0) {
          const userobj = data[0];
          dispatch({
            type: "SET_PERMISSIONS",
            payload: {
              haveedit: userobj.haveedit,
              haveview: true,
              haveadd: userobj.haveadd,
              haveremove: userobj.havedelete,
            },
          });
        } else {
          navigate("/");
          toast.warning("You are not authorized to access");
        }
      })
      .catch((error) => {
        console.error(error);
        navigate("/");
        toast.warning("You are not authorized to access");
      });
  };

  const handleedit = (user) => {
    if (haveedit) {
      setEditingUser(user);
      setFormValues(user);
    } else {
      toast.warning("You are not authorized to edit");
    }
  };

  const handleEditFormChange = (e) => {
    const { name, value } = e.target;
    setFormValues({
      ...formValues,
      [name]: value,
    });
  };

  const handleEditFormSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.put(
        `http://localhost:8000/user/${editingUser.id}`,
        formValues
      );
      loadusers();
      toast.success("User updated successfully");
      setEditingUser(null);
      setFormValues({});
    } catch (error) {
      console.error(error);
      toast.error("Failed to update user");
    }
  };

  const handleremove = async (id) => {
    if (haveremove) {
      try {
        await axios.delete(`http://localhost:8000/user/${id}`);
        loadusers(); // Reload users after deletion
        toast.success("Removed successfully");
      } catch (error) {
        console.error(error);
        toast.error("Failed to remove user");
      }
    } else {
      toast.warning("You are not authorized to remove");
    }
  };

  return (
    <div className="container">
      <div className="card">
        <div className="card-header">
          <h3>User Account Listing</h3>
        </div>
        <div className="card-body">
          <br></br>
          <table className="table table-bordered">
            <thead className="bg-dark text-white">
              <tr>
                <th>Name</th>
                <th>Email</th>
                <th>Phone</th>
                <th>Country</th>
                <th>Address</th>
                <th>Gender</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {userlist &&
                userlist.map((item) => (
                  <tr key={item.id}>
                    <td>{item.name}</td>
                    <td>{item.email}</td>
                    <td>{item.phone}</td>
                    <td>{item.country}</td>
                    <td>{item.address}</td>
                    <td>{item.gender}</td>
                    <td>
                      <button
                        onClick={() => handleedit(item)}
                        className="btn btn-primary"
                      >
                        Edit
                      </button>{" "}
                      |
                      <button
                        onClick={() => handleremove(item.id)}
                        className="btn btn-danger"
                      >
                        Remove
                      </button>
                    </td>
                  </tr>
                ))}
            </tbody>
          </table>

          {editingUser && (
            <div className="edit-form">
              <h3>Edit User</h3>
              <form onSubmit={handleEditFormSubmit}>
                <div className="form-group">
                  <label>Full Name</label>
                  <input
                    name="name"
                    value={formValues.name}
                    onChange={handleEditFormChange}
                    className="form-control"
                  />
                </div>
                <div className="form-group">
                  <label>Email</label>
                  <input
                    name="email"
                    value={formValues.email}
                    onChange={handleEditFormChange}
                    className="form-control"
                  />
                </div>
                <div className="form-group">
                  <label>Phone</label>
                  <input
                    name="phone"
                    value={formValues.phone}
                    onChange={handleEditFormChange}
                    className="form-control"
                  />
                </div>
                <div className="form-group">
                  <label>Country</label>
                  <select
                    name="country"
                    value={formValues.country}
                    onChange={handleEditFormChange}
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
                <div className="form-group">
                  <label>Address</label>
                  <textarea
                    name="address"
                    value={formValues.address}
                    onChange={handleEditFormChange}
                    className="form-control"
                  ></textarea>
                </div>
                <div className="form-group">
                  <label>Gender</label>
                  <br />
                  <input
                    type="radio"
                    name="gender"
                    value="male"
                    checked={formValues.gender === "male"}
                    onChange={handleEditFormChange}
                  />
                  <label>Male</label>
                  <input
                    type="radio"
                    name="gender"
                    value="female"
                    checked={formValues.gender === "female"}
                    onChange={handleEditFormChange}
                  />
                  <label>Female</label>
                </div>
                <button type="submit" className="btn btn-primary">
                  Save
                </button>
                <button
                  type="button"
                  onClick={() => setEditingUser(null)}
                  className="btn btn-secondary"
                >
                  Cancel
                </button>
              </form>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default UserAccount;
