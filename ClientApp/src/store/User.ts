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
export interface LoginUserRequestedAction { type: 'LOGIN_USER_REQUESTED' }
export interface LoginUserSucceededAction {type: "LOGIN_USER_SUCCEEDED", user: User}
export interface LogoutUserAction { type: 'LOGOUT_USER', user: User }

export type KnownAction = AddUserAction | LoginUserRequestedAction | LoginUserSucceededAction | LogoutUserAction;

const loginRequested = () => ({ type: 'LOGIN_USER_REQUESTED' } as LoginUserRequestedAction);
const loginSucceeded = (user: User) => ({ type: 'LOGIN_USER_SUCCEEDED', user } as LoginUserSucceededAction);
const logoutSuccess = () => ({ type: 'LOGOUT_USER' } as LogoutUserAction)

export const actionCreators = {
    login: (user: User): AppThunkAction<KnownAction> => (dispatch) => {
        if (user) {
            fetch(`api/users/login`, {
                method: "POST",
                body: JSON.stringify(user)
            })
                .then(() => dispatch(loginSucceeded(user)));

            dispatch(loginRequested());
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
        case 'LOGIN_USER_REQUESTED':
            return state;
            case 'LOGIN_USER_SUCCEEDED':
                return { ...state, user: action.user };
        case 'LOGOUT_USER':
            return { user: emptyUser };
        default:
            return state;
    }
};
