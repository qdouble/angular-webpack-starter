import { AfterContentInit, Component, ViewChild } from '@angular/core';
import { MdInput } from '@angular2-material/input';

@Component({
  selector: 'dashboard',
  template: `
  <header>
    <h3> Welcome to the Dashboard {{input?.value}}!</h3>
  </header>
  <section>
  <md-input [placeholder]="'Enter your name'">User</md-input>
  </section>
  `
})

export class Dashboard implements AfterContentInit {
  @ViewChild(MdInput) input: MdInput;
  ngAfterContentInit() {
    this.input.value = 'Angular User';
  }
}
