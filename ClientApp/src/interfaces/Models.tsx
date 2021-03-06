import { ObjectId } from "mongodb";

export interface User {
  username: string;
  password: string;
  isConfirmed?: boolean;
  createdDate: Date;
  eaAccounts: EaAccount[];
  roles: string[];
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
  player: Player;
  maxPrice: number;
  maxActiveBids: number;
  isBin: boolean;
  username: string;
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

export interface Role {
  id?: string;
  name: string;
  permissions: string[];
}

export interface Player {
  id: string;
  name: string;
  rating: number;
}

//export type {
//    User,
//    EaAccount,
//    LoginResponse,
//    LoginToken
//};
