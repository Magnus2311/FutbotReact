import React, { FunctionComponent } from "react";
import { connect } from "react-redux";
import { ApplicationState } from "../../../store";
import { EaAccountsState } from "../../../store/EaAccounts";

type AllEaAccountsProps = EaAccountsState

const AllEaAccounts: FunctionComponent<AllEaAccountsProps> = ({eaAccounts}) => {
return (<>{eaAccounts.map(eaAccount => <div key={eaAccount.username}>{eaAccount.username}</div>)}</>);
}

export default connect((state: ApplicationState) => state.eaAccounts)(AllEaAccounts)