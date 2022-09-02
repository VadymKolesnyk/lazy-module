import { OneComponent } from './lazy/one/one.component';
import { EntryComponent } from './lazy/entry/entry.component';
import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
})
export class AppComponent {
  EntryComponent = EntryComponent;
  OneComponent = OneComponent;

  show1 = false;
  show2 = false;

  test = 0;
  onClicked = () => {
    alert(this.test);
  }

  ready() {
    alert('ready')
  }
  constructor(
  ) {}

}
