import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { LocationStrategy, HashLocationStrategy } from '@angular/common';
// import { APP_BASE_HREF, Location } from '@angular/common';
import { HttpModule } from '@angular/http';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

import { AppSettings } from './shared/app.settings';

import { AppComponent } from './app.component';
import { RouteConfig } from './app.routerconfig';

import { PanelMenuComponent } from './menupanel/panelmenu.component';
import { CountryMapComponent } from './maps/countrymap/countrymap.component';

import { PanelService } from './panels/panel.service';
import { M1ChartsComponent } from './panels/M1/m1.charts';
import { M1PanelComponent } from './panels/M1/m1.component';
import { M1Panel1 } from './panels/M1/m1.panel1';
import { M1Panel2 } from './panels/M1/m1.panel2';
import { M1Panel3 } from './panels/M1/m1.panel3';
import { M1Panel4 } from './panels/M1/m1.panel4';
import { M1Panel5 } from './panels/M1/m1.panel5';
import { M1Panel6 } from './panels/M1/m1.panel6';

// import { AppLoadingComponent } from './shared/components/loading/app.loading';
// import { AppNotifyComponent } from './shared/components/notify/app.notify';

import "bootstrap/dist/css/bootstrap.css";

import { PanelMenuModule, MenuItem, SharedModule, ToolbarModule, TooltipModule, ButtonModule, TabViewModule } from 'primeng/primeng';

import { ChartModule } from 'angular2-highcharts';
const Highstocks = require('highcharts/highstock');
require('highcharts/modules/map')(Highstocks);
require('highcharts/highcharts-more')(Highstocks);
require('highcharts/modules/solid-gauge')(Highstocks);
require('highcharts/themes/gray')(Highstocks);

@NgModule({
    declarations: [
        AppComponent,
        PanelMenuComponent,
        CountryMapComponent,
        M1PanelComponent,
        M1ChartsComponent,
        M1Panel1,
        M1Panel2,
        M1Panel3,
        M1Panel4,
        M1Panel5,
        M1Panel6
    ],
    providers: [
        { provide: LocationStrategy, useClass: HashLocationStrategy },
//        { provide: APP_BASE_HREF, useValue: '' },
        AppSettings,
        PanelService,
    ],
    imports: [
        BrowserModule,
        HttpModule,
        FormsModule,
        ChartModule.forRoot( Highstocks ),
        RouterModule.forRoot( RouteConfig ),
        PanelMenuModule,
        SharedModule,
        ToolbarModule,
        TooltipModule,
        ButtonModule,
        TabViewModule
    ],
    bootstrap: [AppComponent]
})
export class AppModule { }