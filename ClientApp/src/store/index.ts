import { Action } from "redux";
import { ThunkAction } from "redux-thunk";
import * as EaAccounts from "./EaAccounts";
import * as PlayersToBuy from "./activePlayers";
import * as Roles from "./roles";

export interface ApplicationState {
  eaAccounts: EaAccounts.EaAccountsState | undefined;
  playersToBuy: PlayersToBuy.PlayersToBuyState | undefined;
  roles: Roles.RolesState | undefined;
}

export const reducers = {
  eaAccounts: EaAccounts.reducer,
  playersToBuy: PlayersToBuy.reducer,
  roles: Roles.reducer,
};

export type AppThunk<ReturnType, ActionType> = ThunkAction<
  ReturnType,
  ApplicationState,
  null,
  Action<ActionType>
>;
