import { Component, ViewChildren, QueryList, OnDestroy, AfterViewInit } from '@angular/core';

import { PanelService } from '../panel.service';
import { IDataSetM1, IRes } from '../../shared/app.entities';

import { M1ChartsComponent } from './m1.charts';

@Component({
    selector: 'm1-panel4',
    templateUrl: './m1.panel4.html',
    styleUrls: ['./m1.component.css']
})

export class M1Panel4 implements AfterViewInit, OnDestroy {
    @ViewChildren(M1ChartsComponent) private charts: QueryList<M1ChartsComponent>;

    optGaugeGRA: Object;

    alive: boolean = true;

    constructor(private pService: PanelService) {
        this.optGaugeGRA = {
            title: {
                text: 'Датчик вибрации'
            },
            yAxis: {
                min: 0,
                max: 3000,
                tickPixelInterval: 30,
                labels: {
                    step: 2,
                    rotation: 'auto'
                },
                title: {
                    text: ''
                },
                plotBands: [{
                    from: 0,
                    to: 1199,
                    color: '#55BF3B'
                }, {
                    from: 1200,
                    to: 2399,
                    color: '#DDDF0D'
                }, {
                    from: 2400,
                    to: 3000,
                    color: '#DF5353'
                }]
            }
        }
    }

    ngAfterViewInit() {
        this.subsInit();
    }

    private subsChange() {
        this.pService.changeData
            .takeWhile(() => this.alive)
            .subscribe((response: IDataSetM1) => {
                this.charts.forEach(chart => {
                    var obj: IRes;
                    switch (chart.id) {
                        case 'd906':
                            obj = { Timestamp: response[0].Timestamp, fact: response[0].TRSA_D906, model: response[0].D906_M, alarm: response[0].Q_D906_Alarm_SUM };
                            break;
                        case 'd907':
                            obj = { Timestamp: response[0].Timestamp, fact: response[0].TRSA_D907, model: response[0].D907_M, alarm: response[0].Q_D907_Alarm_SUM };
                            break;
                        case 'd908':
                            obj = { Timestamp: response[0].Timestamp, fact: response[0].TRSA_D908, model: response[0].D908_M, alarm: response[0].Q_D908_Alarm_SUM };
                            break;
                        case 'd909':
                            obj = { Timestamp: response[0].Timestamp, fact: response[0].TRSA_D909, model: response[0].D909_M, alarm: response[0].Q_D909_Alarm_SUM };
                            break;
                        case 'd922':
                            obj = { Timestamp: response[0].Timestamp, fact: response[0].GRA_D922, model: response[0].D922_M, alarm: response[0].Q_D922_Alarm_SUM };
                            break;
                    }
                    chart.changeData([obj]);
                });
            });
    }

    private subsInit() {
        this.pService.M1Data
            .takeWhile(() => this.alive)
            .subscribe((response: IDataSetM1[]) =>
                this.charts.forEach(chart => {
                    var obj: IRes[];
                    switch (chart.id) {
                        case 'd906':
                            obj = response.map(item => { return { Timestamp: item.Timestamp, fact: item.TRSA_D906, model: item.D906_M, alarm: item.Q_D906_Alarm_SUM } });
                            break;
                        case 'd907':
                            obj = response.map(item => { return { Timestamp: item.Timestamp, fact: item.TRSA_D907, model: item.D907_M, alarm: item.Q_D907_Alarm_SUM } });
                            break;
                        case 'd908':
                            obj = response.map(item => { return { Timestamp: item.Timestamp, fact: item.TRSA_D908, model: item.D908_M, alarm: item.Q_D908_Alarm_SUM } });
                            break;
                        case 'd909':
                            obj = response.map(item => { return { Timestamp: item.Timestamp, fact: item.TRSA_D909, model: item.D909_M, alarm: item.Q_D909_Alarm_SUM } });
                            break;
                        case 'd922':
                            obj = response.map(item => { return { Timestamp: item.Timestamp, fact: item.GRA_D922, model: item.D922_M, alarm: item.Q_D922_Alarm_SUM } });
                            break;
                    }
                    chart.initStock(obj);
                }
                )
            );
        this.subsChange();
    }

    ngOnDestroy() {
        this.alive = false;
    }
}