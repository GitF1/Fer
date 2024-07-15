import axios from "axios"
import { useEffect, useState } from "react"
import { Button, Col, Container, Row, Table } from "react-bootstrap"
import DeleteModal from "./DeleteModal"
import ImageModal from './ImageModal'
import VideoModal from './VideoModal'
import CreateModal from './CreateModal'
import EditModal from "./EditModal"

const Post = () => {

    // use useState to set list posts : 
    const [listPosts, setListPosts] = useState()

    // use useEffect to fetch list posts : 
    useEffect(
        () => {
            fetchPosts()
        }
        , []
    )

    // fetch function : 
    const fetchPosts = async () => {
        try {
            const response = await axios.get('http://localhost:9999/posts');
            setListPosts(response.data)
            console.log('fetch list posts success : ', response.data);
        } catch (error) {
            console.error('Error fetching books:', error);
        }
    };
    // setListPostAfterDeletePostById function : 
    const setListPostAfterDeletePostById = (id) => {
        const newList = listPosts.filter(p => (
            p.id !== id
        ))
        setListPosts(newList)
    }
    // setListPostAfterCreatePost function : 
    const setListPostAfterCreatePost = (newPost) => {
        setListPosts(list => (
            [
                ...list,
                newPost
            ]
        ))
    }
    //setListPostAfterEditPost function : 
    const setListPostAfterEditPost = (id, editPost) => {


        const newList = listPosts.map(p => {
            if (p.id !== id) {
                return p
            } else {
                return editPost
            }
        })
        setListPosts(newList)
    }


    return (
        <Container>
            {/* heading :  */}
            <h2 className="text-center my-4">Post Management</h2>
            <Row className="justify-content-center">
                <Col sm={3} className="d-flex justify-content-center">
                    <CreateModal newPostId={listPosts ? (listPosts.length + 1) : 99} setListPostAfterCreatePost={setListPostAfterCreatePost} />
                </Col>
            </Row>
            {/* list posts :  */}
            <Row className="justify-content-center text-center ">
                <Col sm={12}>
                    <Table striped bordered hover>
                        <thead>
                            <tr>
                                <th>ID</th>
                                <th>Time</th>
                                <th>Description</th>
                                <th>Image</th>
                                <th>Video</th>
                                <th>Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {listPosts && listPosts.map((post, index) => (
                                <tr key={index}>
                                    <td>{post.id}</td>
                                    <td>{post.time}</td>
                                    <td>{post.description}</td>
                                    <td>
                                        <ImageModal image_link={post.image_link} />
                                    </td>
                                    <td>
                                        <VideoModal video_link={post.video_link} />
                                    </td>
                                    <td>
                                        <EditModal post={post}  setListPostAfterEditPost={setListPostAfterEditPost}/>
                                        <DeleteModal id={post.id} setListPostAfterDeletePostById={setListPostAfterDeletePostById} />
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </Table>
                </Col>
            </Row>
        </Container>
    )
}

export default Post 
