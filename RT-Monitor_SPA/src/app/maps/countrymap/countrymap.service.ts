import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';

import { Observable } from 'rxjs/Rx';

@Injectable()
export class CountryMapService {
    constructor() {
    }

    public getCountryMap() {
        var a = require('./ru-all-disputed.geo.json');
        return a;
        /* this.jsonp.get('http://win-cnmcav8afvc/SiteAssets/RT-Monitor/static/ru-all-disputed.geo.json')
            .map((response: any) => response.json()); */
    }

    public getCities() {
        return [{
            name: 'Томск',
            lat: 56.499388,
            lon: 84.985972,
            a: 'ddddd'
        }, {
            name: 'Кемерово',
            lat: 55.346757,
            lon: 86.057922
        }, {
            name: 'Красноярск',
            lat: 56.063447,
            lon: 92.964850
        }, {
            name: 'Ангарск',
            lat: 52.544820,
            lon: 103.863377
        }, {
            name: 'Нижневартовск',
            lat: 60.943790,
            lon: 76.538445
        }, {
            name: 'Сургут',
            lat: 61.256609,
            lon: 73.381973
        }, {
            name: 'Пыть-Ях',
            lat: 60.721062,
            lon: 72.815516
        }, {
            name: 'Губкинский',
            lat: 64.446482,
            lon: 76.465514
        }, {
            name: 'Ноябрьск',
            lat: 63.182702,
            lon: 75.451301
        }, {
            name: 'Нягань',
            lat: 62.125850,
            lon: 65.375749
        }, {
            name: 'Тобольск',
            lat: 58.199046,
            lon: 68.266832
        }, {
            name: 'Пермь',
            lat: 58.007795,
            lon: 56.252847
        }, {
            name: 'Чайковский',
            lat: 56.765748,
            lon: 54.126082
        }, {
            name: 'Благовещенск',
            lat: 50.272236,
            lon: 127.537521
        }, {
            name: 'Тольяти',
            lat: 53.508009,
            lon: 49.428225
        }, {
            name: 'Новокубышевск',
            lat: 53.093933,
            lon: 49.898414
        }, {
            name: 'Кстово',
            lat: 56.131956,
            lon: 44.173044
        }, {
            name: 'Нижний Новгород',
            lat: 56.293423,
            lon: 43.931547
        }, {
            name: 'Железнодорожный',
            lat: 55.732116,
            lon: 38.004122
        }, {
            name: 'Узловая',
            lat: 53.979427,
            lon: 38.175462
        }, {
            name: 'Тверь',
            lat: 56.857975,
            lon: 35.915886
        }, {
            name: 'Курск',
            lat: 51.709057,
            lon: 36.156121
        }, {
            name: 'Воронеж',
            lat: 51.675770,
            lon: 39.219166
        }, {
            name: 'Москва',
            lat: 55.755303,
            lon: 37.621328
        }
        ];
    }

    private handleError(error: Response) {
        return Observable.throw(error.json().error || "Server error");
    } 
}