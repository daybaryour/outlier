import { OutlierPage } from './app.po';

describe('outlier App', () => {
  let page: OutlierPage;

  beforeEach(() => {
    page = new OutlierPage();
  });

  it('should display welcome message', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('Welcome to app!');
  });
});
