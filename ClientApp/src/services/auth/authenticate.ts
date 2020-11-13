import Cookies from 'js-cookie';
import { LoginToken, User } from "../../interfaces/Models";
import { refreshAccessToken } from "../db/usersDbService";
import { History } from "history";
import { getAccessToken, isAuthenticated } from './isAuthenticated';

const redirectToLogin = (history: History) => {
    history.push('/auth/login');
}

export const authenticate = async (history: History, user?: User) => {
    var a = getAccessToken();
    debugger;
    if (isAuthenticated()) {
        return true;
    } else {
        try {
            const token = (await refreshAccessToken()).token;
            debugger;
            if (token) {
                setCookies(token);
                return true;
            } else {
                redirectToLogin(history);
                return false;
            }
        } catch (error) {
            redirectToLogin(history);
            return false;
        }
    }
}

export const setCookies = (token: LoginToken) => {
    Cookies.set('access_token', JSON.stringify(token.access_token), { expires: new Date().setHours(new Date().getHours() + 1)})
}
