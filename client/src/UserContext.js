import React, { createContext, useState, useContext } from "react";

export const UserInformation = createContext();

export const useUser = () => useContext(UserInformation);

export const UserProvider = ({ children }) => {
	const [user, setUser] = useState(null);

	return (
		<UserInformation.Provider value={{ user, setUser }}>
			{children}
		</UserInformation.Provider>
	);
};
