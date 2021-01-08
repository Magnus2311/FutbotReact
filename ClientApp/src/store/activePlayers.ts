import { toast } from "react-toastify";
import { Action, Reducer } from "redux";
import { AppThunk } from ".";
import { PlayerToBuy } from "../interfaces/Models";
import { get, post } from "../services/fetch/fetch";

export interface PlayersToBuyState {
    playersToBuy: PlayerToBuy[]
}

export interface AddPlayerToBuy { type: "ADD_PLAYER_TO_BUY_SUCCESS", playerToBuy: PlayerToBuy, eaAccountUsername: string}
export interface LoadPlayersToBuy { type: "LOAD_PLAYERS_TO_BUY_SUCCESS", playersToBuy: PlayerToBuy[], eaAccountUsername: string}

export type KnownAction = AddPlayerToBuy | LoadPlayersToBuy;

const addPlayerToBuySuccess = (eaAccountUsername: string, playerToBuy: PlayerToBuy) => ({ type: 'ADD_PLAYER_TO_BUY_SUCCESS', playerToBuy, eaAccountUsername } as AddPlayerToBuy)
const loadPlayersToBuySuccess = (eaAccountUsername: string, playersToBuy: PlayerToBuy[]) => ({type: "LOAD_PLAYERS_TO_BUY_SUCCESS", playersToBuy, eaAccountUsername} as LoadPlayersToBuy)

export const actionCreators = {
    addPlayerToBuy: (eaAccountUsername: string, playerToBuy: PlayerToBuy): AppThunk<void, KnownAction> => {
        return (dispatch) => {
            post(`api/activePlayers/`, playerToBuy)
                .then(() => {
                    dispatch<any>(addPlayerToBuySuccess(eaAccountUsername, playerToBuy));
                })
                .catch(() => {
                    toast.error("Adding player failed!");
                });
        }
    },
    loadPlayersToBuy: (eaAccountUsername: string): AppThunk<void, KnownAction> => {
        return (dispatch) => {
            debugger;
            get<PlayerToBuy[]>(`api/activePlayers?eaAccountUsername=${eaAccountUsername}`)
                .then(playersToBuy => {
                    dispatch<any>(loadPlayersToBuySuccess(eaAccountUsername, playersToBuy));
                })
                .catch((error) => {
                    toast.error(JSON.stringify(error));
                });
        }
    }
}

export const reducer: Reducer<PlayersToBuyState> = (state: PlayersToBuyState | undefined, incomingAction: Action): PlayersToBuyState => {
    if (state === undefined) return { playersToBuy: [] }

    const action = incomingAction as KnownAction;

    switch(action.type) {
        case "ADD_PLAYER_TO_BUY_SUCCESS": 
            toast.success("Player added successfully");
            return { playersToBuy: [...state.playersToBuy, action.playerToBuy] } ;
        case "LOAD_PLAYERS_TO_BUY_SUCCESS":
            return {...state.playersToBuy, playersToBuy: action.playersToBuy};
        default:
            return state;
    }
}