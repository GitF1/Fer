import React, { useState } from 'react';
import { Form, Button, Container } from 'react-bootstrap';
import { useDispatch } from 'react-redux';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';
import { addMovie,setMovies } from '../features/movieSlice';


function MovieForm() {
    const [title, setTitle] = useState('');
    const [genre, setGenre] = useState('');
    const [year, setYear] = useState('');
    const dispatch = useDispatch();
    const handleSubmit = async (e) => {
        e.preventDefault();

        const newMovie = {
            title,
            genre,
            year
        };
        await axios.post(`http://localhost:5000/movies`, newMovie);
        // dispatch(addMovie(newMovie));
        const response = await axios.get('http://localhost:5000/movies');
            dispatch(setMovies(response.data));
        setTitle('');
        setGenre('');
        setYear('');



    };
    return (
        <Container>
            <Form onSubmit={handleSubmit} className="col-lg-6 mx-auto">
                <Form.Group controlId="formTitle">
                    <Form.Label>Title</Form.Label>
                    <Form.Control
                        type="text"
                        name="title"
                        value={title}
                        onChange={(e)=>setTitle(e.target.value)}
                        placeholder="Enter movie title"
                    />
                </Form.Group>

                <Form.Group controlId="formGenre">
                    <Form.Label>Genre</Form.Label>
                    <Form.Control
                        type="text"
                        name="genre"
                        value ={genre}
        
                        onChange={(e)=>setGenre(e.target.value)}
                        placeholder="Enter movie genre"
                    />
                </Form.Group>

                <Form.Group controlId="formYear">
                    <Form.Label>Year</Form.Label>
                    <Form.Control
                        type="number"
                        name="year"
                        value={year}
                        onChange={(e)=>setYear(e.target.value)}
                        placeholder="Enter movie year"
                    />
                </Form.Group>
                <Form.Group>
                    <br/>
                    <Button variant="primary" type="submit">
                        Submit
                    </Button>
                </Form.Group>
            </Form>
        </Container>
    );
}

export default MovieForm;