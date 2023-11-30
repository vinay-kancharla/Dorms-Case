const RatingDisplay = ({ rating, maxRating }) => {
    return (
      <div className="rating-container">
        
        <span className="rating-number">{rating}</span>
        <span className="rating-max"> / {maxRating}</span>
      </div>
    );
  };
  
  export default RatingDisplay;
  