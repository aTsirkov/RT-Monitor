import { Component, ViewChildren, QueryList, OnDestroy, AfterViewInit } from '@angular/core';

import { PanelService } from '../panel.service';
import { IDataSetM1, IRes } from '../../shared/app.entities';

import { M1ChartsComponent } from './m1.charts';

@Component({
    selector: 'm1-panel1',
    templateUrl: './m1.panel1.html',
    styleUrls: ['./m1.component.css']
})

export class M1Panel1 implements AfterViewInit, OnDestroy {
    @ViewChildren(M1ChartsComponent) private charts: QueryList<M1ChartsComponent>;

    alive: boolean = true;

    optGaugeGRA: Object;

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
                        case 'd916':
                            obj = { Timestamp: response[0].Timestamp, fact: response[0].TRSA_D916, model: response[0].D916_M, alarm: response[0].Q_D916_Alarm_SUM };
                            break;
                        case 'd917':
                            obj = { Timestamp: response[0].Timestamp, fact: response[0].TRSA_D917, model: response[0].D917_M, alarm: response[0].Q_D917_Alarm_SUM };
                            break;
                        case 'd921':
                            obj = { Timestamp: response[0].Timestamp, fact: response[0].GRA_D921, model: response[0].D921_M, alarm: response[0].Q_D921_Alarm_SUM };
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
                        case 'd916':
                            obj = response.map(item => { return { Timestamp: item.Timestamp, fact: item.TRSA_D916, model: item.D916_M, alarm: item.Q_D916_Alarm_SUM } });
                            break;
                        case 'd917':
                            obj = response.map(item => { return { Timestamp: item.Timestamp, fact: item.TRSA_D917, model: item.D917_M, alarm: item.Q_D917_Alarm_SUM } });
                            break;
                        case 'd921':
                            obj = response.map(item => { return { Timestamp: item.Timestamp, fact: item.GRA_D921, model: item.D921_M, alarm: item.Q_D916_Alarm_SUM } });
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