import { Component, ViewChildren, QueryList, OnDestroy, AfterViewInit } from '@angular/core';

import { PanelService } from '../panel.service';
import { IDataSetM1, IRes } from '../../shared/app.entities';

import { M1ChartsComponent } from './m1.charts';

@Component({
    selector: 'm1-panel5',
    templateUrl: './m1.panel5.html',
    styleUrls: ['./m1.component.css']
})

export class M1Panel5 implements AfterViewInit, OnDestroy {
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
                        case 'd904':
                            obj = { Timestamp: response[0].Timestamp, fact: response[0].TRSA_D904, model: response[0].D904_M, alarm: response[0].Q_D904_Alarm_SUM };
                            break;
                        case 'd905':
                            obj = { Timestamp: response[0].Timestamp, fact: response[0].TRSA_D905, model: response[0].D905_M, alarm: response[0].Q_D905_Alarm_SUM };
                            break;
                        case 'd925':
                            obj = { Timestamp: response[0].Timestamp, fact: response[0].GRA_D925, model: response[0].D925_M, alarm: response[0].Q_D925_Alarm_SUM };
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
                        case 'd904':
                            obj = response.map(item => { return { Timestamp: item.Timestamp, fact: item.TRSA_D904, model: item.D904_M, alarm: item.Q_D904_Alarm_SUM } });
                            break;
                        case 'd905':
                            obj = response.map(item => { return { Timestamp: item.Timestamp, fact: item.TRSA_D905, model: item.D905_M, alarm: item.Q_D905_Alarm_SUM } });
                            break;
                        case 'd925':
                            obj = response.map(item => { return { Timestamp: item.Timestamp, fact: item.GRA_D925, model: item.D925_M, alarm: item.Q_D925_Alarm_SUM } });
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