import React, { FunctionComponent } from "react";
import { connect } from "react-redux";
import { useHistory } from "react-router";
import { ApplicationState } from "../../../store";
import { EaAccountsState } from "../../../store/EaAccounts";

type AllEaAccountsProps = EaAccountsState

const AllEaAccounts: FunctionComponent<AllEaAccountsProps> = ({ eaAccounts }) => {
    const history = useHistory();

    const handleEaAccountSelected = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
        history.push(`/ea/account/${e.currentTarget.accessKey}`)
    }

    return (<>{eaAccounts ? eaAccounts.map(eaAccount => <div
        key={eaAccount.username}
        onClick={handleEaAccountSelected}
        style={{
            cursor: "pointer"
    }}>{eaAccount.username}</div>) : <div></div>}</>);
}

export default connect((state: ApplicationState) => state.eaAccounts)(AllEaAccounts)