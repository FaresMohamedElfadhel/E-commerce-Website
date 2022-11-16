import { createContext } from "react";

const UserContext = createContext({
	User: null,
	setUser: (User) => {},
});
export default UserContext;

