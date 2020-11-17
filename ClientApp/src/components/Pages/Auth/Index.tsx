import React, { useContext } from "react";
import { useHistory } from "react-router";
import { sighOut } from "../../../services/auth/authenticate";
import { AuthContext } from "../../Common/Contexts/AuthContext";

const Index = () => {
    const { user } = useContext(AuthContext);
    const history = useHistory();

    const handleClick = (e: React.FormEvent<HTMLButtonElement>) => {
        debugger;
        e.preventDefault();
        sighOut();
        history.push("/");
    }

    return <div style={{display: "grid", placeItems: "center"}}>
        <div>
            <div>Username:</div>
            <div>{user ? user.username.toLowerCase() : ""}</div>
        </div>
        <div>
            <button onClick={handleClick} className="btn btn-light btn-sm">Sign out</button>
            </div>
    </div>
}

export default Index;