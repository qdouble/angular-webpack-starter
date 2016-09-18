import { Component } from '@angular/core';
import { FormControl }  from '@angular/forms';

@Component({
  selector: 'my-dashboard',
  templateUrl: './dashboard.component.html'
})

export class DashboardComponent {
  userName = new FormControl('Angular User');
}
