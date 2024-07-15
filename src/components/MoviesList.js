import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';
import { setMovies, addMovie, setStatus } from '../features/movieSlice';
import { Button, Table, Form, FormLabel } from 'react-bootstrap';




const MoviesList = () => {
    const [id, setID] = useState('');
    const [title, setTitle] = useState('');
    const [genre, setGenre] = useState('');
    const [year, setYear] = useState('');
    const dispatch = useDispatch();
    const { movies } = useSelector((state) => state.movies);

    useEffect(() => {
        const fetchMovies = async () => {
            dispatch(setStatus('loading'));
            try {
                const response = await axios.get('http://localhost:5000/movies');
                dispatch(setMovies(response.data));
                dispatch(setStatus('succeeded'));
            } catch (error) {
                dispatch(setStatus('failed'));
            };
        };
        fetchMovies();
    }, [dispatch]);

    const handleSubmit = async (e) => {
        e.preventDefault();

        const updatedMovie = {
            title,
            genre,
            year
        };

        await axios.put(`http://localhost:5000/movies/${id}`, updatedMovie);
        setTitle('');
        setGenre('');
        setYear('');
        try {
            const response = await axios.get('http://localhost:5000/movies');
            dispatch(setMovies(response.data));
            dispatch(setStatus('succeeded'));
        } catch (error) {
            dispatch(setStatus('failed'));
        };
    };
    const handleDelete = async (id) => {
        console.log(id);
        await axios.delete(`http://localhost:5000/movies/${id}`)
        try {
            const response = await axios.get('http://localhost:5000/movies');
            dispatch(setMovies(response.data));
            dispatch(setStatus('succeeded'));
        } catch (error) {
            dispatch(setStatus('failed'));
        };


    };

    return (
        <div>


            {/* edit form */}
            <Form onSubmit={handleSubmit} className="col-lg-6 mx-auto">
                <h3>Edit movie</h3>
                <div>
                    <Form.Control

                        placeholder="ID"
                        value={id}
                        onChange={(e) => setID(e.target.value)}
                        required
                        readOnly />
                    <Form.Label>Title:</Form.Label>
                    <Form.Control
                        type="text"
                        placeholder="title"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        required />
                    <Form.Label>Genre:</Form.Label>
                    <Form.Control
                        type="text"
                        placeholder="title"
                        value={genre}
                        onChange={(e) => setGenre(e.target.value)}
                        required />
                    <Form.Label>Year:</Form.Label>

                    <Form.Control
                        type="number"
                        placeholder="Year"
                        value={year}
                        onChange={(e) => setYear(e.target.value)}
                        required />

                </div>
                <br />
                <Button type="submit">Save</Button>

            </Form>




            <br /><br />

            <Table striped bordered >

                <thead>
                    <th>ID</th>
                    <th>Title</th>
                    <th>Genre</th>
                    <th>Year</th>
                    <th>Actions</th>
                </thead>
                <tbody>
                    {movies.map((movie) => (

                        <tr id={movie.id}>
                            <td>{movie.id}</td>
                            <td>{movie.title}</td>
                            <td>{movie.genre}</td>
                            <td>{movie.year}</td>
                            <td>
                                <Button className='btn btn-warning'
                                    onClick={() => {
                                        setID(movie.id);
                                        setTitle(movie.title);
                                        setGenre(movie.genre);
                                        setYear(movie.year);

                                    }}>Edit</Button>
                                {' '}
                                <Button className='btn btn-danger' onClick={() => handleDelete(movie.id)}>Delete</Button>
                            </td>

                        </tr>

                        // <Message user={message.senderId} message={message.text} time={message.timestamp} ></Message>
                    ))}
                </tbody>
            </Table>

        </div>
    );
}

export default MoviesList;