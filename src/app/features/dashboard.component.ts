import { Component } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { AppState } from '../app.service';

@Component({
  selector: 'my-dashboard',
  templateUrl: './dashboard.component.html'
})

export class DashboardComponent {
  form: FormGroup;
  nameLabel = 'Enter your name';
  constructor(public appState: AppState, fb: FormBuilder) {
    this.form = fb.group({
      name: 'Angular User'
    });
  }
  submitState() {
    const value = this.form.get('name').value;
    console.log('submitState', value);
    this.appState.set('value', value);
  }
}
