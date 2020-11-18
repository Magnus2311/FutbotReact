import { Action } from 'redux';
import { ThunkAction } from 'redux-thunk';
import * as Counter from './Counter';
import * as EaAccounts from "./EaAccounts";

export interface ApplicationState {
    counter: Counter.CounterState | undefined;
    eaAccounts: EaAccounts.EaAccountsState;
}

export const reducers = {
    counter: Counter.reducer,
    eaAccounts: EaAccounts.reducer
};

export type AppThunk<ReturnType, ActionType> =
    ThunkAction<ReturnType, ApplicationState, null, Action<ActionType>>