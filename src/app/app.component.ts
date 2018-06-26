import { Component } from '@angular/core';
import { LanguageService, Language } from 'common-lib';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent {
  title = 'app';

  constructor(private lang: LanguageService){
    lang.onLanguageChange.subscribe(language => {
      console.log(language)
    })

    let jp = new Language('jp_JP', 'JP', 'Japanese')
    lang.addLanguage(jp)

    let dog = new Language('dog', 'DOG', 'Dog')
    lang.updateLanguage('en_US', dog)

    lang.setCurrentLanguage('dog')
  }

}
