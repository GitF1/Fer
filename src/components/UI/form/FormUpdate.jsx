import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";
import useFetch from "../../hooks/useFetch";
import { API } from "../../util/api";

const UpdateProject = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [formData, setFormData] = useState(null);

  // Configuration object for form fields
  const fieldConfig = {
    1: { required: true, readOnly: true, type: "text" },
    2: { required: true, readOnly: false, type: "text" },
    3: { required: false, readOnly: false, type: "text" },
    4: { required: true, readOnly: false, type: "text" },
  };

  const [data, isLoading, error] = useFetch(API.patients + "/" + id);

  useEffect(() => {
    console.log(data);
    if (data) {
      setFormData(data);
    }
  }, [data, isLoading]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.put(`${API.patients}/${id}`, formData);
      navigate("/");
    } catch (error) {
      console.error("Error updating the project:", error);
    }
  };

  if (isLoading) return <div>Loading...</div>;
  if (error) throw new Error(error);
  return (
    <div className="container mt-4">
      <h2>Update Project</h2>
      <form>
        {formData &&
          Object.keys(formData).map((key, i) => (
            <div className="form-group" key={key}>
              <label htmlFor={key}>
                {key.charAt(0).toUpperCase() + key.slice(1)}
              </label>
              {fieldConfig[i + 1]?.type === "textarea" ? (
                <textarea
                  className="form-control mt-3 mb-3"
                  id={key}
                  name={key}
                  value={formData[key]}
                  onChange={handleChange}
                  required={fieldConfig[i + 1]?.required}
                  readOnly={fieldConfig[i + 1]?.readOnly}
                />
              ) : (
                <input
                  type={fieldConfig[i + 1]?.type || "text"}
                  className="form-control mt-3 mb-3"
                  id={key}
                  name={key}
                  value={formData[key]}
                  onChange={handleChange}
                  required={fieldConfig[i + 1]?.required}
                  readOnly={fieldConfig[i + 1]?.readOnly}
                />
              )}
            </div>
          ))}
        <button
          onClick={handleSubmit}
          type="submit"
          className="btn btn-primary"
        >
          Update Project
        </button>
      </form>
    </div>
  );
};

export default UpdateProject;
