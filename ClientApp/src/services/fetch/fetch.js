"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.post = exports.get = void 0;
function get(url, mode, cache, credentials) {
    if (mode === void 0) { mode = "cors"; }
    if (cache === void 0) { cache = "no-cache"; }
    if (credentials === void 0) { credentials = "same-origin"; }
    return fetch(url, {
        mode: mode,
        cache: cache,
        credentials: credentials,
        headers: {
            "Content-Type": "application/json"
        }
    }).then(function (response) {
        if (response.ok)
            return response
                .json()
                .then(function (data) { return data; });
        throw new Error(response.statusText);
    });
}
exports.get = get;
function post(url, body, method, mode, cache, credentials) {
    if (method === void 0) { method = "POST"; }
    if (mode === void 0) { mode = "cors"; }
    if (cache === void 0) { cache = "no-cache"; }
    if (credentials === void 0) { credentials = "same-origin"; }
    return fetch(url, {
        method: method,
        mode: mode,
        cache: cache,
        credentials: credentials,
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(body)
    }).then(function (response) {
        if (response.ok)
            return response
                .json()
                .then(function (data) { return data; });
        throw new Error(response.statusText);
    });
}
exports.post = post;
//# sourceMappingURL=fetch.js.map