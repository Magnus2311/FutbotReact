import { User } from "../../interfaces/Models";

export const authenticate = (): Promise<User | undefined> => {
        return fetch("api/users/getUsername", {
            method: "GET",
            mode: "cors",
            cache: "no-cache",
            credentials: "same-origin",
            headers: {
                "Content-Type": "application/json"
            },
        })
        .then(response => {
            if (response.status === 200)
                return response.json();
            
            throw "Unauthorized";
        })
        .then((userResponse: User) => {
            return userResponse;
        })
        .catch(() => {
            return undefined;
        });
}