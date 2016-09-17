import { AfterContentInit, Component, ViewChild } from '@angular/core';
import { MdInput } from '@angular2-material/input';

@Component({
  selector: 'my-dashboard',
  templateUrl: './dashboard.component.html'
})

export class DashboardComponent implements AfterContentInit {
  @ViewChild(MdInput) input: MdInput;
  ngAfterContentInit() {
    this.input.value = 'Angular User';
  }
}
