import { useContext } from "react";
import UserContext from "../context/UserContext";

function useUser() {
  return useContext(UserContext);
}

export default useUser;
