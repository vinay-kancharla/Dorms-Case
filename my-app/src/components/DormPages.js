import React from 'react';

const DormPages = () => {
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
     <div style={buttonContainerStyle}><button className="btn btn-danger">Add a Review</button> </div>
      <div style={barStyle1}></div>
      <div style={barStyle2}></div>
    </div>
  );
};

export default DormPages;

  