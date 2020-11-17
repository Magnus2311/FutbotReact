import {createContext} from "react";
import { User } from "../../../interfaces/Models";

interface IAuthProps {
    user: User | undefined,
    setUser: React.Dispatch<React.SetStateAction<User | undefined>>
}

export const AuthContext = createContext({} as IAuthProps);