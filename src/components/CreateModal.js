import axios from 'axios';
import { useState } from 'react';
import { Col, Form, InputGroup, Row } from 'react-bootstrap';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';

function CreateModal({ newPostId, setListPostAfterCreatePost }) {

    // modal part : 
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    // use useState to create newPost : 
    const [newPost, setNewPost] = useState({})

    // fetch to create new post : 
    const createNewPost = async (e) => {
        e.preventDefault()
        try {
            await axios.post('http://localhost:8000/posts', newPost);
            setListPostAfterCreatePost(newPost)

            console.log("add post success , post is : ",
                newPost
            );


        } catch (error) {
            console.error('Error adding post:', error);
        }
    };
    return (
        <>
            <Button variant="primary mb-4" onClick={handleShow}>
                Create Post
            </Button>

            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Create new Post</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form onSubmit={
                        (e) => {
                            createNewPost(e)
                            handleClose()
                        }
                    }>
                        <Form.Group className='mt-4'>
                            <Form.Label>Description</Form.Label>
                            <Form.Control
                                placeholder='Enter description..'
                                type='text'
                                required
                                onChange={
                                    (e) => {
                                        setNewPost(post => ({
                                            ...post,
                                            description: e.target.value,
                                            id: newPostId.toString(),
                                            time: new Date().toLocaleString()
                                        }))
                                    }
                                }
                            />
                        </Form.Group>
                        <Row>
                            <Col sm={6}>
                                <Form.Group className='mt-4'>
                                    <Form.Label>Image</Form.Label>
                                    <Form.Control
                                        placeholder='Enter link image..'
                                        type='text'
                                        onChange={
                                            (e) => {
                                                setNewPost(post => ({
                                                    ...post,
                                                    image_link: e.target.value,
                                                    image_url: ''
                                                }))
                                            }
                                        }
                                    />
                                </Form.Group>
                            </Col>
                            <Col sm={6}>
                                <Form.Group className='mt-4'>
                                    <Form.Label>OR</Form.Label>
                                    <Form.Control
                                        type='file'
                                        onChange={
                                            (e) => {
                                                const file = e.target.files[0]
                                                setNewPost(post => ({
                                                    ...post,
                                                    image_link: '',
                                                    image_url: URL.createObjectURL(file)
                                                }))
                                            }
                                        }
                                    />
                                </Form.Group>
                            </Col>
                        </Row>
                        <Form.Group className='mt-4'>
                            <Form.Label>Video</Form.Label>
                            <Form.Control
                                placeholder='Enter link video..'
                                type='text'
                                required
                                onChange={
                                    (e) => {
                                        setNewPost(post => ({
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
                            >
                                Create
                            </Button>
                        </Modal.Footer>
                    </Form>
                </Modal.Body>

            </Modal>
        </>
    );
}

export default CreateModal;