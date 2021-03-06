import React, {
  ChangeEvent,
  FormEvent,
  MouseEvent,
  FunctionComponent,
  useState,
} from "react";
import { EaAccount, LoginStatus } from "../../../interfaces/Models";
import TextBox from "../../Common/Controls/TextBox";
import { useHistory } from "react-router";
import { post } from "../../../services/fetch/fetch";
import { connect } from "react-redux";
import { actionCreators } from "../../../store/EaAccounts";
import { EPERM } from "constants";

type AddEaAccountProps = any;

const AddEaAccount: FunctionComponent<AddEaAccountProps> = (props) => {
  const [isAddClicked, setIsAddClicked] = useState(false);
  const { onAddEaAccounts } = props;
  const [eaAccount, setEaAccount] = useState({} as EaAccount);
  const [securityCode, setSecurityCode] = useState("");
  const [loginStatus, setLoginStatus] = useState(0 as LoginStatus);
  const [isResendingCode, setIsResendingCode] = useState(false);
  const history = useHistory();

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setEaAccount({ ...eaAccount, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    debugger;
    post<LoginStatus>("/api/eaaccounts/add", eaAccount).then((loginStatus) => {
      debugger;
      setLoginStatus(loginStatus);

      debugger;
      if (loginStatus === 1) onAddEaAccounts(eaAccount);
      history.push(`/ea/account/${eaAccount.username}`);
    });
  };

  const onSecurityCodeChanged = (e: ChangeEvent<HTMLInputElement>) => {
    setSecurityCode(e.target.value);
  };

  const onSecurityCodeSubmit = (e: FormEvent<HTMLButtonElement>) => {
    e.preventDefault();

    post<LoginStatus>(
      "/api/eaaccounts/securitycode",
      securityCode
    ).then((loginStatus) => setLoginStatus(loginStatus));

    if (loginStatus === 1) {
      history.push(`/ea/account/${eaAccount.username}`);
      onAddEaAccounts(eaAccount);
    }
  };

  const onResubmitSecurityCode = (e: FormEvent<HTMLButtonElement>) => {
    e.preventDefault();

    post<LoginStatus>(
      "/api/eaaccounts/resendsecuritycode",
      securityCode
    ).then((loginStatus) => setLoginStatus(loginStatus));

    setIsResendingCode(true);
  };

  const handleAddButtonClick = (e: MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();

    setIsAddClicked(true);
  };

  return (
    <>
      {isAddClicked ? (
        <form onSubmit={handleSubmit}>
          <TextBox
            value={eaAccount.username}
            handleChange={handleChange}
            label="EA username"
            name="username"
            placeholder="Enter EA username"
          />
          <TextBox
            value={eaAccount.password}
            handleChange={handleChange}
            label="EA password"
            name="password"
            placeholder="Enter EA password"
            type="password"
          />
          <button className="fut-btn">Login</button>
        </form>
      ) : (
        <button className="fut-btn" onClick={handleAddButtonClick}>
          Add new account
        </button>
      )}

      {loginStatus === 2 ? (
        <>
          <TextBox
            value={securityCode}
            handleChange={onSecurityCodeChanged}
            label="Security code"
            name="securityCode"
            placeholder="Enter security code"
          />
          <button className="fut-btn" onClick={onSecurityCodeSubmit}>
            Submit
          </button>
          <button className="fut-btn" onClick={onResubmitSecurityCode}>
            Resend security code
          </button>
          {isResendingCode && <label>Security code resend successfully!</label>}
        </>
      ) : (
        <></>
      )}
    </>
  );
};

const mapDispatchToProps = (dispatch: any) => {
  return {
    onAddEaAccounts: (eaAccount: EaAccount) => {
      dispatch(actionCreators.addEaAccount(eaAccount));
    },
  };
};

export default connect(null, mapDispatchToProps)(AddEaAccount);
