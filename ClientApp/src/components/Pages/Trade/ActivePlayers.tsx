import React, { FunctionComponent, useEffect } from "react";
import { connect } from "react-redux";
import { PlayerToBuy } from "../../../interfaces/Models";
import { ApplicationState } from "../../../store";

interface ActivePlayersProps {
  eaAccountUsername: string;
  playersToBuy: PlayerToBuy[];
  onLoadActivePlayers: (eaAccountUsername: string) => void;
}

const ActivePlayers: FunctionComponent<ActivePlayersProps> = ({
  playersToBuy,
  eaAccountUsername,
  onLoadActivePlayers,
}) => {
  return (
    <>
      {playersToBuy.map((playerToBuy) => {
        return <div key={playerToBuy.name}>{playerToBuy.name}</div>;
      })}
    </>
  );
};

export default ActivePlayers;
