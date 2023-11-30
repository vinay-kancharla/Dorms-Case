import React, { useEffect, useState } from "react";
import { Button, Modal, Form } from "react-bootstrap";
import StarRatings from "react-star-ratings";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableRow from "@mui/material/TableRow";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faThumbsUp, faThumbsDown } from "@fortawesome/free-solid-svg-icons";
import "./components.css";
import { useUser } from "../UserContext";
import { toast } from "react-toastify";


const DormPages = ({ dormId }) => {
	const [show, setShow] = useState(false);
	const [rating, setRating] = useState(0);
	const [textReview, setTextReview] = useState("");
	const [reviews, setReviews] = useState([]);
	const [chooseImage, setChooseImage] = useState(null);
	const { user, setUser } = useUser();
	async function getReviews() {
		try {
			const response = await fetch(
				`http://localhost:8080/api/review/getAllReviews?dormName=${dormId}`
			);
			let reviewsData = await response.json();

			// Check for null user object
			// if (user) {
			// 	// Add 'userLiked' and 'userDisliked' properties to each review
			// 	reviewsData = reviewsData.map((review) => ({
			// 		...review,
			// 		userLiked: user.LikedReviews.includes(review.id),
			// 		userDisliked: user.DislikedReviews.includes(review.id),
			// 	}));
			// }

			setReviews(reviewsData);
		} catch (error) {
			console.log("Error: ", error);
		}
	}


	useEffect(() => {

		getReviews();

	}, [dormId]); // Make sure to include useUser in the dependency array if it uses any state or props


	const showModal = () => {
		if(user){
			setShow(true);
		}else {
			toast.error("Not loggged in!")
		}
	}
	const handleRatingChange = (newRating) => {
		setRating(newRating);
	};

	const handleReviewTextChange = (e) => {
		setTextReview(e.target.value);
	};

	const likeClicked = async (index) => {
		let flag_disliked = false;
		if (user && user.UUID !== "") {
			// check to see if in disliked
			for (let i = 0; i < user.dislikedReviews.length; i++) {
				if (user.dislikedReviews[i] === reviews[index]) {
					flag_disliked = true;
				}
			}

			if (flag_disliked === true) {
				return;
			}

			const url = "http://localhost:8080/api/review/liked";
			const requestBody = {
				userUUID: user.UUID,
				reviewId: reviews[index].reviewId,
			};

			try {
				const response = await fetch(url, {
					method: "POST",
					headers: {
						"Content-Type": "application/json",
					},
					body: JSON.stringify(requestBody),
				});

				if (!response.ok) {
					console.log("Not ok push");
					return;
				} else {
					const responseData = await response.json();
					console.log("Response from the server:", responseData);
					setUser((prevUser) => ({
						...prevUser,
						likedReviews: response.likedReviews, // only update the name property, keep everything else the same
						dislikedReviews: response.dislikedReviews,
					}));
					let updatedReviews = reviews.map((review, idx) => {
						if (idx === index) {
							return { ...review, likes: review.likes + 1 };
						}
						return review;
					});

					// Update the state with the new array
					setReviews(updatedReviews);
				}

				// Here you can handle the response, e.g., updating state or UI
			} catch (error) {
				console.error("Error sending like:", error);
			}
		} else {
			return;
		}
	};

	const dislikeClicked = async (index) => {
		let flag_liked = false;
		if (user && user.UUID != "") {
			// check to see if in disliked
			for (let i = 0; i < user.likedReviews.length; i++) {
				if (user.dislikedReviews[i] === reviews[index]) {
					flag_liked = true;
				}
			}

			if (flag_liked === true) {
				return;
			}

			const url = "http://localhost:8080/api/review/disliked";
			const requestBody = {
				userUUID: user.UUID,
				reviewId: reviews[index].reviewId,
			};

			try {
				const response = await fetch(url, {
					method: "POST",
					headers: {
						"Content-Type": "application/json",
					},
					body: JSON.stringify(requestBody),
				});

				if (!response.ok) {
					console.log("Not ok push");
					return;
				} else {
					const responseData = await response.json();
					console.log("Response from the server:", responseData);
				}



				// Here you can handle the response, e.g., updating state or UI
			} catch (error) {
				console.error("Error sending like:", error);
			}
		} else {
			return;
		}
	};

	function clearInputs() {
		setRating(0);
		setTextReview("");
		setChooseImage(null);
	}

	const handleImageChange = (e) => {
		const file = e.target.files[0];
		if (file) {
			const fileReader = new FileReader();
			fileReader.onloadend = () => {
			  const base64Representation = fileReader.result;
			  setChooseImage(base64Representation); // Store the Base64 string in the state
			  console.log(base64Representation)
			};
			reader.readAsDataURL(file);
		  }
		setChooseImage(file);
	};

	const closeModal = () => {
		setShow(false);
		clearInputs();
	};


	const addAReview = async () => {
		if(rating == '' || textReview == ''){
			toast.error("Need a rating and review!")
		} else {
			console.log(user)
			const requestBody = {
				userId: user,
				dormName: dormId,
				starRating: rating,
				imageUrl: chooseImage,
				likes: 0,
				dislikes: 0,
				body: textReview
			};
			const url = "http://localhost:8080/api/review/addReview";
			
			try {
				const response = await fetch(url, {
					method: "POST",
					headers: {
						"Content-Type": "application/json",
					},
					body: JSON.stringify(requestBody),
				});
				console.log(JSON.stringify(requestBody))

				if (!response.ok) {
					toast.error("error adding a review")
					console.log("Not ok add a review");
					return;
				} else {
					const responseData = await response.json();
					console.log("Response from the server:", responseData);
				}

				getReviews();
				// Here you can handle the response, e.g., updating state or UI
			} catch (error) {
				console.error("Error adding a review:", error);
				toast.error("error adding a review")
				
			}
			setShow(false);
			clearInputs();
		}

	}

	const containerStyle = {
		display: "flex",
		flexDirection: "column",
		alignItems: "center",
		height: "100vh",
	};

	const barStyle1 = {
		height: "10px",
		width: "70%",
		backgroundColor: "#000000",
		margin: "10px 0",
	};

	const barStyle2 = {
		height: "10px",
		width: "40%",
		backgroundColor: "#000000",
		margin: "10px 0",
	};

	const buttonContainerStyle = {
		paddingRight: "100px",
		position: "absolute",
		top: 100,
		right: 20,
	};

	return (
		<div style={containerStyle}>
			<div style={buttonContainerStyle}>
				<button className='btn btn-danger' onClick={showModal}>
					Add a Review
				</button>
				<Modal show={show} onHide={closeModal}>
					<Modal.Body>
						<Form>
							<Form.Group controlId='rating'>
								<Form.Label>Star Rating: </Form.Label>
								<StarRatings
									rating={rating}
									starRatedColor='gold'
									changeRating={handleRatingChange}
									numberOfStars={5}
									starDimension='30px'
								/>
							</Form.Group>
							<Form.Group controlId='textReview'>
								<Form.Label>Review: </Form.Label>
								<Form.Control
									as='textarea'
									rows={4}
									value={textReview}
									onChange={handleReviewTextChange}
								/>
							</Form.Group>
							<Form.Group controlId='image'>
								<Form.Label>Upload Image: </Form.Label>
								<Form.Control
									type='file'
									accept='image/*'
									onChange={handleImageChange}
								/>
							</Form.Group>
						</Form>
					</Modal.Body>
					<Modal.Footer>
						<Button
							variant='success'
							onClick={addAReview
							}
						>
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
						{reviews.map((review, index) => (
							<TableRow>
								<TableCell
									style={{
										fontSize: "22px",
										width: "80%",
										margin: "10px 130px",
										borderBottom: "2px solid black",
										border: "4px solid black",
										display: "flex",
										flexDirection: "column",
									}}
								>
									<div
										style={{
											display: "flex",
											alignItems: "center",
											marginBottom: "10px",
										}}
									>
										Rating:
										<StarRatings
											rating={review.starRating}
											starRatedColor='gold'
											numberOfStars={5}
											starDimension='30px'
											starSpacing='2px'
										/>
									</div>
									Description: {review.body}
									<br></br>
									<div
										style={{
											display: "flex",
											justifyContent: "flex-end",
										}}
									>
										<div className='like'>
											{review.likes}
											<button
												className='fabutton like'
												onClick={() =>
													likeClicked(index)
												}
											>
												<FontAwesomeIcon
													icon={faThumbsUp}
												/>
											</button>
										</div>
										<div className='dislike'>
											<button
												type='button'
												className='fabutton dislike'
												onClick={dislikeClicked}
											>
												<FontAwesomeIcon
													icon={faThumbsDown}
												/>
											</button>
											{review.dislikes}
										</div>
									</div>
									Images:
									{review.image && (
										<img
											src={
												review.imageUrl
											}
											style={{
												maxHeight: "300px",
												marginTop: "5px",
												maxWidth: "20%",
											}}
										/>
									)}
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
