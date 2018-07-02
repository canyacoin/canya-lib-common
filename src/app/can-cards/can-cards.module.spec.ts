import { CanCardsModule } from './can-cards.module';

describe('CanCardsModule', () => {
  let canCardsModule: CanCardsModule;

  beforeEach(() => {
    canCardsModule = new CanCardsModule();
  });

  it('should create an instance', () => {
    expect(canCardsModule).toBeTruthy();
  });
});
