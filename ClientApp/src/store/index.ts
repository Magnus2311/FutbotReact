import { Action } from 'redux';
import { ThunkAction } from 'redux-thunk';
import * as Counter from './Counter';
import * as User from './User';

export interface ApplicationState {
    counter: Counter.CounterState | undefined;
    user: User.UserState | undefined;
}

export const reducers = {
    counter: Counter.reducer,
    user: User.reducer
};

export type AppThunk<ReturnType, ActionType> =
    ThunkAction<ReturnType, ApplicationState, null, Action<ActionType>>