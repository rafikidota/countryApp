import { Component, EventEmitter, Output, Input, OnInit } from '@angular/core';
import { Subject } from 'rxjs';
import { debounceTime } from 'rxjs/operators';


@Component({
  selector: 'app-country-input',
  templateUrl: './country-input.component.html',
  styles: [
  ]
})
export class CountryInputComponent implements OnInit {

  @Output() onEnter: EventEmitter<string> = new EventEmitter();
  @Output() onDebounce: EventEmitter<string> = new EventEmitter();
  @Input() placeholder: string = '';
  debouncer: Subject<string> = new Subject();

  ngOnInit(): void {
    this.debouncer
      .pipe(debounceTime(300))
      .subscribe(
        value => {
          this.onDebounce.emit(value);
        }
      );
  }

  query: string = '';
  search() {
    this.onEnter.emit(this.query);
  }
  pressKey() {
    this.debouncer.next(this.query);
  }

}
