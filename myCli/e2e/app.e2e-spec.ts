import { MyCliPage } from './app.po';

describe('my-cli App', function() {
  let page: MyCliPage;

  beforeEach(() => {
    page = new MyCliPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
