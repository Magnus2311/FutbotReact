import { toast } from "react-toastify";
import { Action, Reducer } from "redux";
import { AppThunk } from ".";
import { Role } from "../interfaces/Models";
import { get, post } from "../services/fetch/fetch";

export interface RolesState {
  roles: Role[];
}

export interface AddRole {
  type: "ROLE_ADDED";
  role: Role;
}

export interface LoadRole {
  type: "ROLES_LOADED";
  roles: Role[];
}

export interface EditRole {
  type: "ROLE_EDITED";
  role: Role;
}

type KnownAction = AddRole | LoadRole | EditRole;

const addRole = (role: Role) => ({ type: "ROLE_ADDED", role } as AddRole);
const loadRoles = (roles: Role[]) =>
  ({ type: "ROLES_LOADED", roles } as LoadRole);
const editRole = (role: Role) => ({ type: "ROLE_EDITED", role } as EditRole);

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
            toast.success("Role added successfully!");
          } else {
            toast.error("Adding role failed! Try again!");
          }
        })
        .catch((error) => {
          debugger;
          toast.error("Adding role failed! Try again!" + error);
        });
    };
  },
  loadRoles: (): AppThunk<void, KnownAction> => {
    return (dispatch) => {
      debugger;
      get<Role[]>("/api/roles/getall")
        .then((roles) => {
          dispatch<any>(loadRoles(roles));
        })
        .catch((error) => {
          console.log(error);
          toast.error("Loading roles failed!");
        });
    };
  },
  editRole: (role: Role): AppThunk<void, KnownAction> => {
    return (dispatch) => {
      post("/api/roles/update", role, "PUT")
        .then(() => {
          dispatch<any>(editRole(role));
          toast.success("Role updated successfully!");
        })
        .catch((error) => {
          console.log(error);
          toast.error("Role was not updated!");
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
    case "ROLES_LOADED":
      return { ...state.roles, roles: action.roles };
    default:
      return state;
  }
};
