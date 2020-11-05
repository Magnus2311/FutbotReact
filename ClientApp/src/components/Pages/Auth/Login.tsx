import React, { ChangeEvent, FormEvent, FunctionComponent, useState } from "react";
import { User } from "../../../interfaces/Models";
import TextBox from "../../Common/Controls/TextBox";
import * as UserStore from "../../../store/User";
import { connect } from "react-redux";
import { ApplicationState } from "../../../store";
import { RouteComponentProps } from "react-router";

type LoginProps =
    UserStore.UserState
    & typeof UserStore.actionCreators
    & RouteComponentProps

const Login: FunctionComponent<LoginProps> = (props) => {
    const { user, login, isLoginSuccessful, history } = props;
    const [currentUser, setCurrentUser] = useState<User>(user);

    const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        login(currentUser);
        if (isLoginSuccessful) {
            history.push("/loggedin");
        } else {
            history.push("logingFailed");
        }
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
            value={currentUser.username} />
        <TextBox
            type="password"
            name="password"
            placeholder="Enter your password"
            handleChange={handleChange}
            label="Password"
            value={currentUser.password} />
        <button className="btn btn-primary btn-xl" style={{ width: "100%" }}>Login</button>
    </form>
}

export default connect(
    (state: ApplicationState) => state.user,
    UserStore.actionCreators
)(Login as any);