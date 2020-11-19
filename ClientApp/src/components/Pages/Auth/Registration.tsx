import React, { ChangeEvent, FormEvent, FunctionComponent, useState } from "react";
import TextBox from "../../Common/Controls/TextBox";
import { User } from "../../../interfaces/Models";
import * as usersDb from "../../../services/db/usersDbService";
import { RouteComponentProps } from 'react-router-dom';

interface RegisterUser {
    username: string,
    password: string,
    confirmPassword: string,
}

const Registration: FunctionComponent<RouteComponentProps> = ({ history }) => {
    const [user, setUser] = useState<RegisterUser>({ username: "", password: "", confirmPassword: "" })

    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        setUser({ ...user, [e.target.name]: e.target.value });
    }

    const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const userToInsert: User = {
            createdDate: new Date(),
            password: user.password,
            username: user.username,
            eaAccounts: []
        }
        usersDb.add(userToInsert);
        history.push("/auth/emailsent")
    }

    return <form onSubmit={handleSubmit} >
        <TextBox handleChange={handleChange} value={user.username} label="E-mail" name="username" placeholder="Enter your email" type="email"></TextBox>
        <TextBox handleChange={handleChange} value={user.password} label="Password" name="password" placeholder="Enter your password" type="password"></TextBox>
        <TextBox handleChange={handleChange} value={user.confirmPassword} label="Confirm password" name="confirmPassword" placeholder="Confirm your password" type="password"></TextBox>
        <button className="btn btn-primary btn-xl" style={{ width: "100%" }}>Register</button>
    </form>
}

export default Registration;