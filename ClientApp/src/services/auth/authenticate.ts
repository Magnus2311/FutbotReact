import Cookies from 'js-cookie';
import { LoginToken } from "../../interfaces/Models";
import { History } from "history";
import { isAuthenticated } from './isAuthenticated';

export const authenticate = async (history: History) => {
    if (!isAuthenticated()) {
        debugger;
        await fetch("/users/getAccessToken").then(response => console.log(response)).catch(error => { throw error });
        debugger;
        if (!isAuthenticated()) {
            debugger;
            history.push("/auth/login");
        }
    }
}

export const setCookies = (token: LoginToken) => {
    Cookies.set('access_token', JSON.stringify(token.access_token), { expires: new Date().setHours(new Date().getHours() + 1)})
}
