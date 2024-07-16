import React from 'react';
import { Card, Row, Col, Container, Button } from 'react-bootstrap';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';
import { setCurrMovie, setMovies, setStatus } from '../features/movieSlice';
import { MOVIE_JSON_URL } from '../utils/contants';
import { useNavigate } from 'react-router-dom';

const MovieCard = ({ movie }) => {
  
  const usenavigate = useNavigate();
  const dispatch = useDispatch();
  const HandleDetailsClick = () => {
    dispatch(setCurrMovie(movie.id));
    console.log(`Navigating to details of movie ID: ${movie.id}`);
    usenavigate("/movie");
  };
  return(
    <Card style={{ width: '18rem' }}>
      <Card.Img variant="top" src={movie.url} alt={movie.title} />
      <Card.Body>
        <Card.Title>{movie.title}</Card.Title>
        <Card.Text>{movie.description}</Card.Text>
        <Button variant="primary" onClick={HandleDetailsClick}>Details</Button>
      </Card.Body>
    </Card>);
    
}




const MovieGrid = () => {
  const dispatch = useDispatch();
  const { movies } = useSelector((state) => state.movies);

  useEffect(() => {
    const fetchMovies = async () => {
      dispatch(setStatus('loading'));
      try {
        const response = await axios.get(MOVIE_JSON_URL);
        dispatch(setMovies(response.data));
        dispatch(setStatus('succeeded'));
      } catch (error) {
        dispatch(setStatus('failed'));
      };
    };
    fetchMovies();
  }, [dispatch]);

  const renderRows = () => {
    const rows = [];
    for (let i = 0; i < movies.length; i += 4) {
      rows.push(
        <Row key={i} className="mb-4">
          {movies.slice(i, i + 4).map(movie => (
            <Col key={movie.id}>
              <MovieCard movie={movie} />
            </Col>
          ))}
        </Row>
      );
    }
    return rows;
  };

  return (
    <Container>
      {renderRows()}
    </Container>
  );
};

export default MovieGrid;