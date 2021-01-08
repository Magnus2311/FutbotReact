import React, {
  FormEvent,
  FunctionComponent,
  MouseEvent,
  useEffect,
  useState,
} from "react";
import { RouteComponentProps } from "react-router-dom";
import { get } from "../../../services/fetch/fetch";
import BuyPlayer from "../Trade/BuyPlayer";
import SellPlayer from "../Trade/SellPlayer";
import RelistPlayer from "../Trade/RelistPlayer";
import * as activePlayersActions from "../../../store/activePlayers";
import ActivePlayers from "../Trade/ActivePlayers";
import { ApplicationState } from "../../../store";
import { connect } from "react-redux";
import { PlayerToBuy } from "../../../interfaces/Models";

interface MatchParams {
  username: string;
}

interface Props extends RouteComponentProps<MatchParams> {
  playersToBuy: PlayerToBuy[];
  onLoadActivePlayers: (eaAccountUsername: string) => void;
}

const Index: FunctionComponent<Props> = (props) => {
  const { username } = props.match.params;
  const { playersToBuy, onLoadActivePlayers } = props;
  const [isBuying, setIsBuying] = useState(true);
  const [isSelling, setIsSelling] = useState(false);
  const [isRelisting, setIsRelisting] = useState(false);
  useEffect(() => onLoadActivePlayers(username), []);

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
    <div
      style={{
        display: "grid",
        placeItems: "centered",
        width: "100%",
      }}
    >
      <ActivePlayers
        eaAccountUsername={username}
        playersToBuy={playersToBuy}
        onLoadActivePlayers={onLoadActivePlayers}
      />
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

const mapStateToProps = (state: ApplicationState) => state.playersToBuy;

const mapDispatchToProps = (dispatch: any) => {
  return {
    onLoadActivePlayers: (eaAccountUsername: string) => {
      dispatch(
        activePlayersActions.actionCreators.loadPlayersToBuy(eaAccountUsername)
      );
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Index);
