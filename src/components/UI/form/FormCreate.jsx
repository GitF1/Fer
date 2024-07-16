import React, { useState } from "react";
import { useNavigate } from "react-router";
import PropTypes from "prop-types";

const FormCreate = ({ fields, onSubmit, backUrl, title, submitTitle }) => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const rs = onSubmit(formData);
    if (!rs) return;
    setFormData({});
    if (backUrl) {
      navigate(backUrl);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>{title ?? ""}</h2>
      {fields.map((field) => (
        <div key={field.name} className="mb-3">
          <label htmlFor={field.name} className="form-label">
            {field.label || field.name}
          </label>
          {field.type === "textarea" ? (
            <textarea
              className="form-control"
              id={field.name}
              name={field.name}
              required={field.isRequired}
              readOnly={field.isReadOnly}
              value={formData[field.name] || ""}
              onChange={handleChange}
            />
          ) : (
            <input
              type={field.type}
              className="form-control"
              id={field.name}
              name={field.name}
              required={field.isRequired}
              readOnly={field.isReadOnly}
              value={formData[field.name] || ""}
              onChange={handleChange}
            />
          )}
        </div>
      ))}
      <button type="submit" className="btn btn-primary">
        {submitTitle ?? "Submit"}
      </button>
    </form>
  );
};

export default FormCreate;

FormCreate.propTypes = {
  fields: PropTypes.shape({
    name: PropTypes.string.isRequired,
    label: PropTypes.string.isRequired,
    type: PropTypes.string,
    isReadOnly: PropTypes.bool,
    isRequired: PropTypes.bool,
  }).isRequired,

  onSubmit: PropTypes.func.isRequired,
  //ackUrl: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
};
