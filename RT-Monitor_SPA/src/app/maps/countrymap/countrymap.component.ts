import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

import { CountryMapService } from './countrymap.service';
import { Subscription } from 'rxjs/Rx';

import { ChartModule } from 'angular2-highcharts'; 

@Component({
    selector: 'country-map',
    template: require('./countrymap.component.html'),
    styles: [require('./countrymap.component.css')],
    providers: [CountryMapService]
})

export class CountryMapComponent implements OnInit{
    city: string;
    constructor(public service: CountryMapService, private activeRoute: ActivatedRoute, private router: Router) {
        var response = this.service.getCountryMap();
        var cdata = this.service.getCities();

        this.options = {
            chart: {
                map: response,
                ignoreHiddenSeries: true,
                borderWidth: 1,
                backgroundColor: {
                    linearGradient: [0, 0, 500, 500],
                    stops: [
                        [0, 'rgb(255, 255, 255)'],
                        [1, 'rgb(200, 200, 255)']
                    ]
                },
            },
            legend: {
                enabled: false
            },
            title: {
                text: ''
            },
            subtitle: {
                text: ''
            },
            mapNavigation: {
                enabled: true,
                buttonOptions: {
                    verticalAlign: 'top'
                }
            },
            tooltip: {
                enabled: true
            },
            plotOptions: {
                series: {
                    stickyTracking: true,
                    point: {
                        events: {
                            click: function () {
                                router.navigate(['./' + this.name]);
                            },
                        }
                    }
                }
            },
            series: [
            {
                name: 'Country',
                enableMouseTracking: false
            },
            {
                name: 'Cities',
                type: 'mappoint',
                cursor: 'pointer',
                enableMouseTracking: true,
                data: cdata
            }]
        }

    }

    options: Object;

    public ngOnInit() {
        this.activeRoute.params.subscribe(params =>
            this.city = params['city']
        );
    }
}