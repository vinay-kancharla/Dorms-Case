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
					`http://localhost:8080/api/review/getAllReviews?dormName=${dormId}`
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
			<DormPages dormId={dormId} />
		</div>
	);
}
