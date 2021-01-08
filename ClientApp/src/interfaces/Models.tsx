export interface User {
  username: string;
  password: string;
  isConfirmed?: boolean;
  createdDate: Date;
  eaAccounts: EaAccount[];
}

export interface EaAccount {
  username: string;
  password: string;
  coins: number;
}

export interface LoginResponse {
  isSuccessful: boolean;
  token: LoginToken;
}

export interface LoginToken {
  expires_in: Date;
  access_token: string;
  isConfirmed: boolean;
  username: string;
}

export const enum LoginStatus {
  Unknown,
  Logged,
  WaitingForSecurityCode,
  WrongSecurityCode,
  WrongCredentials,
}

export enum SellDuration {
  OneHour,
  ThreeHours,
  SixHours,
  TwelveHours,
  OneDay,
  ThreeDays,
}

export interface BidPlayerDTO {
  username: string;
  name: string;
  maxPrice: number;
  maxActiveBids: number;
  isBin: boolean;
  rating: number;
}

export interface SellPlayerDTO {
  username: string;
  name: string;
  bidPrice: number;
  binPrice: number;
  duration: SellDuration;
}

export interface PlayerToBuy {
  eaAccountUsername: string;
  name: string;
  rating: number;
  isBin: boolean;
  maxActiveBids: number;
  maxPrice: number;
}

//export type {
//    User,
//    EaAccount,
//    LoginResponse,
//    LoginToken
//};
