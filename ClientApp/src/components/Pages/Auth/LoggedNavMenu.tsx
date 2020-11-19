import React, { FunctionComponent, useContext } from "react";
import { useHistory } from "react-router";
import { AuthContext } from "../../Common/Contexts/AuthContext";

const LoggedNavMenu: FunctionComponent = () => {
    const authContext = useContext(AuthContext);
    const history = useHistory();

    const handleClick = (e: React.MouseEvent<HTMLSpanElement>) => {
        e.preventDefault();
        history.push("/auth/index");
    }

    return <div className="nav-item" style={{cursor: "pointer"}}>
        <a onClick={handleClick} className="text-dark nav-link">{authContext.user.username ? authContext.user.username.toLowerCase() : "WTF????"}</a>
    </div>
}

export default LoggedNavMenu;