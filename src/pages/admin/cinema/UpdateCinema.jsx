import { useNavigate, useParams } from "react-router-dom";
import useFetch from "../../../hooks/useFetch";
import { API } from "../../../utils/api";
import FormUpdate from "../../../components/UI/form/FormUpdate";
import { useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";

function UdpateCinema() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [formData, setFormData] = useState();

  const [data, isLoading, error] = useFetch(`${API.CINEMA}/${id}`);

  console.log({ data, id });

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(formData);

    try {
      const res = await axios.put(`${API.CINEMA}/${id}`, formData);
      console.log(res);
      if (res && res.status === 200) {
        toast("Success");
      }
    } catch (error) {
      console.error("Error updating the project:", error);
    }
  };

  const fieldConfig = {
    1: { required: true, readOnly: true, type: "text" },
    2: { required: true, readOnly: false, type: "text" },
    3: { required: false, readOnly: false, type: "text" },
    4: { required: true, readOnly: false, type: "text" },
    5: { required: true, readOnly: false, type: "text" },
    6: { required: true, readOnly: false, type: "text" },
    7: { required: true, readOnly: false, type: "text" },
    8: { required: true, readOnly: true, type: "link" },
    9: { required: true, readOnly: false, type: "link" },
    10: { required: false, readOnly: true, type: "text" },
    11: { required: true, readOnly: true, type: "text" },
    12: { required: true, readOnly: false, type: "text" },
  };

  return (
    <>
      <FormUpdate
        titleSubmit={"Save"}
        data={data}
        isLoading={isLoading}
        fieldConfig={fieldConfig}
        error={error}
        handleSubmit={handleSubmit}
        formData={formData}
        setFormData={setFormData}
      />
    </>
  );
}

export default UdpateCinema;
