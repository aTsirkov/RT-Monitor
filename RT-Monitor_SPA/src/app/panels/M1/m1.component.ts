import { Component, AfterViewInit, OnDestroy } from '@angular/core';
import { PanelService } from '../panel.service';

@Component({
    selector: 'm1-monitor',
    templateUrl: './m1.component.html',
    styleUrls: ['./m1.component.css']
})

export class M1PanelComponent implements AfterViewInit, OnDestroy {

    alive: boolean = true;
    active: number = 1;
    photo: string;
    lastTime: Date = new Date();

    constructor(private pService: PanelService) {
        this.pService.setInitData((new Date(this.lastTime.getTime() - 7 * 24 * 60 * 60 * 1000)).toISOString());
        this.photo = "static/CompressorM1.png";
    }

    ngAfterViewInit() {
        this.pService.changeData
            .takeWhile(() => this.alive)
            .subscribe(response => {
                if (response) {
                    this.lastTime = response[0].Timestamp;
                }
            });
    }

    panelChange(index: number) {
        this.active = index;
    }

    ngOnDestroy() {
        this.alive = false;
    }
}