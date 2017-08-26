import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';

import 'primeng/resources/themes/kasper/theme.css';
import 'font-awesome/css/font-awesome.min.css';
import 'primeng/resources/primeng.min.css';

import { enableProdMode } from '@angular/core';
import { AppModule } from './app/app.module';

// if (process.env.ENV === 'production') {
    enableProdMode();
// }
platformBrowserDynamic().bootstrapModule(AppModule);