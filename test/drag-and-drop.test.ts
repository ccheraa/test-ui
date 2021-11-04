import { Selector } from 'testcafe';
import { url } from './utils';

fixture `Drag and Drop`
  .page `${url}`;

test('Drags a fruit to shopping list', async t => {
  await t
    .dragToElement('#fruits #fruit-1', '#shopping-list')
    .expect(Selector('#fruits').find('#fruit-1').exists)
      .notOk()
    .expect(Selector('#shopping-list').find('#fruit-1').exists)
      .ok();
});

test.disablePageReloads('Doesn\'t drag a fruit to the same list', async t => {
  await t
    .dragToElement('#fruits #fruit-2', '#fruits')
    .expect(Selector('#fruits').find('#fruit-2').exists)
      .ok()
    .expect(Selector('#shopping-list').find('#fruit-2').exists)
      .notOk();
});

test.disablePageReloads('Drags a fruit back from shopping list', async t => {
  await t
    // .dragToElement('#fruits #fruit-1', '#shopping-list')
    .dragToElement('#shopping-list #fruit-1', '#fruits')
    .expect(Selector('#fruits').find('#fruit-1').exists)
      .ok()
    .expect(Selector('#shopping-list').find('#fruit-1').exists)
      .notOk();
});
