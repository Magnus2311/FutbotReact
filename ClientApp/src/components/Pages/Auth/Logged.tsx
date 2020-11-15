import React, { FormEvent, FunctionComponent } from "react";
import { RouteComponentProps } from "react-router";

type LoggedModel = {
    username: string & RouteComponentProps
}

const Logged: FunctionComponent<LoggedModel> = ({ username, history }) => {

    const handleSubmit = (e: FormEvent<HTMLButtonElement>) => {
        e.preventDefault();
        history.push("/login");
    }

    return <div>
        <span>
            {username}
        </span>
        <button onSubmit={handleSubmit}>Logout</button>
    </div>
}

export default Logged;