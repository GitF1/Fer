import axios from "axios";
import FormCreate from "../../../components/UI/form/FormCreate";
import { API } from "../../../utils/api";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

function RegisterCinema() {
  const fields = [
    {
      name: "name",
      type: "text",
      isRequired: true,
      isReadOnly: false,
      label: "Name",
    },
    {
      name: "desciption",
      type: "text",
      isRequired: true,
      isReadOnly: false,
      label: "Description",
    },
    {
      name: "address",
      type: "text",
      isRequired: true,
      isReadOnly: false,
      label: "Address",
    },
    {
      name: "province",
      type: "text",
      isRequired: true,
      isReadOnly: false,
      label: "Province",
    },
    {
      name: "district",
      type: "text",
      isRequired: true,
      isReadOnly: false,
      label: "District",
    },
    {
      name: "commune",
      type: "text",
      isRequired: true,
      isReadOnly: false,
      label: "Commune",
    },
    {
      name: "bannerImage",
      type: "link",
      isRequired: false,
      isReadOnly: false,
      label: "Banner Image",
    },
    {
      name: "logo",
      type: "link",
      isRequired: false,
      isReadOnly: false,
      label: "Logo",
    },
  ];
  const naviagte = useNavigate();

  const handleSubmit = async (formData) => {
    const data = {
      ...formData,
      reviews: 0,
      rating: 0,
      location: `${formData?.address}, ${formData?.province}, ${formData?.district}, ${formData?.commune}`,
    };
    console.log({ data });
    const res = await axios.post(API.CINEMA, data);
    console.log(res);
    if (res && res.status === 201) {
      naviagte("/cinema/manage");
      toast("Success");
    }
  };

  return (
    <div className="container">
      <FormCreate fields={fields} onSubmit={handleSubmit} />
    </div>
  );
}

export default RegisterCinema;
