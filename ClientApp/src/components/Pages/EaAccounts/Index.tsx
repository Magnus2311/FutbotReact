import React, { FormEvent, FunctionComponent } from "react";
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

  const handleRelistAll = (e: FormEvent<HTMLButtonElement>) => {
    e.preventDefault();

    get("/api/relist").catch((error) => console.log(error));
  };

  return (
    <div>
      <h2>{username}</h2>
      <BuyPlayer username={username} />
      <hr />
      <SellPlayer username={username} />
      <hr />
      <RelistPlayer username={username} />
      <hr />
    </div>
  );
};

export default Index;
