import { Action, Reducer } from 'redux';
import { AppThunkAction } from '.';
import { User } from '../interfaces/Models';

export interface UserState {
    user: User;
}

const emptyUser: User = {
    username: "",
    password: "",
    createdDate: new Date()
}

export interface AddUserAction { type: 'ADD_USER', user: User }
export interface LoginUserAction { type: 'LOGIN_USER', user: User }
export interface LogoutUserAction { type: 'LOGOUT_USER', user: User }

export type KnownAction = AddUserAction | LoginUserAction | LogoutUserAction;

const loginSuccess = (user: User) => ({ type: 'LOGIN_USER', user } as LoginUserAction);
const logoutSuccess = () => ({ type: 'LOGOUT_USER' } as LogoutUserAction)

export const actionCreators = {
    requestWeatherForecasts: (user: User): AppThunkAction<KnownAction> => (dispatch) => {
        // Only load data if it's something we don't already have (and are not already loading)

        if (user) {
            fetch(`weatherforecast`)
                .then(response => response.json() as Promise<WeatherForecast[]>)
                .then(data => {
                    dispatch({ type: 'RECEIVE_WEATHER_FORECASTS', startDateIndex: startDateIndex, forecasts: data });
                });

            dispatch({ type: 'REQUEST_WEATHER_FORECASTS', startDateIndex: startDateIndex });
        }
    }
};

export const reducer: Reducer<UserState> = (state: UserState | undefined, incomingAction: Action): UserState => {
    if (state === undefined) {
        return {
            user: emptyUser
        };
    }

    const action = incomingAction as KnownAction;
    switch (action.type) {
        case 'LOGIN_USER':
            return { user: action.user };
        case 'LOGOUT_USER':
            return { user: emptyUser };
        default:
            return state;
    }
};
