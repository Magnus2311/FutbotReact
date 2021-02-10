import { toast } from "react-toastify";
import { ThunkDispatch } from "redux-thunk";

export function get<T>(
  url: string,
  mode = "cors" as RequestMode,
  cache = "no-cache" as RequestCache,
  credentials = "same-origin" as RequestCredentials
): Promise<T> {
  return fetch(url, {
    mode: mode,
    cache: cache,
    credentials: credentials,
    headers: {
      "Content-Type": "application/json",
    },
  }).then((response) => {
    if (response.ok) return response.json().then((data) => data as T);

    throw new Error(response.statusText);
  });
}

export function post<T>(
  url: string,
  body: any,
  method = "POST",
  mode = "cors" as RequestMode,
  cache = "no-cache" as RequestCache,
  credentials = "same-origin" as RequestCredentials
): Promise<T> {
  return fetch(url, {
    method: method,
    mode: mode,
    cache: cache,
    credentials: credentials,
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(body),
  }).then((response) => {
    if (response.ok) return response.json().then((data) => data as T);

    throw new Error(response.statusText);
  });
}

export function put<T>(
  url: string,
  body: any,
  method = "PUT",
  mode = "cors" as RequestMode,
  cache = "no-cache" as RequestCache,
  credentials = "same-origin" as RequestCredentials
): Promise<T> {
  return fetch(url, {
    method: method,
    mode: mode,
    cache: cache,
    credentials: credentials,
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(body),
  }).then((response) => {
    if (response.ok) return response.json().then((data) => data as T);

    throw new Error(response.statusText);
  });
}

export interface IPostWithDispatchParams {
  url: string;
  body: any;
  method?: string;
  mode?: RequestMode;
  cache?: RequestCache;
  credentials?: RequestCredentials;
  dispatch: () => void;
  successMessage?: string;
  errorMessage?: string;
}

export function postWithDispatch<T>(
  params: IPostWithDispatchParams
): Promise<T> {
  let {
    url,
    method,
    mode,
    cache,
    credentials,
    body,
    dispatch,
    errorMessage,
    successMessage,
  } = params;

  if (method === undefined) method = "POST";
  if (mode === undefined) mode = "cors";
  if (cache === undefined) cache = "no-cache";
  if (method === undefined) credentials = "same-origin";
  debugger;

  return fetch(url, {
    method: method,
    mode: mode,
    cache: cache,
    credentials: credentials,
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(body),
  }).then((response) => {
    if (response.status === 200) {
      dispatch();
      successMessage && toast.success(successMessage);
    } else {
      errorMessage && toast.error(errorMessage);
    }

    throw new Error(response.statusText);
  });
}
