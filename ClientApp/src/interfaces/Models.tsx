interface User {
    username: string,
    password: string,
    isConfirmed?: boolean,
    createdDate: Date,
    eaAccounts?: Array<EaAccount>
}

interface EaAccount {
    username: string,
    password: string
}

interface LoginResponse {
    isSuccessful: boolean,
    token: LoginToken,
}

interface LoginToken {
    expires_in: Date,
    access_token: string
}

export type {
    User,
    EaAccount,
    LoginResponse,
    LoginToken
};