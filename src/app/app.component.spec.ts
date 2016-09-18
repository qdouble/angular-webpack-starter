/* tslint:disable: max-line-length */
import { TestBed, async } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { ReactiveFormsModule } from '@angular/forms';

import { MdButtonModule } from '@angular2-material/button';
import { MdCardModule } from '@angular2-material/card';
import { MdIconModule } from '@angular2-material/icon';
import { MdListModule } from '@angular2-material/list';
import { MdSidenavModule } from '@angular2-material/sidenav';
import { MdToolbarModule } from '@angular2-material/toolbar';

import { AppComponent } from './app.component';
import { DashboardComponent } from './features/dashboard.component';
import { NotFound404Component } from './not-found404.component';
import { routes } from './app.routing';

describe('App Component', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        MdButtonModule,
        MdCardModule,
        MdIconModule.forRoot(),
        MdListModule,
        MdSidenavModule,
        MdToolbarModule,
        ReactiveFormsModule,
        RouterTestingModule.withRoutes(routes)],
      providers: [],
      declarations: [AppComponent, DashboardComponent, NotFound404Component]
    });
  });

  it('should contain Dashboard text', async(() => {
    const fixture = TestBed.createComponent(AppComponent);
    fixture.detectChanges();
    expect(fixture.nativeElement).not.toContainText('Welcome to the Dashboard');
  }));

});
