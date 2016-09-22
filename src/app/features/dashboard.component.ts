import { Component } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';

@Component({
  selector: 'my-dashboard',
  templateUrl: './dashboard.component.html'
})

export class DashboardComponent {
  form: FormGroup;
  constructor(
    fb: FormBuilder
  ) {
    this.form = fb.group({
      name: 'Angular User'
    });
  }
}
