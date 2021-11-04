import { result } from 'lodash';
import { RequestLogger, RequestMock, Selector } from 'testcafe';
import { url } from './utils';

// urls can be filtered using the url property
const log = RequestLogger({
  // url: 'http://....',
  method: 'get',
}, {
  logRequestHeaders: true,
});

const fakeUrl = `${url}/not-found-2`;
const fakeBody = 'Fake data';
const mock = RequestMock()
  .onRequestTo(fakeUrl)
  .respond(fakeBody, 200);

fixture `API Calls`
  .page `${url}`
  .requestHooks(log, mock);

test('Call should return 200', async t => {
  await t
    .click('#api-button1')
    .expect(log.contains(({ request, response }) =>
      request.url === 'http://httpstat.us/200' &&
      response.statusCode === 200))
      .ok();
});

test.disablePageReloads('Call should fail with 500', async t => {
  await t
    .click('#api-button2')
    .expect(log.contains(({ request, response }) =>
      request.url === 'http://httpstat.us/500' &&
      response.statusCode === 500))
      .ok();
});

test.disablePageReloads('Call should fail with 404', async t => {
  await t
    .click('#api-button3')
    .expect(log.contains(({ request, response }) =>
      request.url === `${url}/not-found` &&
      response.statusCode === 404))
      .ok();
});

test.disablePageReloads('Call should return fake data', async t => {
  await t
    .click('#api-button4')
    .expect(Selector('#api-message4').innerText)
      .contains(fakeBody);
});
