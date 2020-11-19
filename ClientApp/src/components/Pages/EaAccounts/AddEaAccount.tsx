import React, { ChangeEvent, FormEvent, FunctionComponent, useState } from "react";
import { EaAccount, LoginStatus } from "../../../interfaces/Models";
import TextBox from "../../Common/Controls/TextBox";
import { useHistory } from "react-router";
import { post } from "../../../services/fetch/fetch";

const AddEaAccount:FunctionComponent = () => {
    const [eaAccount, setEaAccount] = useState({} as EaAccount);
    const [securityCode, setSecurityCode] = useState("");
    const [loginStatus, setLoginStatus] = useState(0 as LoginStatus);
    const history = useHistory();

    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        setEaAccount({ ...eaAccount, [e.target.name]: e.target.value });
    }

    const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        debugger;
        post<LoginStatus>("/api/eaaccounts/add", eaAccount)
            .then(loginStatus => setLoginStatus(loginStatus));
        //onAddEaAccount(eaAccount);
    }

    const onSecurityCodeChanged = (e: ChangeEvent<HTMLInputElement>) => {
        setSecurityCode(e.target.value);
    }

    const onSecurityCodeSubmit = (e: FormEvent<HTMLButtonElement>) => {
        e.preventDefault();

        post<LoginStatus>("api/eaaccounts/securitycode", securityCode)
            .then(loginStatus => setLoginStatus(loginStatus));

        if (loginStatus === 1)
            history.push(`/ea/account/${eaAccount.username}`);
    }

    return <>
        <form onSubmit={handleSubmit}>
            <TextBox value={eaAccount.username}
                handleChange={handleChange}
                label="EA username"
                name="username"
                placeholder="Enter EA username" />
            <TextBox value={eaAccount.password}
                handleChange={handleChange}
                label="EA password"
                name="password"
                placeholder="Enter EA password"
                type="password" />
            <button className="btn btn-primary">Login</button>
        </form>

        {loginStatus === 2 ?
            <>
                <TextBox value={securityCode}
                    handleChange={onSecurityCodeChanged}
                    label="Security code"
                    name="securityCode"
                    placeholder="Enter security code" />
                <button className="btn btn-primary" onSubmit={onSecurityCodeSubmit}>Submit</button>
            </>
            : <></>}
    </>
}

export default AddEaAccount;