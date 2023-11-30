import React from 'react';
import NavigationBar from "../components/NavigationBar.js";
import PodiumGraph from "../components/Podium.jsx"; 
import firstyearrankings from "../dummy_data/firstyearrankings.json";
import secondyearrankings from "../dummy_data/secondyearrankings.json";
import upperclassrankings from "../dummy_data/upperclassrankings.json";

function HomePage() {
  return (
    <div>
      <NavigationBar />
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
      <PodiumGraph data={firstyearrankings} title="First-Year" />
      <div></div>
      <PodiumGraph data={secondyearrankings} title="Second-Year" />
      <div></div>
      <PodiumGraph data={upperclassrankings} title="Upperclassmen" />
      </div>
    </div>
  );
}

export default HomePage;
