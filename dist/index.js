"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
var database_1 = require("@cloudbase/database");
var auth_1 = __importDefault(require("./auth"));
var Storage = __importStar(require("./storage"));
var Functions = __importStar(require("./functions"));
var request_1 = require("./lib/request");
var events_1 = require("./lib/events");
var adapters_1 = require("./adapters");
var DEFAULT_INIT_CONFIG = {
    timeout: 15000,
    mode: "WEB"
};
var TCB = (function () {
    function TCB(config) {
        this.config = config ? config : this.config;
        this.authObj = undefined;
    }
    TCB.prototype.init = function (config) {
        this.config = __assign({}, DEFAULT_INIT_CONFIG, config);
        return new TCB(this.config);
    };
    TCB.prototype.database = function (dbConfig) {
        database_1.Db.reqClass = request_1.Request;
        database_1.Db.wsClass = adapters_1.adapter.wsClass;
        if (!this.authObj) {
            console.warn('需要app.auth()授权');
            return;
        }
        database_1.Db.getAccessToken = this.authObj.getAccessToken.bind(this.authObj);
        if (!database_1.Db.ws) {
            database_1.Db.ws = null;
        }
        return new database_1.Db(__assign({}, this.config, dbConfig));
    };
    TCB.prototype.auth = function (_a) {
        var persistence = (_a === void 0 ? {} : _a).persistence;
        if (this.authObj) {
            console.warn('tcb实例只存在一个auth对象');
            return this.authObj;
        }
        this.config = __assign({}, this.config, { persistence: persistence || adapters_1.adapter.primaryStorage || 'session' });
        this.authObj = new auth_1.default(this.config);
        return this.authObj;
    };
    TCB.prototype.on = function (eventName, callback) {
        return events_1.addEventListener.apply(this, [eventName, callback]);
    };
    TCB.prototype.off = function (eventName, callback) {
        return events_1.removeEventListener.apply(this, [eventName, callback]);
    };
    TCB.prototype.callFunction = function (params, callback) {
        return Functions.callFunction.apply(this, [params, callback]);
    };
    TCB.prototype.deleteFile = function (params, callback) {
        return Storage.deleteFile.apply(this, [params, callback]);
    };
    TCB.prototype.getTempFileURL = function (params, callback) {
        return Storage.getTempFileURL.apply(this, [params, callback]);
    };
    TCB.prototype.downloadFile = function (params, callback) {
        return Storage.downloadFile.apply(this, [params, callback]);
    };
    TCB.prototype.uploadFile = function (params, callback) {
        return Storage.uploadFile.apply(this, [params, callback]);
    };
    return TCB;
}());
var tcb = new TCB();
try {
    window.tcb = tcb;
}
catch (e) {
}
module.exports = tcb;
