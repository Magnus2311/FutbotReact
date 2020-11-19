import {createContext} from "react";
import { User } from "../../../interfaces/Models";

interface IAuthProps {
    user: User,
    setUser: React.Dispatch<React.SetStateAction<User>>
}

export const AuthContext = createContext({} as IAuthProps);