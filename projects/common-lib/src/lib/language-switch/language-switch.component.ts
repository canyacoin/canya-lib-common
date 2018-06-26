import { Component, OnInit } from '@angular/core';
import { LanguageService } from '../@service/language.service';

@Component({
  selector: 'canyalib-language-switch',
  templateUrl: './language-switch.component.html',
  styleUrls: ['./language-switch.component.css']
})
export class LanguageSwitchComponent implements OnInit {

  constructor(public lang: LanguageService) {}

  ngOnInit() {
  }

}
