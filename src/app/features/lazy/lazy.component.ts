import {
  StoreWithLazy,
  INCREMENT,
  DECREMENT,
  RESET
} from './lazy.reducer';
import { Observable } from 'rxjs/Observable';
import { Component } from '@angular/core';

@Component({
  selector: 'my-lazy',
  templateUrl: './lazy.component.html'
})

export class LazyComponent {
  counter: Observable<number>;

  constructor(private store: StoreWithLazy) {
    this.counter = store.select(s => s.lazy.counter);
  }

  increment() {
    this.store.dispatch({ type: INCREMENT });
  }

  decrement() {
    this.store.dispatch({ type: DECREMENT });
  }

  reset() {
    this.store.dispatch({ type: RESET });
  }
}
