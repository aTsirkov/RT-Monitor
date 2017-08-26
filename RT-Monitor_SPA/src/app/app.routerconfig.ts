import { Routes } from "@angular/router";

import { CountryMapComponent } from './maps/countrymap/countrymap.component';
import { M1PanelComponent } from './panels/M1/m1.component';
import { M1Panel1 } from './panels/M1/m1.panel1';
import { M1Panel2 } from './panels/M1/m1.panel2';
import { M1Panel3 } from './panels/M1/m1.panel3';
import { M1Panel4 } from './panels/M1/m1.panel4';
import { M1Panel5 } from './panels/M1/m1.panel5';
import { M1Panel6 } from './panels/M1/m1.panel6';

export const RouteConfig: Routes = [
    { path: '', redirectTo: 'home', pathMatch: 'full' },
    { path: 'home', component: CountryMapComponent },
    {
        path: 'Томск',
        component: M1PanelComponent,
        children: [
            { path: '', component: M1Panel1, outlet: 'route1' },
            { path: 'panel1', component: M1Panel1, outlet: 'route1' },
            { path: 'panel2', component: M1Panel2, outlet: 'route1' },
            { path: 'panel3', component: M1Panel3, outlet: 'route1' },
            { path: 'panel4', component: M1Panel4, outlet: 'route1' },
            { path: 'panel5', component: M1Panel5, outlet: 'route1' },
            { path: 'panel6', component: M1Panel6, outlet: 'route1' },
        ]
    },
    { path: '**', redirectTo: 'home' }
];