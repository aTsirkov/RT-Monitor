import { Component, ViewChildren, QueryList, OnDestroy, AfterViewInit } from '@angular/core';

import { PanelService } from '../panel.service';
import { IDataSetM1, IRes } from '../../shared/app.entities';

import { M1ChartsComponent } from './m1.charts';

@Component({
    selector: 'm1-panel6',
    templateUrl: './m1.panel6.html',
    styleUrls: ['./m1.component.css']
})

export class M1Panel6 implements AfterViewInit, OnDestroy {
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
                        case 'd900':
                            obj = { Timestamp: response[0].Timestamp, fact: response[0].TRSA_D900, model: response[0].D900_M, alarm: response[0].Q_D900_Alarm_SUM };
                            break;
                        case 'd901':
                            obj = { Timestamp: response[0].Timestamp, fact: response[0].TRSA_D901, model: response[0].D901_M, alarm: response[0].Q_D901_Alarm_SUM };
                            break;
                        case 'd902':
                            obj = { Timestamp: response[0].Timestamp, fact: response[0].TRSA_D902, model: response[0].D902_M, alarm: response[0].Q_D902_Alarm_SUM };
                            break;
                        case 'd903':
                            obj = { Timestamp: response[0].Timestamp, fact: response[0].TRSA_D903, model: response[0].D903_M, alarm: response[0].Q_D903_Alarm_SUM };
                            break;
                        case 'd924':
                            obj = { Timestamp: response[0].Timestamp, fact: response[0].GRA_D924, model: response[0].D924_M, alarm: response[0].Q_D924_Alarm_SUM };
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
                        case 'd900':
                            obj = response.map(item => { return { Timestamp: item.Timestamp, fact: item.TRSA_D900, model: item.D900_M, alarm: item.Q_D900_Alarm_SUM } });
                            break;
                        case 'd901':
                            obj = response.map(item => { return { Timestamp: item.Timestamp, fact: item.TRSA_D901, model: item.D901_M, alarm: item.Q_D901_Alarm_SUM } });
                            break;
                        case 'd902':
                            obj = response.map(item => { return { Timestamp: item.Timestamp, fact: item.TRSA_D902, model: item.D902_M, alarm: item.Q_D902_Alarm_SUM } });
                            break;
                        case 'd903':
                            obj = response.map(item => { return { Timestamp: item.Timestamp, fact: item.TRSA_D903, model: item.D903_M, alarm: item.Q_D903_Alarm_SUM } });
                            break;
                        case 'd924':
                            obj = response.map(item => { return { Timestamp: item.Timestamp, fact: item.GRA_D924, model: item.D924_M, alarm: item.Q_D924_Alarm_SUM } });
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