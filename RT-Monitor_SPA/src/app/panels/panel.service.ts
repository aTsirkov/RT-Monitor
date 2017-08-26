import { Injectable, OnDestroy } from '@angular/core';
import { Http, RequestOptions, Headers } from '@angular/http';
import { Observable } from 'rxjs/Observable';

import { ReplaySubject } from 'rxjs/Rx';
import { AppSettings } from '../shared/app.settings';
import { IDataSetM1 } from '../shared/app.entities';

@Injectable()
export class PanelService implements OnDestroy {
    public _M1Data: IDataSetM1[] = [];
    public changeData: ReplaySubject<IDataSetM1> = new ReplaySubject();

    alive: boolean = true;

    headers: Headers;
    options: RequestOptions;

    constructor(public http: Http) {
        this.headers = new Headers({ 'Cache-control': 'no-cache' });
        this.options = new RequestOptions({ headers: this.headers });
}

    public setInitData(params: any = {}): void {
        this.http.get(AppSettings.WebService + 'panelM1Init/?lastTime=' + params)
            .takeWhile(() => this.alive)
            .map(response => response.json())
            .subscribe((res: IDataSetM1[]) => {
                this._M1Data = res;
                this.getData();
            });
    }

    get M1Data(): Observable<IDataSetM1[]> {
        return Observable.of(this._M1Data);
    }

    private getData(params: any = {}): void {
        this.pollTasks()
            .takeWhile(() => this.alive)
            .map(response => response.json())
            .subscribe((response: IDataSetM1) => {
                // if (this.changeData.getValue()[0].Timestamp < response[0].Timestamp)
                this.changeData.next(response);
                this._M1Data = this._M1Data.slice(1);
                this._M1Data.push(response[0]);
            });
    }

    private pollTasks() {
        return Observable.interval(60000)
            .flatMap((i) => this.http.get(AppSettings.WebService + 'panelM1' + '?tsp=' + new Date()));
    }

    ngOnDestroy() {
        this.alive = false;
    }
}