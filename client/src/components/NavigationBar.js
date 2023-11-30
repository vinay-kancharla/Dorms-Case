import { Link } from "react-router-dom";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import NavDropdown from "react-bootstrap/NavDropdown";
import dorms from "../dummy_data/dorms.json";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
	faBars,
	faMagnifyingGlass,
	faArrowRight,
} from "@fortawesome/free-solid-svg-icons";
import React, { useState,useEffect } from "react";
import LoginModal from "./LoginModal";
import DiaWrap from "@mui/material/Dialog";
import SignupModal from "./SignupModal";
import { toast } from "react-toastify";
import { ToastContainer } from "react-toastify";
import { useUser } from "../UserContext";
import SearchBar  from "./SearchBar";
import "./components.css"


const NavigationBar = () => {
	const options = dorms;
	const [isLoginOpen, setLoginOpen] = useState(false);
	const [isSignupOpen, setSignupOpen] = useState(false);
	const [isSearchSeen, setSearchSeen] = useState(false);
	const { user: userIdentifier, setUser } = useUser();

	const handleDormPage = (dorm) => {
		console.log(`Navigating to the ${dorm} page`);
	};

	const handleExperiencePage = (experience) => {
		console.log(`Navigating to the ${experience} page`);
	};

	const changeSearchBar = () => {
		setSearchSeen(!isSearchSeen);
	};

	const loginCallback = (data) => {
		// if (data && (data.action === 'submitted' || data.action === 'cancelled')) {
		//   setLoginOpen(false);
		// }
		if (data && data.action === "cancelled") {
			setLoginOpen(false);
		}
		if (data && data.action === "signup") {
			console.log("Should open up sign up");
			setLoginOpen(false);
			setSignupOpen(true);
		}
		if (data && data.action === "account login successful") {
			toast.success("Account login successful!");
			console.log("account login successful");
			setLoginOpen(false);
		} else if (data && data.action === "account login unsuccessful") {
			toast.error("Account login UNSUCCESSFUL");
			console.log("account login unsuccessful");
		}
	};

	const logout = () => {
		setUser(null);
		localStorage.removeItem('user');
	}
	const signupCallback = (data) => {
		// if (data && (data.action === 'submitted' || data.action === 'cancelled')) {
		//   setSignupOpen(false);
		// }
		if (data && data.action === "cancelled") {
			setSignupOpen(false);
		}
		if (data && data.action === "account creation successful") {
			toast.success("Account creation successful!");
			console.log("account creation successful");
			setSignupOpen(false);
		} else if (data && data.action === "account creation unsuccessful") {
			toast.error("Account creation UNSUCCESSFUL");
			console.log("account creation unsuccessful");
		}
	};

	const searchCallback = (data) => {
		if(data && data.action === "clicked"){
			setSearchSeen(false)
		}
	}

	return (
		<div>
			<Navbar expand='lg' bg='primary' className="custom-navbar">
				<Container className='d-flex justify-content-between'>
					<Nav style={{ display: "flex", width: "100%" }}>
						<NavDropdown
							title={<FontAwesomeIcon icon={faBars} />}
							id='basic-nav-dropdown'
							style={{ minWidth: "250px" }}
						>
							{Object.entries(options).map(
								([experience, dorms]) => (
									<div
										key={experience}
										style={{ display: "inline-block" }}
									>
										<span
											style={{ display: "inline-block" }}
										>
											<Link
												to={`/experience/${experience}`}
											>
											<NavDropdown
												title={experience}
												id={`${experience}-dropdown`}
												key={experience}
												onClick={() =>
													handleExperiencePage(
														experience
													)
												}
											>
												{dorms.map((dorm) => (
													<NavDropdown.Item
														key={dorm}
														onClick={() =>
															handleDormPage(dorm)
														}
													>
														<Link
															to={`/dorm/${dorm}`}
														>
															{dorm}
														</Link>
													</NavDropdown.Item>
												))}
											</NavDropdown>
											</Link>
										</span>
										<span
											style={{ display: "inline-block" }}
										>
											<Link
												to={`/experience/${experience}`}
											>
												<FontAwesomeIcon
													icon={faArrowRight}
												/>
											</Link>
										</span>
									</div>
								)
							)}
						</NavDropdown>

						<Navbar.Brand  className="navbar-brand ">
							<Link
								style={{
									textDecoration: "none",
									outline: "none",
									color: "inherit",
								}}
								to='/'
							>
								Dorms @ Case
							</Link>
						</Navbar.Brand>

						{isSearchSeen && <SearchBar callback={searchCallback}/> }


							<div  className="custom-nav-item" onClick={changeSearchBar}>
								<FontAwesomeIcon icon={faMagnifyingGlass} />
							</div>


						{!userIdentifier ? (
							<button  className="custom-nav-item cool-button" onClick={() => setLoginOpen(true)}>
								Login
							</button>
						) : (
							<button  className="custom-nav-item cool-button"onClick={logout}>
								Logout
							</button>
						)}
					</Nav>
				</Container>
			</Navbar>
			{console.log(userIdentifier)}
			<div>
				<DiaWrap open={isLoginOpen} onClose={() => loginCallback()}>
					<LoginModal
						parentCallback={loginCallback}
						login={isLoginOpen}
					></LoginModal>
				</DiaWrap>
				<DiaWrap open={isSignupOpen} onClose={() => signupCallback()}>
					<SignupModal
						parentCallback={signupCallback}
						signup={isSignupOpen}
					></SignupModal>
				</DiaWrap>
				<ToastContainer />
			</div>
		</div>
	);
};

export default NavigationBar;
