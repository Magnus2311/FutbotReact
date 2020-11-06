import { FunctionComponent, useEffect, useState } from "react"
import { connect } from "react-redux";
import { useHistory } from "react-router";
import { authenticate } from "../../../services/auth/authenticate"
import { ApplicationState } from "../../../store";
import { UserState } from "../../../store/User";

interface AuthenticatedBeforeState {
    user: UserState
    render: any
}

const AuthenticateBeforeRender: FunctionComponent<AuthenticatedBeforeState> = ({ render, user }) => {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const history = useHistory();

    useEffect(() => {
        authenticate(history, user.user).then(isAuthenticated => {
            setIsAuthenticated(isAuthenticated);
        })
    });
    debugger;
    return isAuthenticated ? render() : null;
}

export default connect(
    (state: ApplicationState) => state.user
)(AuthenticateBeforeRender);