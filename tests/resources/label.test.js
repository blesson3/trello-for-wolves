/* External dependencies */
import skipIf from 'skip-if';

/* Internal dependencies */
import Trello from '../../src/index';

describe('LBL | Label Resource', () => {
  let trello;
  let labelData = {};
  let labelId = '';
  let isSkipped = true;

  before(() => {
    trello =  new Trello(global.config);
    if (global.resources.labels) labelId = global.resources.labels[0].id;
    isSkipped = (labelId === '');
  });

  describe('LBL-G | Label GET requests', () => {
    beforeAll((done) => {
      setTimeout(() => done(), global.testDelay);
    });

    skipIf((isSkipped), 'LBL-G-01-T01 | gets a Label', () => {
      expect.assertions(1);
      return expect(
        trello.labels(labelId).getLabel()
      ).resolves.toBeDefined();
    });

    skipIf((isSkipped), 'LBL-G-01-T02 | gets a Label with all arguments', async () => {
      const response = await trello.labels(labelId).getLabel({ fields: 'all' });
      labelData = response.data || {};
      expect(response.data).toBeDefined();
    });

    skipIf((isSkipped), 'LBL-G-03-T01 | gets the associated Board', () => {
      expect.assertions(1);
      return expect(
        trello.labels(labelId).board().getBoard()
      ).resolves.toBeDefined();
    });

    skipIf(
      (isSkipped),
      'LBL-G-03-T02 | gets only the specified fields for the associated Board',
      () => {
        expect.assertions(1);
        return expect(
          trello.labels(labelId).board().getBoard({ fields: ['desc', 'name'] })
        ).resolves.toBeDefined();
    });

    skipIf(
      (isSkipped),
      'LBL-G-04-T01 | gets the value of the name field of the associated Board',
      () => {
        expect.assertions(1);
        return expect(
          trello.labels(labelId).board().getFieldValue('name')
        ).resolves.toBeDefined();
    });
  });

  describe('LBL-U | Label PUT requests', () => {
    beforeAll((done) => {
      setTimeout(() => done(), global.testDelay);
    });

    skipIf((isSkipped), 'LBL-U-01-T01 | updates a Label', () => {
      expect.assertions(1);
      return expect(
        trello.labels(labelId).updateLabel({ name: 'LBL-U-01-T01' })
      ).resolves.toBeDefined();
    });

    skipIf((isSkipped), 'LBL-U-02-T01 | updates the color of a Label', () => {
      expect.assertions(1);
      return expect(
        trello.labels(labelId).updateColor('blue')
      ).resolves.toBeDefined();
    });

    skipIf((isSkipped), 'LBL-U-03-T01 | updates the name of a Label', () => {
      expect.assertions(1);
      return expect(
        trello.labels(labelId).updateName('LBL-U-03-T01')
      ).resolves.toBeDefined();
    });
  });
});
