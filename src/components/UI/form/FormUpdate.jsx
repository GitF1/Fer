import React, { useEffect, useState } from "react";

import "bootstrap/dist/css/bootstrap.min.css";

const UpdateProject = ({
  title,

  data,
  formData,
  setFormData,
  isLoading,
  error,
  handleSubmit,
  fieldConfig,
  titleSubmit,
}) => {
  useEffect(() => {
    console.log(data);
    if (data) {
      setFormData(data);
    }
  }, [data]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  if (isLoading) return <div>Loading...</div>;
  if (error) throw new Error(error);
  return (
    <div className="container mt-4">
      <h2>{title}</h2>
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
          {titleSubmit}
        </button>
      </form>
    </div>
  );
};

export default UpdateProject;
