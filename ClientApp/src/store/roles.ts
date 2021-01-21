import { toast } from "react-toastify";
import { Action, Reducer } from "redux";
import { AppThunk } from ".";
import { Role } from "../interfaces/Models";

export interface RolesState {
  roles: Role[];
}

export interface AddRole {
  type: "ROLE_ADDED";
  role: Role;
}

type KnownAction = AddRole;

const addRole = (role: Role) => ({ type: "ROLE_ADDED", role } as AddRole);

export const actionCreators = {
  addRole: (role: Role): AppThunk<void, KnownAction> => {
    return (dispatch) => {
      fetch("/api/roles/add/", {
        method: "POST",
        cache: "no-cache",
        credentials: "same-origin",
        mode: "cors",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(role),
      })
        .then((response) => {
          debugger;
          if (response.status === 200) {
            dispatch<any>(addRole(role));
          } else {
            toast.error("Adding EA account failed! Try again!");
          }
        })
        .catch((error) => {
          debugger;
          toast.error("Adding EA account failed! Try again!" + error);
        });
    };
  },
};

export const reducer: Reducer<RolesState> = (
  state: RolesState | undefined,
  incomingAction: Action
): RolesState => {
  if (state === undefined) return { roles: [] };

  const action = incomingAction as KnownAction;

  switch (action.type) {
    case "ROLE_ADDED":
      return { roles: [...state.roles, action.role] };
    default:
      return state;
  }
};
