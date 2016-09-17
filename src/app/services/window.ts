import { OpaqueToken } from '@angular/core';

const win = typeof window !== 'undefined' && window || <any>{};
export { win as window };

function CONST_EXPR(expr) {
  return expr;
}

function _window(): any {
  return window;
}

export const WINDOW: OpaqueToken = CONST_EXPR(new OpaqueToken('WindowToken'));

export abstract class WindowRef {
  get nativeWindow(): any {
    throw new Error('unimplemented');
  }
}
// tslint:disable-next-line
export class WindowRef_ extends WindowRef {
  constructor() {
    super();
  }
  get nativeWindow(): any {
    return _window();
  }
}

export const WINDOW_PROVIDERS = [
  { provide: WindowRef, useClass: WindowRef_ },
  { provide: WINDOW, useFactory: _window, deps: []}
];