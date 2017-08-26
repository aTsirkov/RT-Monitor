import { Component, OnInit } from "@angular/core";

// import { Observable } from 'rxjs/Rx';

import { MenuItem } from 'primeng/primeng';

@Component({
    selector: 'panel-menu',
    template: require('./panelmenu.component.html'),
    styles: [require('./panelmenu.component.css')],
    // providers: [PanelMenuService]
})
export class PanelMenuComponent implements OnInit {

    private items: MenuItem[];

    constructor() {
    }

    ngOnInit() {
        this.items = [
            {
                label: 'Предприятия холдинга',
                icon: 'fa-cogs pull-right',
                items: [
                    {
                        label: 'Томскнефтехим',
                        items: [
                            { label: 'Компрессор М-1', routerLink: ['Томск'] }
                        ]
                    },
                    { label: 'Тобольск' },
                    { label: 'Тюмень' }
                ]
            },
            {
                label: 'Проактивные мониторы',
                icon: 'fa-bar-chart pull-right',
                items: [
                    { label: 'Компрессор М-1', routerLink: ['Томск'] }
                ]
            }
        ];
    }
}
