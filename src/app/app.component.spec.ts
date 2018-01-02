/* tslint:disable: max-line-length */
import { TestBed, async } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { MaterialModule } from './material.module';
import {
  BrowserTransferStateModule
} from '../modules/transfer-state/browser-transfer-state.module';

import { AppComponent } from './app.component';
import { DashboardComponent } from './features/dashboard.component';
import { NotFound404Component } from './not-found404.component';
import { routes } from './app.routing';
import { StoreDevToolsModule } from './features/store-devtools.module';

import 'rxjs/add/operator/takeUntil';

describe('App Component', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        BrowserAnimationsModule,
        BrowserTransferStateModule,
        MaterialModule,
        ReactiveFormsModule,
        RouterTestingModule.withRoutes(routes),
        StoreDevToolsModule
        ],
      providers: [],
      declarations: [AppComponent, DashboardComponent, NotFound404Component]
    });
  });

  it('should contain app text', async(() => {
    const fixture = TestBed.createComponent(AppComponent);
    fixture.detectChanges();
    expect(fixture.nativeElement).toContainText('Angular Starter App');
  }));

});
