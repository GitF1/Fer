import axios from 'axios';
import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';

function DeleteModal({ id, setListPostAfterDeletePostById }) {
    // modal part : 
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    // delete function : 
    const deletePost = async (id) => {
        try {
            await axios.delete(`http://localhost:8000/posts/${id}`);
            setListPostAfterDeletePostById(id)

        } catch (error) {
            console.error('Error deleting post:', error);
        }
    };


    return (
        <>
            <Button variant="danger" className='ms-3' onClick={handleShow}>
                Delete
            </Button>

            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Confirm form</Modal.Title>
                </Modal.Header>
                <Modal.Body>Do you want to delete this post?</Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Close
                    </Button>
                    <Button variant="danger" onClick={
                        () => {
                            handleClose()
                            deletePost(id)
                        }
                    }>
                        Delete now
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    );
}

export default DeleteModal;