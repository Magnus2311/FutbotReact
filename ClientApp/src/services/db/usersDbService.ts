import { exception } from "console";
import { LoginResponse, LoginToken, User } from "../../interfaces/Models";

export function add(user: User): void {
    var response = fetch("api/users/add", {
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

export function login(user: User): Promise<LoginResponse> {
    return fetch("api/users/login", {
        method: "POST",
        mode: "cors",
        cache: "no-cache",
        credentials: "same-origin",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(user)
    }).then(async (response: Response) => {
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