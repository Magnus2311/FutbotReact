import React, { useContext, useState } from "react";
import { useHistory } from "react-router";
import { User } from "../../../interfaces/Models";
import { sighOut } from "../../../services/auth/authenticate";
import { AuthContext } from "../../Common/Contexts/AuthContext";

const Index = () => {
    const { user, setUser } = useContext(AuthContext);
    const history = useHistory();

    const handleClick = (e: React.FormEvent<HTMLButtonElement>) => {
        debugger;
        e.preventDefault();
        sighOut();
        setUser({} as User);
        history.push("/");
    }

    return <div style={{display: "grid", placeItems: "center"}}>
        <div>
            <div>Username:</div>
            <div>{user.username ? user.username.toLowerCase() : ""}</div>
        </div>
        <div>
            <button onClick={handleClick} className="btn btn-light btn-sm">Sign out</button>
            </div>
    </div>
}

export default Index;