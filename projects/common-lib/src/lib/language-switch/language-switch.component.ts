import { Component, OnInit, Input, ViewEncapsulation } from '@angular/core';
import { LanguageService } from '../@service/language.service';
import { Language } from '../@model/language.model';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'canyalib-language-switch',
  templateUrl: './language-switch.component.html',
  styleUrls: ['./language-switch.component.css'],
  encapsulation: ViewEncapsulation.Native,
})

export class LanguageSwitchComponent implements OnInit {

  _exclude: Array<string>

  @Input()
  set exclude(exclude: Array<string>) {
    this._exclude = exclude
  }

  constructor(
    public lang: LanguageService,
    public translate: TranslateService) {

    translate.setDefaultLang('en_US')

    lang.onLanguageChange.subscribe(language => {
      console.log(language)
      translate.use(language.code)
    })

  }

  ngOnInit() {
    if (this._exclude.length > 0) {
      this.lang.excludeLanguages(this._exclude)
    }
  }

}
