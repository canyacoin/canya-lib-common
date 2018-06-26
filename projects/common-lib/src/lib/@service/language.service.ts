import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

export class Language {
  code: string
  symbol: string
  name: string
  isActive: boolean
}

@Injectable({
  providedIn: 'root'
})

export class LanguageService {

  onLanguageChange: Subject<Language> = new Subject<Language>()

  currentLanguage: Language

  languages: Array<Language> = [
    { code: 'en_US', symbol: 'EN', name: 'English (US)', isActive: true },
    { code: 'es_ES', symbol: 'ES', name: 'Español', isActive: true },
  ]

  constructor() {
    this.currentLanguage = this.languages[0]
  }

  setCurrentLanguage(code: string){
    this.currentLanguage = this.languages.filter(lang => {
      return code == lang.code
    })[0]

    this.onLanguageChange.next(this.currentLanguage)
  }

}






