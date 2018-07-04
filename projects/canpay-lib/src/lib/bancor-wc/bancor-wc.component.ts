import { Component, OnInit, AfterViewInit, Input, Output, EventEmitter } from '@angular/core';
import { Renderer2 } from '@angular/core';

declare var BancorConvertWidget: any;

export enum Status {
  New,
  PendingPurchase,
  InProgress,
  Completed
}

@Component({
  selector: 'canyalib-bancor-wc',
  templateUrl: './bancor-wc.component.html',
  styleUrls: ['./bancor-wc.component.css']
})
export class BancorWcComponent implements OnInit, AfterViewInit {
  @Output() check = new EventEmitter();
  @Input() type = 'WITHOUT_INPUT_BOXES';
  @Input() balance = 0;
  @Input() set isLoading(isLoading: boolean) {
    if (!isLoading) {
      this.status = Status.New;
    }
  }

  currentBalance: Number;
  Status = Status;
  status: Status = Status.New;
  isLoadingBancorWidget = false;

  constructor(private renderer: Renderer2) { }

  ngOnInit() {
    if (this.isBancorLoaded()) { return; }

    this.isLoadingBancorWidget = true;
    this.addJsToElement('https://widget-convert.bancor.network/v1').onload = () => {
      console.log('BancorConvertWidget Tag loaded');
      this.isLoadingBancorWidget = false;
      this.initBancorWidget();
    };
  }

  ngAfterViewInit() { }

  isBancorLoaded() {
    try {
      if (BancorConvertWidget) { return true; }
    } catch (e) { console.log('BancorConvertWidget is not initialized'); }

    return false;
  }

  initBancorWidget() {
    if (!this.isBancorLoaded()) { return; }

    BancorConvertWidget.init({
      'type': this.type,
      'baseCurrencyId': '5a6f61ece3de16000123763a',
      'pairCurrencyId': '5937d635231e97001f744267',
      'primaryColor': '#00BFFF',
      'primaryColorHover': '55DAFB'
    });
  }

  addJsToElement(src: string): HTMLScriptElement {
    const script = document.createElement('script');
    script.type = 'text/javascript';
    script.src = src;
    this.renderer.appendChild(document.body, script);
    return script;
  }

  open() {
    BancorConvertWidget.showConvertPopup('buy');
    this.status = Status.PendingPurchase;
  }

  checkBalance() {
    console.log('in checkBalance');
    this.status = Status.InProgress;
    setTimeout(() => this.check.emit(), 2000);
  }

  cancel() {
    this.status = Status.New;
  }

}
