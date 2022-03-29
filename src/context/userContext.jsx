import { createContext } from "react";
import useLoginProvider from "../hooks/useLoginProvider";
const UserContext = createContext({});

export function UserProvider(props) {
  const userProvider = useLoginProvider();

  return (
    <UserContext.Provider value={userProvider}>
      {props.children}
    </UserContext.Provider>
  );
}

export default UserContext;
