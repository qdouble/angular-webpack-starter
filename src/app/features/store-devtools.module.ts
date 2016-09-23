import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { StoreLogMonitorModule, useLogMonitor } from '@ngrx/store-log-monitor';

import { StoreDevToolsComponent } from './store-devtools.component';

const IMPORTS = [];
// Enable ngrx/devtools in dev mode
if (ENV === 'development' &&
  ['monitor', 'both'].includes(STORE_DEV_TOOLS) // set in constants.js file in project root
) IMPORTS.push(...[
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
