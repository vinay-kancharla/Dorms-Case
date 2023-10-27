import React, { useState } from 'react';
import { Button, Modal, Form } from 'react-bootstrap';
import StarRatings from 'react-star-ratings';


const DormPages = () => {

  const [show, setShow] = useState(false);
  const [rating, setRating] = useState(0);
  const [textReview, setTextReview] = useState('');

  const closeModal = () => setShow(false);
  const showModal = () => setShow(true);

  const handleRatingChange = (newRating) => {
    setRating(newRating);
  };

  const handleReviewTextChange = (e) => {
    setTextReview(e.target.value);
  };

  const submitReview = () => {
    closeModal();
  };

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
          <Button variant="success" onClick={submitReview}>
            Validate and Publish
          </Button>
        </Modal.Footer>
      </Modal>
     </div>

      <div style={barStyle1}></div>
      <div style={barStyle2}></div>
    </div>
  );
};

export default DormPages;
