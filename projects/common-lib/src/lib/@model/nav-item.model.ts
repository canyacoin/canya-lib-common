export class NavItem {

  href: string
  routerLink: any
  target: string = '_blank'
  innerHtml: string
  class: string
  replace: boolean = false
  onClick: string

  constructor(href: string, innerHtml: string){
    this.href = href
    this.innerHtml = innerHtml
  }

}