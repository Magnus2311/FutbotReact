import { FunctionComponent, useEffect, useState } from "react"
import { useHistory } from "react-router";
import { authenticate } from "../../../services/auth/authenticate"

interface AuthenticatedBeforeState {
    render: any
}

const AuthenticateBeforeRender: FunctionComponent<AuthenticatedBeforeState> = ({ render }) => {
    const history = useHistory();

    useEffect(() => {
            authenticate(history);
    });
    return render();
}

export default AuthenticateBeforeRender;