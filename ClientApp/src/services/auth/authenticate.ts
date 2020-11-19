import { User } from "../../interfaces/Models";

export const authenticate = (): Promise<User> => {
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
            return {} as User;
        });
}

export const sighOut = async () => {
    await fetch("api/users/logout", {
        method: "POST",
        credentials: "same-origin",
        cache: "no-cache",
        mode: "cors",
        headers: {
            "Content-Type": "application/json"
        }
    });
}