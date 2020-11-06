import { exception } from "console";
import { LoginResponse, User } from "../../interfaces/Models";

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
            token: { await response.text() }
        }
        return response.json();
    }).catch(error => {
        throw error
    }).then((loginResponse: LoginResponse) => loginResponse);
}