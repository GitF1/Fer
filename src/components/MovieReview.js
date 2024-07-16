import React, { useEffect, useState } from 'react'
import {useDispatch, useSelector} from 'react-redux'
import axios from 'axios'
import "../styles/Review.css"
import { setReviews, addReview, updateReview, deleteReview } from '../features/reviewSlice'
import { REVIEW_JSON_URL } from '../utils/contants'

export default function MovieReview(props) {

    const dispatch = useDispatch();
    // const movieId = props.movieId;
    const movieId = "1";
    const userId = localStorage.userId;

    // const state = useSelector(state => state);
    const reviews = useSelector(state => state.reviews.reviews);

    const [rate, setRate] = useState(-1);
    const [text, setText] = useState("");
    const [haveReviewed, setHaveReviewed] = useState(false);
    const [writingReview, setWritingReview] = useState(false);
    const [editingReview, setEditingReview] = useState(false);
    const [myReview, setMyReview] = useState(null);

    const [editingRate, setEditingRate] = useState(-1);
    const [editingText, setEditingText] = useState("");

    function rateMovie(star) {
        if(rate === -1 || star > rate) setRate(star);
        else setRate(-1);
    }

    function sendFeedback() {
        if(isValidReview()) {
            handleAddReview();
        }
        else alert("Hãy đánh giá phim và viết bình luận!");
    }

    function isValidReview() {
        return rate !== -1 && text !== '';
    }

    useEffect(() => {
        fetchReviews(movieId);
    }, [dispatch])

    const fetchReviews = async (movieId) => {
        console.log("Fetch Reviews!!!");
        try {
            const response = await axios.get(REVIEW_JSON_URL);
            const allReviews = response.data;
            let movieReviews = [];
            allReviews.map(review => {
                if(review.movieId === movieId){ 
                    movieReviews.push(review);
                    if(review.userId === userId) {
                        setHaveReviewed(true);
                        setMyReview(review);
                        setRate(review.rating);
                        setText(review.content);
                        setEditingRate(review.rating);
                        setEditingText(review.content);
                        // console.log(editingRate + ", " + editingText);
                    }
                }
            })
            dispatch(setReviews(movieReviews));
        } catch(error) {
            console.log("Error fetching data: " + error);
        }
    }

    const handleAddReview = async () => {
        let newReview = {
            id: (parseInt(reviews[reviews.length - 1].id) + 1).toString(),
            userId,
            movieId,
            rating: rate,
            timeCreated: getCurrentDateTime(),
            content: text
        }
        try {
            const response = await axios.post(REVIEW_JSON_URL, newReview);
            dispatch(addReview(response.data));
            setHaveReviewed(true);
            setWritingReview(false);
            setMyReview(response.data);
            setRate(response.data.rating);
            setText(response.data.content);
            setEditingRate(response.data.rating);
            setEditingText(response.data.content);
            // console.log(editingRate + ", " + editingText);
        } catch(error) {
            console.log("Error adding new review: " + error);
        }
    } 

    const handleUpdateReview = async () => {
        // console.log(editingRate + ", " + editingText);
        let updatedReview = {...myReview, 
            rating: editingRate,
            content: editingText,
            timeCreated: getCurrentDateTime()
        }
        try {
            const response = await axios.put(REVIEW_JSON_URL + `/${myReview.id}`, updatedReview);
            dispatch(updateReview(response.data));
            setEditingReview(false);
            setHaveReviewed(true);
            setMyReview(response.data);
            setRate(response.data.rating);
            setText(response.data.content);
            setEditingRate(response.data.rating);
            setEditingText(response.data.content);
        } catch(error) {
            console.log("Error updating review: " + error);
        }
    }

    const handleDeleteReview = async (id) => {
        try {
            await axios.delete(REVIEW_JSON_URL + `/${id}`).then(res => {
                dispatch(deleteReview(id));
                setRate(-1);
                setText("");
                setHaveReviewed(false);
                setWritingReview(false);
                setEditingReview(false);
                setMyReview(null);
                setEditingRate(-1);
                setEditingText("");
            })
        } catch(error) {
            console.log("Error deleting review: " + error);
        }
    }

    function writeReview() {
        setWritingReview(true);
    }

    function unwriteReview() {
        setWritingReview(false);
    }

    function watchReview() {
        setEditingReview(true);
    }

    function closeReview() {
        setEditingReview(false);
        setEditingRate(rate);
        setEditingText(text);
    }

    function editMovieRate(star) {
        if(editingRate === -1 || star > editingRate) setEditingRate(star);
        else setEditingRate(-1);
    }

    function getCurrentDateTime() {
        const currentDateTime = new Date();
        const formattedDateTime = currentDateTime.toLocaleDateString() + ' ' + currentDateTime.toLocaleTimeString();
        return formattedDateTime;
    }

    return (
        <div>
            <h2 className="review-heading" id="reviewMovieHeader">Bình luận từ người xem</h2>
            <div id="movie-rating-div">
                <img id="starImage${star}" src="assets/images/yellow_star_icon.png" alt="white star"/> <strong id="movie-rating-strong">8</strong> <div id="total-rating-div">/10, 20 đánh giá</div>
            </div>
            {!haveReviewed && !writingReview ? (<button id="write-review-button" onClick={writeReview}>Viết bình luận</button>) : null}

            {!haveReviewed && writingReview ? (
                <div>
                    <div className='rating-container'>
                        {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map(star => (
                            <button id={`starButton${star}`} className='button-star' type="button" onClick={() => rateMovie(star)}>
                                <img id={`starImage${star}`} src={star <= rate ? "assets/images/yellow_star_icon.png" : "assets/images/white_star_icon.png"}></img>
                            </button>
                        ))}
                    </div>
                    <div className='review-container-2'>
                        <textarea id="reviewTextArea" rows={5} required={true} onChange={(e) => setText(e.target.value)}></textarea>
                    </div>
                    <div className='submit-container'>
                        <button className='pinkButton' type="button" style={{marginRight: '20px'}} onClick={unwriteReview}> Hủy bình luận </button>
                        <button id="submitReviewMovieButton" className="pinkButton" type="button" onClick={() => sendFeedback()}>Gửi bình luận</button>
                    </div>
                </div>
            ) : null}

            {haveReviewed && !editingReview ? (
                <button id="write-review-button" onClick={watchReview}>Xem bình luận</button>
            ) : null}

            {haveReviewed && editingReview ? (
                <div>
                    <div className='rating-container'>
                        {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map(star => (
                            <button id={`starButton${star}`} className='button-star' type="button" onClick={() => editMovieRate(star)}>
                                <img id={`starImage${star}`} src={star <= editingRate ? "assets/images/yellow_star_icon.png" : "assets/images/white_star_icon.png"}></img>
                            </button>
                        ))}
                    </div>
                    <div className='review-container-2'>
                        <textarea id="reviewTextArea" rows={5} required={true} onChange={(e) => setEditingText(e.target.value)} placeholder={editingText}></textarea>
                    </div>
                    <div className='submit-container'>
                        <button className='pinkButton' type="button" style={{marginRight: '20px'}} onClick={closeReview}> Đóng bình luận </button>
                        <button className="pinkButton" type="button" style={{marginRight: '20px'}} onClick={() => handleUpdateReview()}>Sửa bình luận</button>
                        {/* <button className="pinkButton" type="button" onClick={() => handleDeleteReview(myReview.id)}>Xóa bình luận</button> */}
                    </div>
                </div>
            ) : null} 

            <div className="review-container" style={{marginBottom: '80px'}}>
                {reviews.map(review => (
                    <div style={{border: '1px solid gray', borderRadius: '12px', marginBottom: '20px'}}>
                        <div className='user-info' style={{marginLeft: '20px', marginTop: '20px'}}>
                            <div class="avatar">
                                <img src="assets/images/avatar.jpg" alt="Your Avatar"/>
                            </div>
                            <div className='user-name' style={{color: 'red'}}>{review.userId}</div>
                        </div>
                        <div id="movie-rating-div" style={{marginTop: '10px', marginLeft: '20px'}}>
                            <img src="assets/images/yellow_star_icon.png" alt="white star" style={{width: '25px'}}></img>
                            <strong id="total-rating-div">{review.rating}/10</strong>
                        </div>
                        <div className='comment' style={{marginLeft: '20px', marginBottom: '15px'}}>{review.content}</div>
                    </div>
                ))}
            </div>
        </div>
    )
}

const localStorage = {
    "userId" : "1"
};