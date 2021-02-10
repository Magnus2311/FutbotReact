import { useStore } from "react-redux";
import { toast } from "react-toastify";
import { Action, Reducer } from "redux";
import { AppThunk } from ".";
import { User } from "../interfaces/Models";
import { get, put } from "../services/fetch/fetch";

export interface UsersState {
  users: User[];
}

interface LoadUsersAction {
  type: "USERS_LOADED";
  users: User[];
}

interface UpdateUserRolesAction {
  type: "USER_ROLES_CHANGED";
  user: User;
  rolesIds: string[];
}

type KnownAction = LoadUsersAction | UpdateUserRolesAction;

const loadUsers = (users: User[]) =>
  ({
    type: "USERS_LOADED",
    users: users,
  } as LoadUsersAction);

const updateUserRoles = (user: User) =>
  ({ type: "USER_ROLES_CHANGED", user } as UpdateUserRolesAction);

export const actionCreators = {
  loadUsers: (): AppThunk<void, KnownAction> => {
    return (dispatch) => {
      get<User[]>("/api/users/getAll").then((users) => {
        dispatch<any>(loadUsers(users));
      });
    };
  },
  updateUserRoles: (user: User): AppThunk<void, KnownAction> => {
    return (dispatch) => {
      fetch("/api/users/updateUserRoles", {
        method: "PUT",
        cache: "no-cache",
        credentials: "same-origin",
        mode: "cors",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(user),
      })
        .then((response) => {
          if (response.status === 200) {
            dispatch<any>(updateUserRoles(user));
            toast.success("Role updated successfully!");
          }
        })
        .catch((error) => {
          console.log(error);
          toast.error("Role was not updated!");
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
    case "USER_ROLES_CHANGED":
      return {
        ...state,
        users: state.users.map((user) =>
          user.username.toUpperCase() === action.user.username.toUpperCase()
            ? {
                ...user,
                roles: action.user.roles,
              }
            : user
        ),
      };
    default:
      return state;
  }
};
