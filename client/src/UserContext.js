import React, { createContext, useState, useContext } from "react";
import {useEffect} from "react"

export const UserInformation = createContext();

export const useUser = () => useContext(UserInformation);

export const UserProvider = ({ children }) => {
	const [user, setUser] = useState(JSON.parse(localStorage.getItem('user')) || null);

	useEffect(() => {
	  localStorage.setItem('user', JSON.stringify(user));
	}, [user]);

	return (
		<UserInformation.Provider value={{ user, setUser }}>
			{children}
		</UserInformation.Provider>
	);
};
