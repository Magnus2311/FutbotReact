import React, { FunctionComponent, MouseEvent, useState } from "react";
import { PlayerToBuy } from "../../../interfaces/Models";
import "./ActivePlayers.scss";

interface ActivePlayersProps {
  playersToBuy: PlayerToBuy[];
}

const ActivePlayers: FunctionComponent<ActivePlayersProps> = ({
  playersToBuy,
}) => {
  return (
    <>
      {playersToBuy && playersToBuy.length > 0 && <h4>Active players</h4>}
      <div className="active-players">
        {playersToBuy.map((playerToBuy) => {
          return <ActivePlayer player={playerToBuy} />;
        })}
      </div>
    </>
  );
};

interface SelectedPlayerProps {
  player: PlayerToBuy;
}

const ActivePlayer: FunctionComponent<SelectedPlayerProps> = ({ player }) => {
  const [isClicked, setIsClicked] = useState(false);

  const handleOnClick = (e: MouseEvent<HTMLDivElement>) => {
    setIsClicked(!isClicked);
  };

  return (
    <div className="active-player" key={player.name} onClick={handleOnClick}>
      <div className="base">
        <div>{player.name}</div>
        <div className="rating">{player.rating}</div>
      </div>
      <div
        className="additional-info"
        style={{
          maxHeight: isClicked ? "70px" : "0",
          opacity: isClicked ? "1" : "0",
        }}
      >
        <div className="row" style={{ width: "100%", paddingLeft: "3rem" }}>
          <div className="col col-lg-4 col-md-4 col-sm-12 col-12 sub-elements">
            <div className="sub-element-name">Max active bids: </div>
            <div>{player.maxActiveBids}</div>
          </div>
          <div className="col col-lg-4 col-md-4 col-sm-12 col-12 sub-elements">
            <div className="sub-element-name">Max price: </div>
            <div>{player.maxPrice}</div>
          </div>
          <div className="col col-lg-4 col-md-4 col-sm-12 col-12 sub-elements">
            <div className="sub-element-name">Only bin buy: </div>
            <div>{player.isBin.toString()}</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ActivePlayers;
