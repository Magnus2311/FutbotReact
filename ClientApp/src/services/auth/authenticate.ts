import { getRefreshToken } from "./isAuthenticated";
import Cookies from 'js-cookie';
import { LoginToken, User } from "../../interfaces/Models";
import { login } from "../db/usersDbService";
import { History } from "history";

const redirectToLogin = (history: History) => {
    history.push('/auth/login');
}

export const authenticate = async (history: History, user?: User) => {
    if (getRefreshToken()) {
        try {
            const tokens = user ? await (await login(user)).token : undefined;
            if (tokens) {
                setCookies(tokens);
                return true;
            } else {
                return false;
            }
        } catch (error) {
            redirectToLogin(history);
            return false;
        }
    }

    redirectToLogin(history);
    return false;
}

export const setCookies = (token: LoginToken) => {
    const expires = token.expires_in || 60 * 60 * 1000
    const inOneHour = new Date(new Date().getTime() + expires.getTime())

    Cookies.set('access_token', token.access_token, { expires: inOneHour })
    Cookies.set('refresh_token', token.refresh_token)
}
