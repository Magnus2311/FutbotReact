import React, { ChangeEvent, FormEvent, FunctionComponent, useState } from "react";
import { connect } from "react-redux";
import { EaAccount } from "../../../interfaces/Models";
import TextBox from "../../Common/Controls/TextBox";
import * as actions from "../../../store/EaAccounts";
import { useHistory } from "react-router";

const AddEaAccount: FunctionComponent<any> = ({onAddEaAccount}) => {
    const [eaAccount, setEaAccount] = useState({} as EaAccount);
    const history = useHistory();

    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        setEaAccount({...eaAccount, [e.target.name]: e.target.value});
    }

    const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        debugger;
        onAddEaAccount(eaAccount);
        history.push("/ea/all");
    }

    return <form onSubmit={handleSubmit}>
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
            type="password"/>
        <button className="btn btn-primary">Login</button>
    </form>
}

const mapDispatchToProps = (dispatch: any) => {
    return {
        onAddEaAccount: (eaAccount: EaAccount) => {
            dispatch(actions.actionCreators.addEaAccount(eaAccount));
        }
    }
}

export default connect(
        undefined, 
        mapDispatchToProps
    )(AddEaAccount);