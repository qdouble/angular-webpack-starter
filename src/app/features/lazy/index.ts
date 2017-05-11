import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { LazyActions } from './lazy.actions';
import { routes } from './lazy.routing';

import { LazyComponent } from './lazy.component';


@NgModule({
    imports: [
        CommonModule,
        RouterModule.forChild(routes),
    ],
    declarations: [
        LazyComponent
    ],
    providers: [
        LazyActions
    ]
})

export class LazyModule { }
