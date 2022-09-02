import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-entry',
  templateUrl: './entry.component.html',
  styleUrls: ['./entry.component.css']
})
export class EntryComponent implements OnInit {

  @Input() test: number;
  @Output() cliked = new EventEmitter<void>();

  constructor() { }

  ngOnInit() {
  }

}
