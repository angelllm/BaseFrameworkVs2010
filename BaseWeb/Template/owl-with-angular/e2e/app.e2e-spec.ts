import { OwlWithAngularPage } from './app.po';

describe('owl-with-angular App', function() {
  let page: OwlWithAngularPage;

  beforeEach(() => {
    page = new OwlWithAngularPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
