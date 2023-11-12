import React, { useState } from 'react';
import { Button, Modal, Form } from 'react-bootstrap';
import StarRatings from 'react-star-ratings';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableRow from '@mui/material/TableRow';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faThumbsUp, faThumbsDown } from '@fortawesome/free-solid-svg-icons';

const DormPages = () => {

  const [show, setShow] = useState(false);
  const [rating, setRating] = useState(0);
  const [textReview, setTextReview] = useState('');
  const[reviews, setReviews] = useState([]);

  const showModal = () => setShow(true);

  const handleRatingChange = (newRating) => {
    setRating(newRating);
  };

  const handleReviewTextChange = (e) => {
    setTextReview(e.target.value);
  };

  function clearInputs() {
    setRating(0);
    setTextReview('');
  }

  const closeModal = () => {
    setShow(false);
    clearInputs();
  }

  function reviewPosting(
    rating,
    textReview
  ) {
    return {rating, textReview};
  }

  function addAReview(review){
    setReviews((y) => y.concat([review]));
    setShow(false);
    clearInputs();
  }

  const containerStyle = {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    height: '100vh', 
  };

  const barStyle1 = {
    height: '10px',
    width: '70%', 
    backgroundColor: '#000000', 
    margin: '10px 0',
  };

  const barStyle2 = {
    height: '10px',
    width: '40%', 
    backgroundColor: '#000000',
    margin: '10px 0',
  };

  const buttonContainerStyle = {
    paddingRight:'100px',
    position: 'absolute',
    top: 100,
    right:20,
  };


  return (
    <div style={containerStyle}>
     <div style={buttonContainerStyle}><button className="btn btn-danger" onClick={showModal} >Add a Review</button> 
      <Modal show={show} onHide={closeModal}>
        <Modal.Body>
          <Form>
            <Form.Group controlId="rating">
              <Form.Label>Star Rating</Form.Label>
              <StarRatings
                rating={rating}
                starRatedColor="gold"
                changeRating={handleRatingChange}
                numberOfStars={5}
                starDimension="30px"
              />
            </Form.Group>
            <Form.Group controlId="textReview">
              <Form.Label>Review: </Form.Label>
              <Form.Control
                as="textarea"
                rows={4}
                value={textReview}
                onChange={handleReviewTextChange}
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="primary" onClick={closeModal}>
            Upload Image
          </Button>
          <Button variant="success" onClick={() =>
              addAReview(
                reviewPosting(
                  rating,
                  textReview
                )
              )
            }>
            Validate and Publish
          </Button>
        </Modal.Footer>
      </Modal>
     </div> 
      <div style={barStyle1}></div>
      <div style={barStyle2}></div>
      <br></br>

      <TableContainer>
      <Table>
        <TableBody>
        {reviews.map((review) => (
          <TableRow>
            <TableCell style={{ 
            fontSize: '22px', 
            width: '80%', 
            margin: '10px 130px', 
            borderBottom: '2px solid black', 
            border: '4px solid black', 
            display: 'flex', 
            flexDirection: 'column' 
          }}>
            <div style={{ display: 'flex', alignItems: 'center', marginBottom: '10px' }}>
              Rating: 
              <StarRatings
                rating={review.rating}
                starRatedColor="gold"
                numberOfStars={5}
                starDimension="30px"
                starSpacing="2px"
              /> 
            </div>
            Description: {review.textReview}
            <br></br>
            <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
              <FontAwesomeIcon icon={faThumbsUp} style={{ marginRight: '10px', cursor: 'pointer' }} />
              <FontAwesomeIcon icon={faThumbsDown} style={{ cursor: 'pointer' }} />
            </div>
            <div style={{ borderBottom: '2px solid black', flex: '2' }}></div>
            Images:
            </TableCell>
            <br></br>
          </TableRow>
))}
        </TableBody>
      </Table>
    </TableContainer>
    </div>
  );
};

export default DormPages;