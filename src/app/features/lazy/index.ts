import { StoreWithLazy, lazyStoreFactory } from './lazy.reducer';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { routes } from './lazy.routing';
import { Store } from '@ngrx/store';
import { LazyComponent } from './lazy.component';


@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
  ],
  declarations: [
    LazyComponent
  ],
  providers: [{ provide: StoreWithLazy, useFactory: lazyStoreFactory, deps: [Store] }]
})

export class LazyModule {}

