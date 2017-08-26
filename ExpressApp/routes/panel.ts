import express = require('express');

var Connection = require('tedious').Connection;
var Request = require('tedious').Request;
var config = require('../Settings/app.settings').AppSettings.SQLConnection.Product;    //Home //Product; //Develop

export function lastPoint(req: express.Request, res: express.Response) {
    var connection = new Connection(config, function (err) {
        if (err) console.error('connection CallBack => ', err);
    });

    connection.on('connect', connected);
    connection.on('infoMessage', infoError);
    connection.on('errorMessage', infoError);
    connection.on('end', end);
    connection.on('debug', debug);

    function connected(err) {
        console.log('connected=> ' + err);

        var dataSet = [];
        var request = new Request("SELECT top 1 ((CAST(DATEDIFF(second, '1970-01-01', CAST(Timestamp AS date)) AS bigint)*1000) + DATEDIFF(ms, CAST(Timestamp AS date), Timestamp)) as TimestampMS"
            + ", * FROM dbo.VSK_test_K41_3 ORDER BY Timestamp DESC", function (err, rowCount) {
            if (err) {
                console.log('requestError=>' + err);
            }
            else {
                console.log('Result: ' + rowCount + ' rows');
                res.send(dataSet);
            }
            connection.close();
        });

        request.on('row', function (columns) {
            var item = {};
            var iName: string;

            columns.forEach(function (col) {
                iName = col.metadata.colName;
                item[iName] = col.value * 1;
            })
            dataSet.push(item);
        });

        request.on('done', function (rowCount, more, rows) {
            console.log(rowCount + ' rows returned');
            //dataSet = rows;
        });

        connection.execSql(request);

    }
    function infoError(info) { console.log('infoError=> ' + info); }
    function debug(message) { console.log('debug=> ' + message); }
    function end() { }

}

export function pointsList(req: express.Request, res: express.Response) {
    var connection = new Connection(config, function (err) {
        if (err) console.error('connection CallBack => ', err);
    });

    connection.on('connect', connected);
    connection.on('infoMessage', infoError);
    connection.on('errorMessage', infoError);
    connection.on('end', end);
    connection.on('debug', debug);

    function connected(err) {
        console.log('connected=> ' + err);

        var dataSet = [];
        var request = new Request("SELECT ((CAST(DATEDIFF(second, '1970-01-01', CAST(Timestamp AS date)) AS bigint)*1000) + DATEDIFF(ms, CAST(Timestamp AS date), Timestamp)) as TimestampMS"
            + ", * FROM dbo.VSK_test_K41_3 ORDER BY Timestamp", function (err, rowCount) {

            if (err) {
                console.log('requestError=>' + err);
            }
            else {
                console.log('Result: ' + rowCount + ' rows');
                res.send(dataSet);
            }
            connection.close();
        });

        request.on('row', function (columns) {
            var item = {};
            var iName: string;

            columns.forEach(function (col) {
                iName = col.metadata.colName;
                item[iName] = col.value * 1;
            })
            dataSet.push(item);
        });

        request.on('done', function (rowCount, more, rows) {
            console.log(rowCount + ' rows returned');
            //dataSet = rows;
        });

        connection.execSql(request);

    }
    function infoError(info) { console.log('infoError=> ' + info); }
    function debug(message) { console.log('debug=> ' + message); }
    function end() { }

}

export function lastPointM1(req: express.Request, res: express.Response) {
    var connection = new Connection(config, function (err) {
        if (err) console.error('connection CallBack => ', err);
    });

    connection.on('connect', connected);
    connection.on('infoMessage', infoError);
    connection.on('errorMessage', infoError);
    connection.on('end', end);
    connection.on('debug', debug);

    function connected(err) {
        console.log('connected=> ' + err);

        var dataSet = [];
        var request = new Request("SELECT top 1 * FROM dbo.SNH_M1_Predective ORDER BY Timestamp DESC", function (err, rowCount) {
                if (err) {
                    console.log('requestError=>' + err);
                }
                else {
                    console.log('Result: ' + rowCount + ' rows');
                    res.send(dataSet);
                }
                connection.close();
            });

        request.on('row', function (columns) {
            var item = {};
            var iName: string;

            columns.forEach(function (col) {
                iName = col.metadata.colName;
                item[iName] = col.value * 1;
            })
            dataSet.push(item);
        });

        request.on('done', function (rowCount, more, rows) {
            console.log(rowCount + ' rows returned');
            //dataSet = rows;
        });

        connection.execSql(request);

    }
    function infoError(info) { console.log('infoError=> ' + info); }
    function debug(message) { console.log('debug=> ' + message); }
    function end() { }

}

export function pointsListM1(req: express.Request, res: express.Response) {
    var connection = new Connection(config, function (err) {
        if (err) console.error('connection CallBack => ', err);
    });

    connection.on('connect', connected);
    connection.on('infoMessage', infoError);
    connection.on('errorMessage', infoError);
    connection.on('end', end);
    connection.on('debug', debug);

    var lastTimestamp = req.query.lastTime;

    function connected(err) {
        console.log('connected=> ' + err);

        var dataSet = [];
        var request = new Request("SELECT * FROM dbo.SNH_M1_Predective WHERE Timestamp > '" + lastTimestamp + "' ORDER BY Timestamp", function (err, rowCount) {

                if (err) {
                    console.log('requestError=>' + err);
                }
                else {
                    console.log('Result: ' + rowCount + ' rows');
                    res.send(dataSet);
                }
                connection.close();
            });

        request.on('row', function (columns) {
            var item = {};
            var iName: string;

            columns.forEach(function (col) {
                iName = col.metadata.colName;
                item[iName] = col.value * 1;
            })
            dataSet.push(item);
        });

        request.on('done', function (rowCount, more, rows) {
            console.log(rowCount + ' rows returned');
        });

        connection.execSql(request);

    }
    function infoError(info) { console.log('infoError=> ' + info); }
    function debug(message) { console.log('debug=> ' + message); }
    function end() { }

}