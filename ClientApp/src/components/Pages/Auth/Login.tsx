import React, {
  ChangeEvent,
  FormEvent,
  FunctionComponent,
  useContext,
  useState,
} from "react";
import { User } from "../../../interfaces/Models";
import TextBox from "../../Common/Controls/TextBox";
import { AuthContext } from "../../Common/Contexts/AuthContext";
import { login } from "../../../services/db/usersDbService";

type LoginProps = any;

const Login: FunctionComponent<LoginProps> = ({ returnAfterLogin }) => {
  const [logged, setLogged] = useState(false);
  const [currentUser, setCurrentUser] = useState<User>({} as User);
  const { setUser } = useContext(AuthContext);

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    ((login(currentUser) as unknown) as Promise<boolean>).then(
      (isLoginSuccessful) => {
        if (isLoginSuccessful) {
          setUser(currentUser);
          setLogged(true);
        }
      }
    );
  };

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setCurrentUser({ ...currentUser, [e.target.name]: e.target.value });
  };

  return logged ? (
    returnAfterLogin
  ) : (
    <form onSubmit={handleSubmit}>
      <TextBox
        type="email"
        name="username"
        placeholder="Enter your email"
        handleChange={handleChange}
        label="E-mail"
        value={currentUser.username}
      />
      <TextBox
        type="password"
        name="password"
        placeholder="Enter your password"
        handleChange={handleChange}
        label="Password"
        value={currentUser.password}
      />
      <button className="fut-btn" style={{ width: "100%" }}>
        Login
      </button>
    </form>
  );
};

export default Login;
