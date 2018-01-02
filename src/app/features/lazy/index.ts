import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { StoreModule } from '@ngrx/store';
import { routes } from './lazy.routing';

import { LazyComponent } from './lazy.component';
import * as fromLazy from './lazy.reducer';

@NgModule({
    imports: [
        CommonModule,
        RouterModule.forChild(routes),
        StoreModule.forFeature('lazyModule', {
            lazy: fromLazy.lazyReducer
        })
    ],
    declarations: [
        LazyComponent
    ],
    providers: [
    ]
})

export class LazyModule { }
