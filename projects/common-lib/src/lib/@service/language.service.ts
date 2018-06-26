import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

declare let require: any

const _ = require('lodash')

export class Language {
  code: string
  symbol: string
  name: string

  constructor(code: string, symbol: string, name: string){
    this.code = code
    this.symbol = symbol
    this.name = name
  }
}

@Injectable()
export class LanguageService {

  onLanguageChange: Subject<Language> = new Subject<Language>()

  currentLanguage: Language

  languages: Array<Language> = [
    { code: 'en_US', symbol: 'EN', name: 'English (US)' },
    { code: 'es_ES', symbol: 'ES', name: 'Español' },
  ]

  activeLanguages: Array<Language> = []

  constructor() {
    this.currentLanguage = this.languages[0]

    this.activeLanguages = this.languages
    this.sort()
  }

  sort(){
    console.log('sort')
    this.activeLanguages.sort(function(a, b) {
      let textA = a.name
      let textB = b.name
      return (textA < textB) ? -1 : (textA > textB) ? 1 : 0
    })
  }

  addLanguage(lang: Language){
    this.activeLanguages.push(lang)
    this.sort()
  }

  updateLanguage(code: string, lang: Language){
    _.each(this.activeLanguages, (item, index) => {
      if (item.code == code) {
        this.activeLanguages.splice(index, 1, lang)
        this.sort()
        return false
      }
    })
  }

  excludeLanguages(exclude: Array<string>){
    this.activeLanguages = this.languages.filter(lang => {
      if (exclude.indexOf(lang.code) != -1) {
        return false
      }

      return lang
    })
  }

  setCurrentLanguage(code: string){
    this.currentLanguage = this.languages.filter(lang => {
      return code == lang.code
    })[0]

    this.onLanguageChange.next(this.currentLanguage)
  }

}






