export class NavItem {

  href: string;
  routerLink: any;
  target = '_blank';
  innerHtml: string;
  class: string;
  replace = false;
  onClick: string;

  constructor(href: string, innerHtml: string, classes: string) {
    this.href = href;
    this.innerHtml = innerHtml;
    this.class = classes;
  }
}
