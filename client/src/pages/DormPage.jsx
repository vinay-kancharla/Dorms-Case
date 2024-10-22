import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import DormPages from "../components/DormPages.js";
import NavigationBar from "../components/NavigationBar";
import ReviewTemplate from "../components/ReviewTemplate.js";
export default function DormPage() {
	const { dormId } = useParams();
	const h1Style = {
		paddingTop: "20px",
		textAlign: "center",
	};

	const [reviews, setReviews] = useState([]);

	useEffect(() => {
		async function getReviews() {
			try {
				const response = await fetch(
					`http://localhost:8080/api/review/getAll?dormName=${dormId}`
				);
				const data = await response.json();
				setReviews(data);
			} catch (error) {
				console.log("Error: ", error);
			}
		}
		getReviews();
	}, [dormId]);

	return (
		<div>
			<NavigationBar />
			<h1 class='display-4' style={h1Style}>
				{dormId}
			</h1>
			{/* Here is "map" code to give you an idea of how it works. I would recommend making a component called "reviewlayout" and use that in each iteration*/}
			{reviews.map((review, index) => (
				<ReviewTemplate
					rating={review.starrating}
					reviewText={review.review}
					dormPicture={review.image}
					likes={review.like}
					dislikes={review.dislike}
				/>
			))}
			<DormPages />
		</div>
	);
}
