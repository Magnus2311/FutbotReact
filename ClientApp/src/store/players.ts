import { toast } from "react-toastify";
import { Action, Reducer } from "redux";
import { ApplicationState, AppThunk } from ".";
import { Player } from "../interfaces/Models";
import { get } from "../services/fetch/fetch";

export interface PlayersState {
  players: Player[];
}

export interface LoadPlayersAction {
  type: "LOAD_PLAYERS_ACTION";
  players: Player[];
}

type KnownAction = LoadPlayersAction;

const loadPlayers = (players: Player[]) =>
  ({ type: "LOAD_PLAYERS_ACTION", players: players } as LoadPlayersAction);

export const actionCreators = {
  onLoadPlayers: (): AppThunk<void, KnownAction> => {
    return (dispatch) => {
      get<Player[]>("/api/players/getall")
        .then((players) => {
          dispatch<any>(loadPlayers(players));
        })
        .catch((error) => {
          toast.error("Players loading failed!");
          console.log(error);
        });
    };
  },
};

export const reducer: Reducer<PlayersState> = (
  state: PlayersState | undefined,
  incomingAction: Action
): PlayersState => {
  if (state === undefined) return { players: [] };

  const action = incomingAction as KnownAction;

  switch (action.type) {
    case "LOAD_PLAYERS_ACTION":
      return { ...state.players, players: action.players };
    default:
      return state;
  }
};
