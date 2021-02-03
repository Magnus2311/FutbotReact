import { Action, Reducer } from "redux";
import { AppThunk } from ".";
import { User } from "../interfaces/Models";
import { get } from "../services/fetch/fetch";

export interface UsersState {
  users: User[];
}

interface LoadUsersAction {
  type: "USERS_LOADED";
  users: User[];
}

type KnownAction = LoadUsersAction;

const loadUsers = (users: User[]) =>
  ({
    type: "USERS_LOADED",
    users: users,
  } as LoadUsersAction);

export const actionCreators = {
  loadUsers: (): AppThunk<void, KnownAction> => {
    return (dispatch) => {
      get<User[]>("/api/users/getAll").then((users) => {
        dispatch<any>(loadUsers(users));
      });
    };
  },
};

export const reducer: Reducer<UsersState> = (
  state: UsersState | undefined,
  incomingAction: Action
) => {
  if (state === undefined) return { users: [] };

  const action = incomingAction as KnownAction;

  switch (action.type) {
    case "USERS_LOADED":
      return { ...state.users, users: action.users };
    default:
      return state;
  }
};
