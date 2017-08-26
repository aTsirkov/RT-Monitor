"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var AppSettings = (function () {
    function AppSettings() {
    }
    return AppSettings;
}());
AppSettings.SQLConnection = {
    Develop: {
        server: '192.168.20.33',
        userName: 'sa',
        password: 'Super888',
        options: {
            database: 'db_trainer',
            port: '1433',
            rowCollectionOnDone: true,
            driver: 'SQL Server Native Client 11.0'
        },
        debug: {
            packet: true,
            data: true,
            payload: true,
            token: false,
            log: true
        }
    },
    Product: {
        server: '10.27.156.10',
        userName: 'MonitorReader',
        password: 'RealTime',
        options: {
            database: 'collector',
            port: '1433',
            //encrypt: true,
            rowCollectionOnDone: true,
            driver: 'SQL Server Native Client 11.0'
        },
        debug: {
            packet: true,
            data: true,
            payload: true,
            token: false,
            log: true
        }
    },
    Home: {
        server: '192.168.0.152',
        userName: 'sa',
        password: 'Super888',
        options: {
            database: 'db_trainer',
            port: '1433',
            //encrypt: true,
            rowCollectionOnDone: true,
            driver: 'SQL Server Native Client 11.0'
        },
        debug: {
            packet: true,
            data: true,
            payload: true,
            token: false,
            log: true
        }
    }
};
exports.AppSettings = AppSettings;
//# sourceMappingURL=app.settings.js.map