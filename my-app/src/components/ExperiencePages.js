import React from 'react';

const ExperiencePages = () => {
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


  return (
    <div style={containerStyle}>
      <div style={barStyle1}></div>
      <div style={barStyle2}></div>
    </div>
  );
};

export default ExperiencePages;