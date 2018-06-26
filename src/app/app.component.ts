import { Component } from '@angular/core';
import { LanguageService } from 'common-lib';

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
  }

}
