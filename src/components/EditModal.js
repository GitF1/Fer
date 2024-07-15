import axios from 'axios';
import { useState } from 'react';
import { Form } from 'react-bootstrap';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';

function EditModal({ post, setListPostAfterEditPost }) {
    // modal part : 
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    // use useState to create edit post : 
    const [editPost, setEditPost] = useState(post)

    // fetch to edit post : 


    const editPostById = async (e) => {
        e.preventDefault()
        try {
            await axios.put(`http://localhost:8000/posts/${post.id}`, editPost);
            setListPostAfterEditPost(post.id, editPost)

        } catch (error) {
            console.error('Error updating book:', error);
        }
    };

    return (
        <>
            <Button variant="primary" onClick={handleShow}>
                Edit
            </Button>

            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Edit post</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form onSubmit={
                        (e) => {
                            editPostById(e)
                        }
                    }>
                        <Form.Group className='mt-4'>
                            <Form.Label>Description</Form.Label>
                            <Form.Control
                                value={editPost.description}
                                type='text'
                                required
                                onChange={
                                    (e) => {
                                        setEditPost(post => ({
                                            ...post,
                                            description: e.target.value
                                        }))
                                    }
                                }
                            />
                        </Form.Group>
                        <Form.Group className='mt-4'>
                            <Form.Label>Image</Form.Label>
                            <Form.Control
                                value={editPost.image_link}
                                type='text'
                                required
                                onChange={
                                    (e) => {
                                        setEditPost(post => ({
                                            ...post,
                                            image_link: e.target.value
                                        }))
                                    }
                                }
                            />
                        </Form.Group>
                        <Form.Group className='mt-4'>
                            <Form.Label>Video</Form.Label>
                            <Form.Control
                                value={editPost.video_link}
                                type='text'
                                required
                                onChange={
                                    (e) => {
                                        setEditPost(post => ({
                                            ...post,
                                            video_link: e.target.value
                                        }))
                                    }
                                }

                            />

                        </Form.Group>
                        <Modal.Footer>
                            <Button variant="secondary" onClick={handleClose}>
                                Close
                            </Button>
                            <Button
                                variant="primary"
                                type='submit'
                                onClick={
                                    () => {
                                        handleClose()
                                    }
                                }>
                                Edit
                            </Button>
                        </Modal.Footer>
                    </Form>
                </Modal.Body>

            </Modal>
        </>
    );
}

export default EditModal;