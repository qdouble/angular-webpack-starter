/* tslint:disable: max-line-length */
import { TestBed, async } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';

import { MdButtonModule } from '@angular2-material/button';
import { MdCardModule } from '@angular2-material/card';
import { MdIconModule } from '@angular2-material/icon';
import { MdInputModule } from '@angular2-material/input';
import { MdListModule } from '@angular2-material/list';
import { MdSidenavModule } from '@angular2-material/sidenav';
import { MdToolbarModule } from '@angular2-material/toolbar';

import { App } from './app';
import { Dashboard } from './features/dashboard';
import { NotFound404Component } from './not-found404.component';
import { routes } from './app.routes';

describe('App Component', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        MdButtonModule,
        MdCardModule,
        MdIconModule.forRoot(),
        MdInputModule,
        MdListModule,
        MdSidenavModule,
        MdToolbarModule,
        RouterTestingModule.withRoutes(routes)],
      providers: [],
      declarations: [App, Dashboard, NotFound404Component]
    });
  });

  it('should contain Dashboard text', async(() => {
    const fixture = TestBed.createComponent(App);
    fixture.detectChanges();
    expect(fixture.nativeElement).not.toContainText('Welcome to the Dashboard');
  }));

});
