import React from 'react';
import { Card, Container, Row, Col } from 'react-bootstrap';
import { useParams } from 'react-router-dom';

import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';
import { setMovies, addMovie, setStatus } from '../features/movieSlice';
import { MOVIE_JSON_URL } from '../utils/contants';
import { useNavigate } from 'react-router-dom';




const MovieDetails = () => {
    
   
    const dispatch = useDispatch();
    const movieId = useSelector((state) => state.movies.currMovie);
    const { movies } = useSelector((state) => state.movies);
    const [currMovieInfo, setCurrMovieInfo] = useState({
        "title": "",
        "genre": "",
        "url": "",
        "year": 0,
        "id": "0"
    }
    );


    useEffect(() => {
        const fetchMovies = async () => {
            dispatch(setStatus('loading'));
            try {
                const response = await axios.get(MOVIE_JSON_URL);
                dispatch(setMovies(response.data));
                console.log(response.data);
                dispatch(setStatus('succeeded'));
            } catch (error) {
                dispatch(setStatus('failed'));
            };
        };
        fetchMovies();
    }, [dispatch]);


    useEffect(() => {
        if (movies.length > 0) {
            const foundMovie = movies.find((movie) => movie.id === movieId);
            setCurrMovieInfo(foundMovie);
        }
    }, [movies, movieId]);
    return (
        <Container className="mt-4">
            <Row className="justify-content-center">
                <Col md={6}>
                    <Card>
                        <Card.Img variant="top" src={currMovieInfo.url} alt={currMovieInfo.title} />
                        <Card.Body>
                            <Card.Title>{currMovieInfo.title}</Card.Title>
                            <Card.Text>
                                <strong>Genre:</strong> {currMovieInfo.genre}
                            </Card.Text>
                            <Card.Text>
                                <strong>Year:</strong> {currMovieInfo.year}
                            </Card.Text>
                        </Card.Body>
                    </Card>
                </Col>
            </Row>
        </Container>
    );
}

export default MovieDetails;