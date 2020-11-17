import { Action } from 'redux';
import { ThunkAction } from 'redux-thunk';
import * as Counter from './Counter';

export interface ApplicationState {
    counter: Counter.CounterState | undefined;
}

export const reducers = {
    counter: Counter.reducer,
};

export type AppThunk<ReturnType, ActionType> =
    ThunkAction<ReturnType, ApplicationState, null, Action<ActionType>>