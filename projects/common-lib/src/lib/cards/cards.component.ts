import { Component, OnInit, ViewEncapsulation, Input } from '@angular/core';

@Component({
  selector: 'canyalib-cards',
  templateUrl: './cards.component.html',
  styleUrls: ['./cards.component.css'],
  encapsulation: ViewEncapsulation.Native,
})
export class CardsComponent implements OnInit {

  apps: Array<any> = [
    {
      name: 'CanInvoice',
      description: 'Easily create your own clean, professional and accurate invoices',
      translate: 'cards.CanInvoice',
      url: 'https://caninvoice.io',
      type: 'helper'
    },
    {
      name: 'CanStation',
      description: 'Find out the ideal amount of gas to allocate to your ETH transaction',
      translate: 'cards.CanStation',
      url: 'https://CanStation.io',
      type: 'helper'
    },
    {
      name: 'CanFund',
      description: 'Shoot your pitch, vote, contribute and raise funds',
      translate: 'cards.CanFund',
      url: 'https://CanFund.io',
      type: 'main'
    },
    {
      name: 'CanSend',
      description: 'Send ERC20 tokens to multiple addresses at once',
      translate: 'cards.CanSend',
      url: 'https://CanSend.io',
      type: 'helper'
    },
    {
      name: 'CanShare',
      description: 'Send and receive files using distributed technology',
      translate: 'cards.CanShare',
      url: 'https://canshare.io/',
      type: 'helper'
    },
    {
      name: 'CanTrack',
      description: 'A crisp and easy to use task tracker to help you with your project',
      translate: 'cards.CanTrack',
      url: 'https://CanTrack.io',
      type: 'helper'
    },
    {
      name: 'CanSign',
      description: 'Upload documents to IPFS and sign them with your Ethereum address.',
      translate: 'cards.CanSign',
      url: 'https://CanSign.io',
      type: 'helper'
    },
    {
      name: 'CanSeek',
      description: 'Hire and be hired with decentralised technology',
      translate: 'cards.CanSeek',
      url: 'https://CanSeek.io',
      type: 'main'
    }
  ]

  _exclude: Array<string> = []

  @Input()
  set exclude(exclude: Array<string>) {
    this._exclude = exclude
  }


  imgURL: string = 'https://canya.io/images/CanApps/illustrations'
  logoURL: string = 'https://canya.io/images/CanApps/logos'

  constructor() {}

  ngOnInit() {
    this.apps = this.apps.map(app => {
      if (this._exclude.indexOf(app.name) != -1) {
        return false
      }

      app.img = `${this.imgURL}/${app.name}.svg`
      app.logo = `${this.logoURL}/${app.name}.svg`

      return app
    }).filter(app => {
      return app.name
    })
  }

  inExclude(name: string){
    return true
  }

}
