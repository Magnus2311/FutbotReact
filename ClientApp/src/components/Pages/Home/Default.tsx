import React, { FunctionComponent } from "react";
import { useHistory } from "react-router";
import { EaAccount } from "../../../interfaces/Models";

type HomeDefaultProps = {
    eaAccounts: any
};

const Default: FunctionComponent<HomeDefaultProps> = ({ eaAccounts }) => {
    const history = useHistory();

    const handleEaAccountClick = (e: React.MouseEvent<HTMLDivElement>) => {
        debugger;
        history.push(`/ea/account/${e.currentTarget.innerText}`);
    };

    return (eaAccounts.map((eaAccount: EaAccount) => {
        return (
            <div
                className="btn btn-dark"
                onClick={handleEaAccountClick}
                key={eaAccount.username}
            >
                {eaAccount.username}
            </div>
        );
    }));
};

export default Default;
