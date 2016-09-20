import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { StoreLogMonitorModule, useLogMonitor } from '@ngrx/store-log-monitor';

import { StoreDevToolsComponent } from './store-devtools.component';

const IMPORTS = [];
// // Enable HMR and ngrx/devtools in hot reload mode
if (ENV === 'development') IMPORTS.push(...[
  StoreDevtoolsModule.instrumentStore({
    monitor: useLogMonitor({
      visible: true,
      position: 'right'
    })
  }),
  StoreLogMonitorModule,
]);

@NgModule({
  imports: [CommonModule, IMPORTS],
  declarations: [StoreDevToolsComponent],
  exports: [StoreDevToolsComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})

export class StoreDevToolsModule { }
