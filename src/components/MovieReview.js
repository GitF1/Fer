import React, { useEffect, useState } from 'react'
import {useDispatch, useSelector} from 'react-redux'
import axios from 'axios'
import "../styles/Review.css"
import { setReviews } from '../features/reviewSlice'

export default function MovieReview() {

    const dispatch = useDispatch();
    const movieId = "1";
    const userId = "1";

    const state = useSelector(state => state);
    const reviews = state.reviews.reviews;

    const [rate, setRate] = useState(-1);
    const [text, setText] = useState("");
    const [haveCommented, setHaveCommented] = useState(false);

    function rateMovie(star) {
        if(rate === -1 || star > rate) setRate(star);
        else setRate(-1);
    }

    function sendFeedback() {
        console.log(isValidReview());
    }

    function isValidReview() {
        return rate !== -1 && text !== '';
    }

    const fetchReviews = async (movieId) => {
        try {
            const response = await axios.get(`http://localhost:3000/reviews`);
            const allReviews = response.data;
            let movieReviews = [];
            allReviews.map(review => {
                if(review.movieId === movieId) movieReviews.push(review);
                if(review.userId === userId) setHaveCommented(true);
            })
            dispatch(setReviews(movieReviews));
        } catch(error) {
            console.log("Error fetching data: " + error);
        }
    }

    useEffect(() => {
        fetchReviews(movieId);
    }, [dispatch])

    return (
        <div>
            <h2 className="review-heading" id="reviewMovieHeader">Bình luận từ người xem</h2>
            <div id="movie-rating-div">
                <img id="starImage${star}" src="assets/images/yellow_star_icon.png" alt="white star"/> <strong id="movie-rating-strong">8</strong> <div id="total-rating-div">/10, 20 đánh giá</div>
            </div>
            {false ? (<p>Không có review nào</p>) : 
                (
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
                            <button id="submitReviewMovieButton" type="button" onClick={() => sendFeedback()}>Gửi đánh giá</button>
                        </div>
                    </div>
                )
            }
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