import { Action } from 'redux';
import { ThunkAction } from 'redux-thunk';
import * as EaAccounts from "./EaAccounts";
import * as PlayersToBuy from "./activePlayers";

export interface ApplicationState {
    eaAccounts: EaAccounts.EaAccountsState | undefined;
    playersToBuy: PlayersToBuy.PlayersToBuyState | undefined;
}

export const reducers = {
    eaAccounts: EaAccounts.reducer,
    playersToBuy: PlayersToBuy.reducer
};

export type AppThunk<ReturnType, ActionType> =
    ThunkAction<ReturnType, ApplicationState, null, Action<ActionType>>