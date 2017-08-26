import { Component, ViewChildren, QueryList, OnDestroy, AfterViewInit } from '@angular/core';

import { PanelService } from '../panel.service';
import { IDataSetM1, IRes } from '../../shared/app.entities';

import { M1ChartsComponent } from './m1.charts';

@Component({
    selector: 'm1-panel2',
    templateUrl: './m1.panel2.html',
    styleUrls: ['./m1.component.css']
})

export class M1Panel2 implements AfterViewInit, OnDestroy {
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
                        case 'd912':
                            obj = { Timestamp: response[0].Timestamp, fact: response[0].TRSA_D912, model: response[0].D912_M, alarm: response[0].Q_D912_Alarm_SUM };
                            break;
                        case 'd913':
                            obj = { Timestamp: response[0].Timestamp, fact: response[0].TRSA_D913, model: response[0].D913_M, alarm: response[0].Q_D913_Alarm_SUM };
                            break;
                        case 'd914':
                            obj = { Timestamp: response[0].Timestamp, fact: response[0].TRSA_D914, model: response[0].D914_M, alarm: response[0].Q_D914_Alarm_SUM };
                            break;
                        case 'd915':
                            obj = { Timestamp: response[0].Timestamp, fact: response[0].TRSA_D915, model: response[0].D915_M, alarm: response[0].Q_D915_Alarm_SUM };
                            break;
                        case 'd918':
                            obj = { Timestamp: response[0].Timestamp, fact: response[0].TRSA_D918, model: response[0].D918_M, alarm: response[0].Q_D918_Alarm_SUM };
                            break;
                        case 'd919':
                            obj = { Timestamp: response[0].Timestamp, fact: response[0].TRSA_D919, model: response[0].D919_M, alarm: response[0].Q_D919_Alarm_SUM };
                            break;
                        case 'd920':
                            obj = { Timestamp: response[0].Timestamp, fact: response[0].GRA_D920, model: response[0].D920_M, alarm: response[0].Q_D920_Alarm_SUM };
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
                        case 'd912':
                            obj = response.map(item => { return { Timestamp: item.Timestamp, fact: item.TRSA_D912, model: item.D912_M, alarm: item.Q_D912_Alarm_SUM } });
                            break;
                        case 'd913':
                            obj = response.map(item => { return { Timestamp: item.Timestamp, fact: item.TRSA_D913, model: item.D913_M, alarm: item.Q_D913_Alarm_SUM } });
                            break;
                        case 'd914':
                            obj = response.map(item => { return { Timestamp: item.Timestamp, fact: item.TRSA_D914, model: item.D914_M, alarm: item.Q_D914_Alarm_SUM } });
                            break;
                        case 'd915':
                            obj = response.map(item => { return { Timestamp: item.Timestamp, fact: item.TRSA_D915, model: item.D915_M, alarm: item.Q_D915_Alarm_SUM } });
                            break;
                        case 'd918':
                            obj = response.map(item => { return { Timestamp: item.Timestamp, fact: item.TRSA_D918, model: item.D918_M, alarm: item.Q_D918_Alarm_SUM } });
                            break;
                        case 'd919':
                            obj = response.map(item => { return { Timestamp: item.Timestamp, fact: item.TRSA_D919, model: item.D919_M, alarm: item.Q_D919_Alarm_SUM } });
                            break;
                        case 'd920':
                            obj = response.map(item => { return { Timestamp: item.Timestamp, fact: item.GRA_D920, model: item.D920_M, alarm: item.Q_D920_Alarm_SUM } });
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
