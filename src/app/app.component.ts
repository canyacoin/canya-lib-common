import { Component } from '@angular/core';
import { LanguageService, Language } from 'common-lib';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent {
  constructor(public lang: LanguageService){
 
    let ko = new Language ('KO','KO','한국어')
    let zh = new Language('ZH','ZH','中文')
    lang.addLanguage(zh)
    lang.addLanguage(ko)
    //let jp = new Language('jp_JP', 'JP', 'Japanese')
    //let dog = new Language('dog', 'DOG', 'Dog')
    // lang.updateLanguage('jp_JP', dog)  
    lang.setCurrentLanguage('en_US')
  }
}
