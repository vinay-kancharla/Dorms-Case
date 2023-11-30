import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import ExperiencePages from "../components/ExperiencePages.js";
import NavigationBar from "../components/NavigationBar";
import CompleteBarGraph from "../components/CompleteBarGraph.jsx";
import firstyearrankings from "../dummy_data/firstyearrankings.json";
import secondyearrankings from "../dummy_data/secondyearrankings.json";
import upperclassrankings from "../dummy_data/upperclassrankings.json";


export default function ExperiencePage() {
  const { experienceId } = useParams();
  const h1Style = {
    paddingTop: "20px",
    textAlign: "center",
  };

  const [dorms, setDorms] = useState([]);

  useEffect(() => {
    async function getDorms() {
      try {
        const response = await fetch(
          `http://localhost:8080/api/dorm/getAll?experience=${experienceId}`
        );
        console.log(experienceId);
        const data = await response.json();
        setDorms(data);
      } catch (error) {
        console.log("Error: ", error);
      }
    }
    getDorms();
  }, [experienceId]);

  return (
    <div>
      <NavigationBar />
      <h1 className="display-4" style={h1Style}>
        {experienceId}
      </h1>
      {dorms.map((dorm, index) => (
        <span key={index}>
          {dorm.name}
          <br />
        </span>
      ))}
      <ExperiencePages />
      {experienceId === 'First Year Experience' && (
        <CompleteBarGraph data={firstyearrankings} title={experienceId} />
      )}
	        {experienceId === 'Second Year Experience' && (
        <CompleteBarGraph data={secondyearrankings} title={experienceId} />
      )}
	        {experienceId === 'Upperclass Experience' && (
        <CompleteBarGraph data={upperclassrankings} title={experienceId} />
      )}
    </div>
  );
}
