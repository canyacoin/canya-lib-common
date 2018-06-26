import { Component, OnInit, Input } from '@angular/core';
import { LanguageService, Language } from '../@service/language.service';

@Component({
  selector: 'canyalib-language-switch',
  templateUrl: './language-switch.component.html',
  styleUrls: ['./language-switch.component.css']
})

export class LanguageSwitchComponent implements OnInit {

  _exclude: Array<string>

  @Input()
  set exclude(exclude: Array<string>) {
    this._exclude = exclude
  }

  constructor(public lang: LanguageService) {
  }

  ngOnInit() {
    if (this._exclude.length > 0) {
      this.lang.excludeLanguages(this._exclude)
    }
  }

}
