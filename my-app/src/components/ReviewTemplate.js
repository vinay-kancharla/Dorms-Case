import React from 'react';

const ReviewTemplate = ({ rating, reviewText, dormPicture }) => {
    return (
      <div className="review">
        <div className="star-rating">
          Dorm Rating: {rating}/5
        </div>
        <p className="review-text">
            Review: {reviewText}
        </p>
        <img src={dormImage} className="dorm-picture" >
          Images of the Dorm:
        </img>
      </div>
    );
  };
  
  export default ReviewTemplate;