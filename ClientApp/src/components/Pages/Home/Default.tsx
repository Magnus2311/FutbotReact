import React, { FunctionComponent } from "react";
import { useHistory } from "react-router";
import { EaAccount } from "../../../interfaces/Models";

interface DefaultProps {
  eaAccounts: EaAccount[];
}

const Default: FunctionComponent<DefaultProps> = ({ eaAccounts }) => {
  const history = useHistory();

  const handleEaAccountClick = (e: React.MouseEvent<HTMLDivElement>) => {
    debugger;
    history.push(`/ea/account/${e.currentTarget.innerText}`);
  };

  return eaAccounts.map((eaAccount) => {
    return (
      <div
        className="btn btn-dark"
        onClick={handleEaAccountClick}
        key={eaAccount.username}
      >
        {eaAccount.username}
      </div>
    );
  });
};

export default Default;
