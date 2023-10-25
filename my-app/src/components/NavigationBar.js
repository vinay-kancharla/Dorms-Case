import { Link } from "react-router-dom";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import NavDropdown from "react-bootstrap/NavDropdown";
import dorms from "../dummy_data/dorms.json";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars, faMagnifyingGlass, faArrowRight } from "@fortawesome/free-solid-svg-icons";
import React, { useState } from 'react';
import LoginModal from './LoginModal';
import DiaWrap from '@mui/material/Dialog';
const NavigationBar = () => {
  const options = dorms;
  const [isLoginOpen, setLoginOpen] = useState(false);
  const handleDormPage = (dorm) => {
    // TO DO
    console.log(`Navigating to the ${dorm} page`);
  };

  const handleExperiencePage = (experience) => {
    // TO DO
    console.log(`Navigating to the ${experience} page`);
  };

  const loginCallback = (data) => {
    if (data && (data.action == 'submitted' || data.action == 'cancelled' ) ){
        setLoginOpen(false);
    }
}
  return (
    <div>
    <Navbar expand="lg" bg="primary">
      <Container className="d-flex justify-content-between">
        <Nav style={{ display: 'flex', width: '100%' }}>
          <NavDropdown
            title={<FontAwesomeIcon icon={faBars} />}
            id="basic-nav-dropdown"
            style={{ minWidth: '250px' }}
          >
            {Object.entries(options).map(([experience, dorms]) => (
              <div style={{display: 'inline-block'}}>
                <span style={{ display: 'inline-block' }}>
                <NavDropdown
                title={experience}
                id={`${experience}-dropdown`}
                key={experience}
                onClick={() => handleExperiencePage(experience)}
              >
                {dorms.map((dorm) => (
                  <NavDropdown.Item
                    key={dorm}
                    onClick={() => handleDormPage(dorm)}
                  >
                    <Link to={`/dorm/${dorm.replaceAll(" ", "")}`}>{dorm}</Link>
                  </NavDropdown.Item>
                ))}
              </NavDropdown>
                </span>
                <span style={{ display: 'inline-block' }}>
                <Link to={`/experience/${experience.replaceAll(" ", "")}`}>
                  <FontAwesomeIcon icon={faArrowRight}/>  
                </Link>
                </span>
              </div>
            ))}
          </NavDropdown>
          <div style={{ flex: 1 }}></div>


        <Navbar.Brand>
          <Link style={{textDecoration: 'none', outline: 'none' , color: 'inherit'}}to="/">
          Dorms @ Case
          </Link>
        </Navbar.Brand>

        <div style={{ flex: 1.5}}></div>

          <Nav.Link>
          <Link style={{ textDecoration: 'none', outline: 'none' , color: 'inherit'}}to="search">
          <FontAwesomeIcon icon={faMagnifyingGlass} />
          </Link>
    
          </Nav.Link>
          <Nav.Link>
          <button onClick={() => setLoginOpen(true)}>
                Login
          </button>
          </Nav.Link>
        </Nav>
      </Container>
    </Navbar>
    <DiaWrap open={isLoginOpen} onClose={() => loginCallback()}>
    <LoginModal parentCallback={loginCallback} login={isLoginOpen}></LoginModal>
    </DiaWrap>
    </div>
  );
};

export default NavigationBar;
