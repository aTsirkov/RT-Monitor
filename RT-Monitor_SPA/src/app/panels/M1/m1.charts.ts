import { Component, Input, OnChanges, SimpleChange, OnDestroy } from '@angular/core';
import { Subject } from 'rxjs/Rx';
import { IRes } from '../../shared/app.entities';

import { ChartModule, ChartComponent } from 'angular2-highcharts'; 

@Component({
    selector: 'm1-charts',
    template: ` <chart id="stock" type="StockChart" [options]="optM1Chart" (load)="saveInstanceM1Chart($event.context)"></chart>
                <chart id="gauge" [options]="optM1Gauge" (load)="saveInstanceM1Gauge($event.context)"></chart>`,
    styleUrls: ['./m1.component.css']
})

export class M1ChartsComponent implements OnChanges, OnDestroy{
    @Input() chartOption: Object;
    @Input() gaugeOption: Object;
    @Input() id: string;

    private chartOption$: Subject<Object> = new Subject<Object>();
    private gaugeOption$: Subject<Object> = new Subject<Object>();

    alive: boolean = true;

    M1Chart: any;
    optM1Chart: Object;
    M1Gauge: any;
    optM1Gauge: Object;
    
    constructor() {
        this.optM1Chart = {
            legend: {
                enabled: true,
                align: 'left',
                verticalAlign: 'top'
            },
            rangeSelector: {
                enabled: false
            },
            plotOptions: {
                series: {
                    showInNavigator: true
                }
            },
            series: [{
                name: 'Реальный'
            },
            {
                name: 'Виртуальный'
            }]
        }
        this.optM1Gauge = {
            chart: {
                type: 'gauge',
            },
            title: {
                style: {
                    fontSize: '12px'
                },
                text: 'Датчик температуры',
                verticalAlign: 'top'
            },
            pane: {
                startAngle: -130,
                endAngle: 130,
                background: [{
                    backgroundColor: {
                        linearGradient: { x1: 0, y1: 0, x2: 0, y2: 1 },
                        stops: [
                            [0, '#FFF'],
                            [1, '#333']
                        ]
                    },
                    borderWidth: 0,
                    outerRadius: '109%'
                }, {
                    backgroundColor: {
                        linearGradient: { x1: 0, y1: 0, x2: 0, y2: 1 },
                        stops: [
                            [0, '#333'],
                            [1, '#FFF']
                        ]
                    },
                    borderWidth: 1,
                    outerRadius: '107%'
                }, {
                    // default background
                }, {
                    backgroundColor: '#DDD',
                    borderWidth: 0,
                    outerRadius: '105%',
                    innerRadius: '103%'
                }]
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
                    to: 999,
                    color: '#55BF3B'
                }, {
                    from: 1000,
                    to: 2000,
                    color: '#DDDF0D'
                }, {
                    from: 2001,
                    to: 3000,
                    color: '#DF5353'
                }]
            },
            series: [{
                name: 'Speed',
                data: [0],
                tooltip: {
                    valueSuffix: ''
                }
            }]
        }

        this.chartOption$
            .takeWhile(() => this.alive)
            .subscribe(x => {
            this.optM1Chart = Object.assign({}, this.optM1Chart, x);
        });

        this.gaugeOption$
            .takeWhile(() => this.alive)
            .subscribe(x => {
            this.optM1Gauge = Object.assign({}, this.optM1Gauge, x);
            
        });
    }

    ngOnChanges(changes: { [key: string]: SimpleChange }) {
        if (changes.hasOwnProperty('chartOption') && changes['chartOption'].currentValue) {
            this.chartOption$.next(changes['chartOption'].currentValue);
        }
        if (changes.hasOwnProperty('gaugeOption') && changes['gaugeOption'].currentValue) {
            this.gaugeOption$.next(changes['gaugeOption'].currentValue);
        }
    }

    saveInstanceM1Chart(chartInstance: any) {
        this.M1Chart = chartInstance;
    }

    saveInstanceM1Gauge(chartInstance: any) {
        this.M1Gauge = chartInstance;
    }

    public initStock(response: IRes[]) {
        this.M1Chart.series[0].setData(response.map(item => { return [item.Timestamp, item.fact] }), true);
        this.M1Chart.series[1].setData(response.map(item => { return [item.Timestamp, item.model] }), true);

        this.M1Gauge.series[0].data[0].update(response[response.length - 1].alarm);
    }

    public changeData(response: IRes[]) {
        response.forEach(item => {
            this.M1Chart.series[0].addPoint([item.Timestamp, item.fact], true, true);
            this.M1Chart.series[1].addPoint([item.Timestamp, item.model], true, true);
        });

        this.M1Gauge.series[0].data[0].update(response[response.length-1].alarm);
    }

    ngOnDestroy() {
        this.alive = false;
    }

}