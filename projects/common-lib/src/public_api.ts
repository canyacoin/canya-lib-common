/*
 * Public API Surface of common-lib
 */

export * from './lib/common-lib.module';
export * from './lib/header/header.component';
export * from './lib/@pipe/keep-html.pipe';

// CanPay
export * from './lib/canpay/canpay.module';
export * from './lib/canpay/services/canpay.service';
export * from './lib/canpay/canpay-wizard/canpay-wizard.component';
export * from './lib/canpay/bancor-wc/bancor-wc.component';
export * from './lib/canpay/metamask/metamask.component';


export { Language } from './lib/@model/language.model';
export { NavItem } from './lib/@model/nav-item.model';
export { LanguageService } from './lib/@service/language.service';
export { KeepHtmlPipe } from './lib/@pipe/keep-html.pipe';
export { HeaderComponent } from './lib/header/header.component';
export { FooterComponent } from './lib/footer/footer.component';
export { FooterSectionComponent } from './lib/footer-section/footer-section.component';
export { LanguageSwitchComponent } from './lib/language-switch/language-switch.component';
export { CommonLibModule } from './lib/common-lib.module';
