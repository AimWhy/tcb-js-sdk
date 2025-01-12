import { Request } from '../lib/request';
import WeixinAuthProvider from './weixinAuthProvider';
import AuthProvider from './base';
import { LoginResult } from './interface';
import { Config } from '../types';
export interface UserInfo {
    openid: string;
    nickname?: string;
    sex?: number;
    province?: string;
    city?: string;
    country?: string;
    headimgurl?: string;
    privilege?: [string];
    unionid?: string;
}
export default class Auth extends AuthProvider {
    httpRequest: Request;
    config: Config;
    customAuthProvider: AuthProvider;
    _shouldRefreshAccessToken: Function;
    constructor(config: Config);
    weixinAuthProvider({ appid, scope, loginMode, state }: {
        appid: any;
        scope: any;
        loginMode: any;
        state: any;
    }): WeixinAuthProvider;
    signOut(): Promise<void>;
    getAccessToken(): Promise<{
        accessToken: string;
        env: string;
    }>;
    onLoginStateExpire(callback: Function): void;
    getLoginState(): Promise<LoginResult | undefined>;
    signInWithTicket(ticket: string): Promise<LoginResult>;
    shouldRefreshAccessToken(hook: any): void;
    getUserInfo(): any;
}
