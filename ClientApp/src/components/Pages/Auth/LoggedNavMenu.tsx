import React, { FunctionComponent, useContext } from "react";
import { AuthContext } from "../../Common/Contexts/AuthContext";

const handleClick = (e: React.MouseEvent<HTMLSpanElement>) => {
    e.preventDefault();
    // TO DO Логика за пренасочване към профила
}

const LoggedNavMenu: FunctionComponent = () => {
    const authContext = useContext(AuthContext);

    return <div className="nav-item" style={{cursor: "pointer"}}>
        <a className="text-dark nav-link">{authContext.user ? authContext.user.username.toLowerCase() : "WTF????"}</a>
    </div>
}

export default LoggedNavMenu;