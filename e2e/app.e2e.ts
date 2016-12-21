import { browser, element, by } from 'protractor';

describe('Dashboard', () => {

  beforeEach(() => {
    browser.get('/');
  });

  it('should have a title', () => {
    let subject = browser.getTitle();
    let result  = 'Angular 2 App';
    expect(subject).toEqual(result);
  });

  it('should have header', () => {
    let subject = element(by.tagName('header')).element(by.tagName('h2')).getText();
    let result  = 'Angular Starter App';
    expect(subject).toEqual(result);
  });

  it('should welcome the user', () => {
    let subject = element(by.tagName('my-dashboard'))
      .element(by.tagName('h3')).getText();
    let result  = 'Welcome to the Dashboard Angular User!';
    expect(subject).toEqual(result);
  });

  it('should edit the name', () => {
    let dashboard = element(by.tagName('my-dashboard'));
    let input = dashboard.element(by.tagName('input'));
    input.clear();
    input.sendKeys('Boss');
    let button = dashboard.element(by.buttonText('Update store'));
    button.click();
    let subject = element(by.tagName('my-dashboard'))
      .element(by.tagName('h3')).getText();
    let result  = 'Welcome to the Dashboard Boss!';
    expect(subject).toEqual(result);
  });

});

describe('Lazy', () => {

  it('should lazy load a module', () => {
    browser.get('/lazy');
    let subject = element(by.tagName('my-lazy'));
    expect(subject.isPresent()).toBe(true);
  })

});

describe('Sync', () => {

  it('should load a syncronous module', () => {
    browser.get('/sync');
    let subject = element(by.tagName('my-sync'));
    expect(subject.isPresent()).toBe(true);
  })

});

describe('Not Found', () => {

  it('should display a 404 error', () => {
    browser.get('/wronglink');
    let subject = element(by.tagName('my-not-found'));
    expect(subject.isPresent()).toBe(true);
  })

});
