import { Component, OnInit, ViewEncapsulation, Input } from '@angular/core';
import { NavItem } from '../@model/nav-item.model';

@Component({
  selector: 'canyalib-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
  encapsulation: ViewEncapsulation.Native,
})

export class HeaderComponent implements OnInit {

  _logo: any = {
    href: '#',
    src: 'https://canya.com/assets/img/logo.svg',
    alt: 'CanYa Logo',
    onClick: null
  };

  _navItems: Array<NavItem> = [
    new NavItem('https://blog.canya.com.au/', 'header.blog', null),
    new NavItem('https://forum.canya.io', 'header.forum', null),
    new NavItem('https://t.me/joinchat/GI97FhDD1lf6dh-r9XRdvA', 'header.telegram', null),
  ];

  _buttons: Array<NavItem> = [];
  _anchorButtons: Array<NavItem> = [];

  @Input()
  set logo(logo: any) {
    this._logo.src = logo.src;
    this._logo.alt = logo.alt;
    this._logo.href = logo.href;
    this._logo.routerLink = logo.routerLink;
    this._logo.onClick = logo.onClick;
  }

  @Input()
  set navItems(navItems: Array<any>) {
    navItems.forEach(navItem => {
      const _navItem = new NavItem(navItem.href, navItem.innerHtml, navItem.class);

      _navItem.class = navItem.class;
      _navItem.replace = navItem.replace;
      _navItem.onClick = navItem.onClick;
      _navItem.routerLink = navItem.routerLink;

      this._navItems[navItem.index] = _navItem;
    });
  }

  @Input()
  set buttons(buttons: Array<any>) {
    buttons.forEach(navItem => {
      const _navItem = new NavItem(navItem.href, navItem.innerHtml,  navItem.class);

      _navItem.class = navItem.class;
      _navItem.replace = navItem.replace;
      _navItem.onClick = navItem.onClick;
      _navItem.routerLink = navItem.routerLink;

      this._buttons[navItem.index] = _navItem;
    });
  }

  @Input()
  set anchorButtons(anchorButtons: Array<any>) {
    anchorButtons.forEach(navItem => {
      const _navItem = new NavItem(navItem.href, navItem.innerHtml, navItem.class);

      _navItem.class = navItem.class;
      _navItem.replace = navItem.replace;
      _navItem.onClick = navItem.onClick;
      _navItem.routerLink = navItem.routerLink;

      this._anchorButtons[navItem.index] = _navItem;
    });
  }

  constructor() {}

  ngOnInit() {}

  onClick(fn: any) {
    if (!fn) {
      return false;
    }

    const ref = fn[0];
    const fnName = fn[1];
    const args = fn[2];

    ref[fnName].apply(ref, args);
  }

}
