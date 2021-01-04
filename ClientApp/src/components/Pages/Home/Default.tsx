import React, { FunctionComponent } from "react";
import { useHistory } from "react-router";
import { EaAccount } from "../../../interfaces/Models";
import AddEaAccount from "../EaAccounts/AddEaAccount";

type HomeDefaultProps = {
  eaAccounts: any;
};

const Default: FunctionComponent<HomeDefaultProps> = ({ eaAccounts }) => {
  const history = useHistory();

  const handleEaAccountClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    debugger;
    history.push(`/ea/account/${e.currentTarget.innerText}`);
  };

  return (
    <>
      {eaAccounts.map((eaAccount: EaAccount) => {
        return (
          <button
            className="fut-btn"
            onClick={handleEaAccountClick}
            key={eaAccount.username}
          >
            {eaAccount.username}
          </button>
        );
      })}
      <AddEaAccount />
    </>
  );
};

export default Default;
