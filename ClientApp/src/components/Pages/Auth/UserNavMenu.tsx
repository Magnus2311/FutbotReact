import React, { FunctionComponent, useContext } from "react";
import { AuthContext } from "../../Common/Contexts/AuthContext";
import LoggedNavMenu from "./LoggedNavMenu";
import NotLoggedNavMenu from "./NotLoggedNavMenu";

const UserNavMenu: FunctionComponent = () => {
    const {user} = useContext(AuthContext);
    return user.username ? <LoggedNavMenu /> :
         <NotLoggedNavMenu />
}

export default UserNavMenu;