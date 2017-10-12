/* External dependencies */
import skipIf from 'skip-if';

/* Internal dependencies */
import Trello from '../../src/index';

describe('CHK | Checklist Resource', () => {
  let trello;
  let checklistData = {};
  let checklistId = '';
  let isSkipped = false;

  before(() => {
    trello =  new Trello(global.config);
    if (global.resources.checklist) checklistId = global.resources.checklist.id;
    isSkipped = (checklistId === '');
  });

  describe('CHK-G | Checklist GET requests', () => {
    beforeAll((done) => {
      setTimeout(() => done(), global.testDelay);
    });

    skipIf((isSkipped), 'CHK-G-01-T01 | gets a Checklist', () => {
      expect.assertions(1);
      return expect(
        trello.checklists(checklistId).getChecklist()
      ).resolves.toBeDefined();
    });

    skipIf((isSkipped), 'CHK-G-01-T02 | gets a Checklist with some arguments', () => {
      expect.assertions(1);
      return expect(
        trello.checklists(checklistId).getChecklist({
          cards: 'all',
          fields: 'all',
        })
      ).resolves.toBeDefined();
    });

    skipIf((isSkipped), 'CHK-G-01-T03 | gets a Checklist with all arguments', async () => {
      const response = await trello.checklists(checklistId).getChecklist({
        cards: 'all',
        cardFields: 'all',
        checkItems: 'all',
        checkItemFields: 'all',
        fields: 'all',
      });
      checklistData = response.data || {};
      expect(response.data).toBeDefined();
    });

    skipIf((isSkipped), 'CHK-G-02-T01 | gets the value of the name field for the Checklist', () => {
      expect.assertions(1);
      return expect(
        trello.checklists(checklistId).getFieldValue('name')
      ).resolves.toBeDefined();
    });

    skipIf((isSkipped), 'CHK-G-03-T01 | gets the associated Board', () => {
      expect.assertions(1);
      return expect(
        trello.checklists(checklistId).board().getBoard()
      ).resolves.toBeDefined();
    });

    skipIf(
      (isSkipped),
      'CHK-G-03-T02 | gets only the specified fields for the associated Board',
      () => {
        expect.assertions(1);
        return expect(
          trello.checklists(checklistId).board().getBoard({ fields: ['desc', 'name'] })
        ).resolves.toBeDefined();
    });

    skipIf(
      (isSkipped),
      'CHK-G-04-T01 | gets the value of the name field of the associated Board',
      () => {
        expect.assertions(1);
        return expect(
          trello.checklists(checklistId).board().getFieldValue('name')
        ).resolves.toBeDefined();
    });

    skipIf((isSkipped), 'CHK-G-05-T01 | gets the associated Cards', () => {
      expect.assertions(1);
      return expect(
        trello.checklists(checklistId).cards().getCards()
      ).resolves.toBeDefined();
    });

    skipIf(
      (isSkipped),
      'CHK-G-05-T02 | gets only the specified fields for the associated Cards',
      () => {
        expect.assertions(1);
        return expect(
          trello.checklists(checklistId).cards().getCards({ fields: ['name', 'pos'] })
        ).resolves.toBeDefined();
    });

    skipIf((isSkipped), 'CHK-G-06-T01 | gets only the closed Cards with filter applied', () => {
      expect.assertions(1);
      return expect(
        trello.checklists(checklistId).cards().getCards({ filter: 'closed' })
      ).resolves.toBeDefined();
    });

    skipIf((isSkipped), 'CHK-G-07-T01 | gets the associated Check Items', () => {
      expect.assertions(1);
      return expect(
        trello.checklists(checklistId).checkItems().getCheckItems()
      ).resolves.toBeDefined();
    });

    skipIf(
      (isSkipped),
      'CHK-G-08-T01 | gets the associated Check Item with the specified Id',
      () => {
        if (!checklistData.checkItems) throw new Error('Check Items not found.');
        const checkItemId = checklistData.checkItems[0].id;

        expect.assertions(1);
        return expect(
          trello.checklists(checklistId).checkItems(checkItemId).getCheckItem()
        ).resolves.toBeDefined();
    });
  });

  describe('CHK-U | Checklist PUT requests', () => {
    beforeAll((done) => {
      setTimeout(() => done(), global.testDelay);
    });

    skipIf((isSkipped), 'CHK-U-01-T01 | updates a Checklist', () => {
      expect.assertions(1);
      return expect(
        trello.checklists(checklistId).updateChecklist({ name: 'CHK-U-01-T01' })
      ).resolves.toBeDefined();
    });

    skipIf((isSkipped), 'CHK-U-02-T01 | updates the name of a Checklist', () => {
      expect.assertions(1);
      return expect(
        trello.checklists(checklistId).updateName('CHK-U-02-T01')
      ).resolves.toBeDefined();
    });

    skipIf((isSkipped), 'CHK-U-03-T01 | updates the position of a Checklist', () => {
      expect.assertions(1);
      return expect(
        trello.checklists(checklistId).updatePosition('top')
      ).resolves.toBeDefined();
    });
  });
});
