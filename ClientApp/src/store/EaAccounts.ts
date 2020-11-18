import { toast } from 'react-toastify';
import { Action, Reducer } from 'redux';
import { AppThunk } from '.';
import { EaAccount } from '../interfaces/Models';

export interface EaAccountsState {
    eaAccounts: EaAccount[];
}

export interface AddEaAccount { type: "ADD_EA_ACCOUNT_SUCCESS", eaAccount: EaAccount }

// Declare a 'discriminated union' type. This guarantees that all references to 'type' properties contain one of the
// declared type strings (and not any other arbitrary string).
export type KnownAction = AddEaAccount;

const addEaAccountSuccess = (eaAccount: EaAccount) => ({ type: 'ADD_EA_ACCOUNT_SUCCESS', eaAccount } as AddEaAccount)
// ----------------
// ACTION CREATORS - These are functions exposed to UI components that will trigger a state transition.
// They don't directly mutate state, but they can have external side-effects (such as loading data).

export const actionCreators = {
    addEaAccount: (eaAccount: EaAccount): AppThunk<void, KnownAction> => {
        return (dispatch) => {
            fetch("api/eaaccounts/add/", {
                method: "POST",
                cache: "no-cache",
                credentials: "same-origin",
                mode: "cors",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(eaAccount)
            }).then(response => {
                if (response.status === 200) {
                    dispatch<any>(addEaAccountSuccess(eaAccount));
                } else {
                    toast.error("Adding EA account failed! Try again!");
                    dispatch<any>(addEaAccountSuccess(eaAccount));
                }
            }).catch(error => {
                toast.error("Adding EA account failed! Try again!" + error);
                dispatch<any>(addEaAccountSuccess(eaAccount));
            });
        }
    }
};

export const reducer: Reducer<EaAccountsState> = (state: EaAccountsState | undefined, incomingAction: Action): EaAccountsState => {
    if (state === undefined) {
        return { eaAccounts: [] };
    }

    const action = incomingAction as KnownAction;
    switch (action.type) {
        case 'ADD_EA_ACCOUNT_SUCCESS':
            toast.success("You've added your EA account successfully!");
            return { eaAccounts: [...state.eaAccounts, action.eaAccount] };
        default:
            return state;
    }
};
