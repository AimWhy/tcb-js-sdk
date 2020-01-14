// Generated by dts-bundle v0.7.3
// Dependencies for this module:
//   ../@cloudbase/database
//   ../@cloudbase/adapter-interface

import { Db } from '@cloudbase/database';
import { SDKAdapterInterface, CloudbaseAdapter } from '@cloudbase/adapter-interface';

interface ICloudbaseConfig {
    env: string;
    timeout?: number;
    persistence?: string;
    adapter?: SDKAdapterInterface;
}
type Persistence = 'local' | 'session' | 'none';
class TCB {
    config: ICloudbaseConfig;
    authObj: Auth;
    constructor(config?: ICloudbaseConfig);
    init(config: ICloudbaseConfig): TCB;
    database(dbConfig?: object): Db;
    auth({ persistence }?: {
        persistence?: Persistence;
    }): Auth;
    on(eventName: string, callback: Function): void;
    off(eventName: string, callback: Function): void;
    callFunction(params: {
        name: string;
        data: any;
        query: any;
        parse: boolean;
    }, callback?: Function): any;
    deleteFile(params: {
        fileList: string[];
    }, callback?: Function): any;
    getTempFileURL(params: {
        fileList: string[];
    }, callback?: Function): any;
    downloadFile(params: {
        fileID: string;
    }, callback?: Function): Promise<any>;
    uploadFile(params: {
        cloudPath: string;
        filePath: File;
        onUploadProgress?: Function;
    }, callback?: Function): any;
    useAdapters(adapters: CloudbaseAdapter | CloudbaseAdapter[]): void;
}
const tcb: TCB;
export = tcb;

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
export class Auth extends AuthProvider {
    config: Config;
    customAuthProvider: AuthProvider;
    _shouldRefreshAccessToken: Function;
    _anonymousAuthProvider: AnonymousAuthProvider;
    constructor(config: Config);
    weixinAuthProvider({ appid, scope, loginMode, state }: {
        appid: any;
        scope: any;
        loginMode: any;
        state: any;
    }): WeixinAuthProvider;
    signInAnonymously(): Promise<{
        credential: {
            refreshToken: any;
        };
    }>;
    linkAndRetrieveDataWithTicket(ticket: string): Promise<{
        credential: {
            refreshToken: any;
        };
    }>;
    signOut(): Promise<any>;
    getAccessToken(): Promise<{
        accessToken: string;
        env: string;
    }>;
    onLoginStateExpire(callback: Function): void;
    getLoginState(): Promise<LoginResult>;
    signInWithTicket(ticket: string): Promise<LoginResult>;
    shouldRefreshAccessToken(hook: any): void;
    getUserInfo(): any;
}

export class WeixinAuthProvider extends AuthProvider {
    config: Config;
    constructor(config: Config, appid: string, scope: string, loginMode?: string, state?: string);
    signIn(): Promise<LoginResult>;
    _signIn(): Promise<LoginResult>;
    redirect(): any;
}

export class AnonymousAuthProvider extends AuthProvider {
    signIn(): Promise<{
        credential: {
            refreshToken: any;
        };
    }>;
    linkAndRetrieveDataWithTicket(ticket: string): Promise<{
        credential: {
            refreshToken: any;
        };
    }>;
}

export enum LOGINTYPE {
    ANONYMOUS = "ANONYMOUS",
    WECHAT = "WECHAT",
    CUSTOM = "CUSTOM",
    NULL = "NULL"
}
export class AuthProvider {
    config: Config;
    constructor(config: Config);
    get loginType(): LOGINTYPE;
    setRefreshToken(refreshToken: any): void;
    getRefreshTokenByWXCode(appid: string, loginType: string, code: string): Promise<{
        refreshToken: string;
        accessToken: string;
        accessTokenExpire: number;
    }>;
}

export interface LoginResult {
    isAnonymous?: boolean;
    credential: {
        refreshToken: string;
        accessToken?: string;
    };
}

export const SDK_VERISON: any;
export interface Config {
    env?: string;
    token?: string;
    timeout?: number;
    proxy?: string;
    persistence?: string;
}
export type KV<T> = {
    [key: string]: T;
};
interface MetaData {
    url: string;
    token: string;
    authorization: string;
    fileId: string;
    cosFileId: string;
}
export interface MetaDataRes {
    data: MetaData;
    requestId: string;
}
export type LOGIN_TYPE = 'WECHAT-OPEN' | 'WECHAT-PUBLIC' | 'ANONYMOUS' | 'CUSTOM';
export const ACCESS_TOKEN = "access_token";
export const ACCESS_TOKEN_Expire = "access_token_expire";
export const REFRESH_TOKEN = "refresh_token";
export const ANONYMOUS_UUID = "anonymous_uuid";
export const LOGIN_TYPE_KEY = "login_type";
export const protocol: string;
export const BASE_URL: string;
export {};

