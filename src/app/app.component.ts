import { Component } from '@angular/core';
import { LanguageService, Language } from 'common-lib';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent {
  title = 'app';

  constructor(private lang: LanguageService) {
    const jp = new Language('jp_JP', 'JP', 'Japanese');
    lang.addLanguage(jp);

    const dog = new Language('dog', 'DOG', 'Dog');
    lang.updateLanguage('jp_JP', dog);

    lang.setCurrentLanguage('en_US');
  }
}
