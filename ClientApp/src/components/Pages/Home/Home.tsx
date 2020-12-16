import React, { FunctionComponent, useEffect } from "react";
import { connect } from "react-redux";
import { EaAccount } from "../../../interfaces/Models";
import { ApplicationState } from "../../../store";
import { actionCreators } from "../../../store/EaAccounts";
import Default from "./Default";
import Empty from "./Empty";

interface HomeComponentProps {
  loadEaAccounts: () => void;
  eaAccounts: EaAccount[];
}

const Home: FunctionComponent<HomeComponentProps> = ({
  loadEaAccounts,
  eaAccounts,
}) => {
  useEffect(() => loadEaAccounts(), []);

  return eaAccounts === undefined || eaAccounts.length === 0 ? (
    <Empty />
  ) : (
    <Default eaAccounts={eaAccounts} />
  );
};

const mapDispatchToProps = (dispatch: any) => {
  return {
    loadEaAccounts: () => {
      dispatch(actionCreators.loadEaAccounts());
    },
  };
};

export default connect(
  (state: ApplicationState) => state.eaAccounts,
  mapDispatchToProps
)(Home);
