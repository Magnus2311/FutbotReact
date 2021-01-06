import React, {
  FormEvent,
  FunctionComponent,
  MouseEvent,
  useState,
} from "react";
import { RouteComponentProps } from "react-router-dom";
import { get } from "../../../services/fetch/fetch";
import BuyPlayer from "../Trade/BuyPlayer";
import SellPlayer from "../Trade/SellPlayer";
import RelistPlayer from "../Trade/RelistPlayer";

interface MatchParams {
  username: string;
}

interface Props extends RouteComponentProps<MatchParams> {}

const Index: FunctionComponent<Props> = (props) => {
  const { username } = props.match.params;
  const [isBuying, setIsBuying] = useState(true);
  const [isSelling, setIsSelling] = useState(false);
  const [isRelisting, setIsRelisting] = useState(false);

  const handleRelistAll = (e: FormEvent<HTMLButtonElement>) => {
    e.preventDefault();

    get("/api/relist").catch((error) => console.log(error));
  };

  const handleButtonClicked = (e: MouseEvent<HTMLInputElement>) => {
    e.preventDefault();
    debugger;

    switch (e.currentTarget.name) {
      case "buying":
        setIsBuying(true);
        setIsSelling(false);
        setIsRelisting(false);
        break;
      case "selling":
        setIsBuying(false);
        setIsSelling(true);
        setIsRelisting(false);
        break;
      case "relisting":
        setIsBuying(false);
        setIsSelling(false);
        setIsRelisting(true);
        break;
    }
  };

  return (
    <div>
      <h2 style={{ marginBottom: "1.5rem" }}>{username}</h2>
      <div
        className={`btn-group btn-group-toggle`}
        style={{ margin: "0.125rem 0 1.625rem 0" }}
      >
        <label className={`btn btn-secondary ${isBuying && "active"}`}>
          <input
            type="radio"
            name="buying"
            autoComplete="off"
            onClick={handleButtonClicked}
          />{" "}
          Buy player
        </label>
        <label className={`btn btn-secondary ${isSelling && "active"}`}>
          <input
            type="radio"
            name="selling"
            autoComplete="off"
            onClick={handleButtonClicked}
          />{" "}
          Sell player
        </label>
        <label className={`btn btn-secondary ${isRelisting && "active"}`}>
          <input
            type="radio"
            name="relisting"
            autoComplete="off"
            onClick={handleButtonClicked}
          />{" "}
          Relist player
        </label>
      </div>
      <BuyPlayer username={username} visibility={isBuying} />
      <SellPlayer username={username} visibility={isSelling} />
      <RelistPlayer username={username} visibility={isRelisting} />
    </div>
  );
};

export default Index;
