import { Component } from '@angular/core';

import { Store } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';

import * as LazyActions from './lazy.actions';
import { LazyState, State } from './lazy.reducer';

@Component({
  selector: 'my-lazy',
  templateUrl: './lazy.component.html'
})

export class LazyComponent {
  counter: Observable<number>;

  constructor(
    private store: Store<State>
  ) {
    this.counter = store.select(s => s.lazyModule.lazy.counter);
  }

  decrement() {
    this.store.dispatch(new LazyActions.Decrement());
  }

  increment() {
    this.store.dispatch(new LazyActions.Increment());
  }

  reset() {
    this.store.dispatch(new LazyActions.Reset());
  }
}
