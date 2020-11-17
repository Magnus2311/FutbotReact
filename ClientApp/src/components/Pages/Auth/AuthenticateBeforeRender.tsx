import { FunctionComponent, useEffect, useState } from "react"
import { useHistory } from "react-router";
import { UserState } from "../../../store/User";

type AuthenticateBeforeRenderProps = any & UserState;

const AuthenticateBeforeRender: FunctionComponent<AuthenticateBeforeRenderProps> = ({ render }) => {
    const history = useHistory();

    return render();
}

export default AuthenticateBeforeRender;