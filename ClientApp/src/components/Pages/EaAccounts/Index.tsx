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
import * as playersActions from "../../../store/players";
import ActivePlayers from "../Trade/ActivePlayers";
import { ApplicationState } from "../../../store";
import { connect } from "react-redux";
import { Player, PlayerToBuy } from "../../../interfaces/Models";
import "./Index.scss";
import RadioButtonsContainer, {
  RadioButton,
} from "../../Common/Controls/RadioButtonsContainer";

const add = require("./../../../images/add_over.png");

interface MatchParams {
  username: string;
}

interface Props extends RouteComponentProps<MatchParams> {
  playersToBuy: {
    playersToBuy: PlayerToBuy[];
  };
  players: {
    players: Player[];
  };
  onLoadActivePlayers: (eaAccountUsername: string) => void;
  onLoadPlayers: () => void;
}

const Index: FunctionComponent<Props> = (props) => {
  const { username } = props.match.params;
  const { onLoadActivePlayers, onLoadPlayers } = props;
  const { playersToBuy } = props.playersToBuy;
  const { players } = props.players;
  const [isAdding, setIsAdding] = useState(false);
  const radioButtons = [
    {
      name: "Buy player",
      isActive: true,
      Component: BuyPlayer,
      props: {
        username: username,
      },
    },
    {
      name: "Sell player",
      isActive: false,
      Component: SellPlayer,
      props: {
        username: username,
      },
    },
    {
      name: "Relist player",
      isActive: false,
      Component: RelistPlayer,
      props: {
        username: username,
      },
    },
  ] as RadioButton[];
  useEffect(() => {
    onLoadActivePlayers(username);
    onLoadPlayers();
  }, []);

  const handleRelistAll = (e: FormEvent<HTMLButtonElement>) => {
    e.preventDefault();

    get("/api/relist").catch((error) => console.log(error));
  };

  const handleFrontClick = (e: MouseEvent<HTMLDivElement>) => {
    if (!isAdding) setIsAdding(!isAdding);
  };

  const handleBackClose = (e: MouseEvent<HTMLDivElement>) => {
    if (isAdding) setIsAdding(!isAdding);
  };

  return (
    <div
      style={{
        display: "grid",
        placeItems: "center",
        width: "100%",
      }}
    >
      <h2 style={{ marginBottom: "1.5rem" }}>{username}</h2>
      <ActivePlayers playersToBuy={playersToBuy} />
      <div
        className={`flip-card`}
        style={{
          width: isAdding ? "100%" : "10%",
          backgroundColor: isAdding
            ? "transparent"
            : "background-color: var(--form-control-bkg-color)",
          cursor: isAdding ? "auto" : "cursor",
        }}
        onClick={handleFrontClick}
      >
        <div className={`flip-card-inner ${isAdding && "rotate"}`}>
          <div className="flip-card-front">
            <div>
              <img src={add} />
            </div>
            <div>
              <span>Add new player</span>
            </div>
          </div>
          <div className={`flip-card-back`}>
            <div
              className="fut-btn"
              style={{
                position: "absolute",
                right: "10px",
                top: "6px",
              }}
              onClick={handleBackClose}
            >
              X
            </div>
            <RadioButtonsContainer radioButtons={radioButtons} />
          </div>
        </div>
      </div>
    </div>
  );
};

const mapStateToProps = (state: ApplicationState) => {
  return { playersToBuy: state.playersToBuy, players: state.players };
};

const mapDispatchToProps = (dispatch: any) => {
  return {
    onLoadActivePlayers: (eaAccountUsername: string) => {
      dispatch(
        activePlayersActions.actionCreators.loadPlayersToBuy(eaAccountUsername)
      );
    },
    onLoadPlayers: () => {
      dispatch(playersActions.actionCreators.onLoadPlayers());
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Index);
