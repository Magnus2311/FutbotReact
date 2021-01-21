import { toast } from 'react-toastify';
import { Action, Reducer } from 'redux';
import { AppThunk } from '.';
import { EaAccount } from '../interfaces/Models';
import { get } from '../services/fetch/fetch';

export interface EaAccountsState {
    eaAccounts: EaAccount[];
}

export interface AddEaAccount { type: "ADD_EA_ACCOUNT_SUCCESS", eaAccount: EaAccount }
export interface LoadEaAccounts { type: "LOAD_EA_ACCOUNTS_SUCCESS", eaAccounts: EaAccount[] }

export type KnownAction = AddEaAccount | LoadEaAccounts;

const addEaAccountSuccess = (eaAccount: EaAccount) => ({ type: 'ADD_EA_ACCOUNT_SUCCESS', eaAccount } as AddEaAccount)
const loadEaAccountsSuccess = (eaAccounts: EaAccount[]) => ({ type: 'LOAD_EA_ACCOUNTS_SUCCESS', eaAccounts } as LoadEaAccounts)

export const actionCreators = {
    addEaAccount: (eaAccount: EaAccount): AppThunk<void, KnownAction> => {
        return (dispatch) => {
            fetch("/api/eaaccounts/add/", {
                method: "POST",
                cache: "no-cache",
                credentials: "same-origin",
                mode: "cors",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(eaAccount)
            }).then(response => {
                debugger;
                if (response.status === 200) {
                    dispatch<any>(addEaAccountSuccess(eaAccount));
                } else {
                    toast.error("Adding EA account failed! Try again!");
                }
            }).catch(error => {
                debugger;
                toast.error("Adding EA account failed! Try again!" + error);
            });
        }
    },
    loadEaAccounts: (): AppThunk<void, KnownAction> => {
        return (dispatch) => {
            get<EaAccount[]>("api/eaaccounts/get")
            .then(eaAccounts => dispatch<any>(loadEaAccountsSuccess(eaAccounts)));
        }
    }
};

export const reducer: Reducer<EaAccountsState> = (state: EaAccountsState | undefined, incomingAction: Action): EaAccountsState => {
    if (state === undefined) {
        return { eaAccounts: [] };
    }

    if (state.eaAccounts === undefined)
        state.eaAccounts = [];

    const action = incomingAction as KnownAction;
    switch (action.type) {
        case 'ADD_EA_ACCOUNT_SUCCESS':
            toast.success("You've added your EA account successfully!");
            return { eaAccounts: [...state.eaAccounts, action.eaAccount] };
        case "LOAD_EA_ACCOUNTS_SUCCESS":
            return { ...state.eaAccounts, eaAccounts: action.eaAccounts }
        default:
            return state;
    }
};
