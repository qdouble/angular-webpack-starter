import { Component } from '@angular/core';

import { Store } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';

import { LazyActions } from './lazy.actions';
import { StoreWithLazy, lazyStoreFactory } from './lazy.reducer';

@Component({
  selector: 'my-lazy',
  templateUrl: './lazy.component.html',
  providers: [{ provide: StoreWithLazy, useFactory: lazyStoreFactory, deps: [Store] }]
})

export class LazyComponent {
  counter: Observable<number>;

  constructor(
    private lazyActions: LazyActions,
    private store: StoreWithLazy
  ) {
    this.counter = store.select(s => s.lazy.counter);
  }

  decrement() {
    this.store.dispatch(this.lazyActions.decrement());
  }

  increment() {
    this.store.dispatch(this.lazyActions.increment());
  }

  reset() {
    this.store.dispatch(this.lazyActions.reset());
  }
}
