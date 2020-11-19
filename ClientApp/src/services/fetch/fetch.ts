export function get<T>(url: string, mode = "cors" as RequestMode, cache = "no-cache" as RequestCache, credentials = "same-origin" as RequestCredentials): Promise<T> {
    return fetch(url, {
        mode: mode,
        cache: cache,
        credentials: credentials,
        headers: {
            "Content-Type": "application/json"
        }
    }).then(response => {
        if (response.ok)
            return response
                .json()
                .then(data => data as T);

        throw new Error(response.statusText);
    });
}

export function post<T>(url: string, body: any, method = "POST", mode = "cors" as RequestMode, cache = "no-cache" as RequestCache, credentials = "same-origin" as RequestCredentials): Promise<T> {
    return fetch(url, {
        method: method,
        mode: mode,
        cache: cache,
        credentials: credentials,
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(body)
    }).then(response => {
        if (response.ok)
            return response
                .json()
                .then(data => data as T);

        throw new Error(response.statusText);
    });
}