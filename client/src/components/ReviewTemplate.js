import React from 'react';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faThumbsUp, faThumbsDown } from "@fortawesome/free-solid-svg-icons";
const ReviewTemplate = ({ rating, reviewText, dormPicture,likes, dislikes}) => {
    return (
      <div className="review">
        <div className="star-rating">
          Dorm Rating: {rating}/5
        </div>
        <p className="review-text">
            Review: {reviewText}
        </p>
        <FontAwesomeIcon icon={likes} />
        {/* <img src={dormPicture} className="dorm-picture" /> */}
        <div class = "likes-and-dislikes">
          <div>
            {likes} <FontAwesomeIcon icon={faThumbsUp} />
            {dislikes} <FontAwesomeIcon icon={faThumbsDown} />
          </div>
        </div>
      </div>
    );
  };
  
  export default ReviewTemplate;