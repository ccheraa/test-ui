import { Selector } from 'testcafe';
import { url } from './utils';

fixture `Login form`
  .page `${url}`;

test('Fails login using keyboard', async t => {
  await t
    .typeText('#username-input', 'username')
    .typeText('#password-input', 'password')
    .pressKey('enter')
    .expect(Selector('#login-form').find('.success').getStyleProperty('display'))
      .eql('none')
    .expect(Selector('#login-form').find('.error').getStyleProperty('display'))
      .notEql('none');
});

test('Successful login using keyboard', async t => {
  await t
    .typeText('#username-input', 'root')
    .typeText('#password-input', 'admin')
    .pressKey('enter')
    .expect(Selector('#login-form').find('.success').getStyleProperty('display'))
      .notEql('none')
    .expect(Selector('#login-form').find('.error').getStyleProperty('display'))
      .eql('none')
    .wait(1500)
    .expect(Selector('#login-form').find('.success').getStyleProperty('display'))
      .eql('none');
});

test('Failed login using mouse', async t => {
  await t
    .typeText('#username-input', 'username')
    .typeText('#password-input', 'password')
    .click('#login-form input[type=submit]')
    .expect(Selector('#login-form').find('.success').getStyleProperty('display'))
      .eql('none')
    .expect(Selector('#login-form').find('.error').getStyleProperty('display'))
      .notEql('none');
});

test('Successful login using mouse', async t => {
  await t
    .typeText('#username-input', 'root')
    .typeText('#password-input', 'admin')
    .click('#login-form input[type=submit]')
    .expect(Selector('#login-form').find('.success').getStyleProperty('display'))
      .notEql('none')
    .expect(Selector('#login-form').find('.error').getStyleProperty('display'))
      .eql('none')
    .wait(1500)
    .expect(Selector('#login-form').find('.success').getStyleProperty('display'))
      .eql('none');
});
