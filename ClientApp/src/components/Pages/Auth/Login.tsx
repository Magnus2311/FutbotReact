import React, { ChangeEvent, FormEvent, FunctionComponent, useState } from "react";
import { User } from "../../../interfaces/Models";
import { ApplicationState } from "../../../store";
import TextBox from "../../Common/Controls/TextBox";
import * as UserStore from "../../../store/User";
import { connect } from "react-redux";

const Login: FunctionComponent<User> = (user) => {
    const [currentUser, setCurrentUser] = useState<User>(user);

    const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
    }

    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        setCurrentUser({ ...currentUser, [e.target.name]: e.target.value });
    }

    return <form onSubmit={handleSubmit}>
        <TextBox
            type="email"
            name="username"
            placeholder="Enter your email"
            handleChange={handleChange}
            label="E-mail"
            value={user.username} />
        <TextBox
            type="password"
            name="password"
            placeholder="Enter your password"
            handleChange={handleChange}
            label="Password"
            value={user.username} />
        <button className="btn btn-primary" />
    </form>
}

export default connect(
    UserStore.actionCreators
)(Login);