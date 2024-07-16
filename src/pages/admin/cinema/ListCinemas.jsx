import React, { useEffect, useState } from "react";
import Table from "../../../components/UI/table/Table";
import { useNavigate } from "react-router-dom";
import Modal from "../../../components/UI/modal/Modal";
import { useDispatch, useSelector } from "react-redux";
import { deleteCinema, fetchCinemas } from "../../../features/cinemaSlice";

function ListCinemas() {
  const {
    cinemas: data,
    loading,
    error,
  } = useSelector((state) => state.cinema);
  const dispatch = useDispatch();

  const navigate = useNavigate();
  const [showModal, setShowModal] = useState(false);
  const [cinemaToDelete, setCinemaToDelete] = useState(null);

  const additionAttribute = [
    { name: "Edit", type: "button", action: (id) => handleEdit(id) },
    { name: "Delete", type: "button", action: (id) => confirmDelete(id) },
  ];

  const handleEdit = (id) => {
    navigate(`/cinema/update/${id}`);
  };

  const confirmDelete = (id) => {
    setCinemaToDelete(id);
    setShowModal(true);
  };

  const handleDelete = async () => {
    dispatch(deleteCinema(cinemaToDelete));

    navigate("/cinema/manage");
    setShowModal(false);
  };

  const closeModal = () => {
    setShowModal(false);
    setCinemaToDelete(null);
  };
  useEffect(() => {
    dispatch(fetchCinemas());
  }, []);
  return (
    <>
      <Table
        data={data}
        excepted={["bannerImage", "logo"]}
        additionalField={["action"]}
        additionAttribute={additionAttribute}
      />
      {showModal && (
        <Modal
          title="Confirm Deletion"
          onClose={closeModal}
          onConfirm={handleDelete}
        >
          Are you sure you want to delete this cinema?
        </Modal>
      )}
    </>
  );
}

export default ListCinemas;
