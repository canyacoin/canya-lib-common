import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'canyalib-process',
  templateUrl: './process.component.html',
  styleUrls: ['./process.component.scss']
})
export class ProcessComponent {
  @Output() success = new EventEmitter();
  @Output() start = new EventEmitter();
  @Input() processName;
  @Input() dAppName;
  @Input() recepient;
  @Input() amount = 0;
  @Input() set error(msg: string) {
    if (!!msg) {
      this.isLoading = false;
    }
  }

  isLoading = false;

  constructor() { }

  submit() {
    this.isLoading = true;
    this.start.emit(true);
  }
}
