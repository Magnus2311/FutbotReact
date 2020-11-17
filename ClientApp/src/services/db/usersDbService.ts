import { toast } from "react-toastify";
import { LoginResponse, User } from "../../interfaces/Models";

export function add(user: User): void {
    fetch("api/users/add", {
        method: "POST",
        mode: "cors",
        cache: "no-cache",
        credentials: "same-origin",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(user)
    });
}

export function login(user: User): Promise<boolean> {
    return fetch("api/users/login", {
        method: "POST",
        mode: "cors",
        cache: "no-cache",
        credentials: "same-origin",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(user),
    }).then(async (response: Response) => {
        debugger;
        var isSuccessful = response.status == 200;
        var loginResponse: LoginResponse = {
            isSuccessful: isSuccessful,
            token: JSON.parse(await response.text())
        }
        return loginResponse;
    }).catch(error => {
        throw error;
    }).then((loginResponse: LoginResponse) => {
        if (loginResponse.isSuccessful)
            toast.success("You've logged in successfully!");
        else
            toast.error("Login failed! Check your credentials!");
        return loginResponse.isSuccessful;
    });
}

export function refreshAccessToken(): Promise<LoginResponse> {
    return fetch("api/users/getAccessToken", {
        method: "GET",
        mode: "cors",
        cache: "no-cache",
        credentials: "include",
        headers: {
            "Content-Type": "application/json"
        },
    }).then(async (response: Response) => {
        debugger;
        var isSuccessful = response.status == 200;
        var loginResponse: LoginResponse = {
            isSuccessful: isSuccessful,
            token: JSON.parse(await response.text())
        }
        return loginResponse;
    }).catch(error => {
        throw error
    }).then((loginResponse: LoginResponse) => loginResponse);
}