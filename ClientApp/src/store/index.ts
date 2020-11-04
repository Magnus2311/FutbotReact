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

export interface AppThunkAction<TAction> {
    (dispatch: (action: TAction) => void, getState: () => ApplicationState): void;
}
