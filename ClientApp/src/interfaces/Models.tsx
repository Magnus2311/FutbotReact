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

export type {
    User,
    EaAccount
};