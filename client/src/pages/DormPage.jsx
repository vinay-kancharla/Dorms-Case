import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import DormPages from "../components/DormPages.js";
import NavigationBar from "../components/NavigationBar";
import ReviewTemplate from "../components/ReviewTemplate.js";
import RatingDisplay from "../components/RatingDisplay.js";

export default function DormPage() {
	const { dormId } = useParams();
	const h1Style = {
		paddingTop: "20px",
		textAlign: "center",
	};

	const [reviews, setReviews] = useState([]);
	const [rating, setRating] = useState()

	useEffect(() => {
		async function getRating() {
			try {
				const response = await fetch(
					`http://localhost:8080/api/dorm/get?dormName=${dormId} `
				);
				const data = await response.json();
				if(data.averageRating){
					setRating(data.averageRating.toFixed(2));
				} else {
					setRating()
				}
				
			} catch (error) {
				console.log("Error: ", error);
			}
		}
		getRating();
	}, [dormId]);

	return (
		<div>
			<NavigationBar />
			<div>
			<h1 class='display-4' style={h1Style}>
				{dormId}
			</h1>
			{rating &&
			<RatingDisplay dormName={dormId} rating={rating} maxRating={5} />}
			<DormPages dormId={dormId} />
			</div>
		</div>
	);
}
