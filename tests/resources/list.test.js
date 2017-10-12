/* External dependencies */
import skipIf from 'skip-if';

/* Internal dependencies */
import Trello from '../../src/index';

describe('LST | List Resource', () => {
  let trello;
  let listData = {};
  let listId = '';
  let isSkipped = true;

  beforeAll(() => {
    trello =  new Trello(global.config);
    if (global.resources.list) listId = global.resources.list.id;
    isSkipped = (listId === '');
  });

  describe('LST-G | List GET requests', () => {
    beforeAll((done) => {
      setTimeout(() => done(), global.testDelay);
    });

    skipIf((isSkipped), 'LST-G-01-T01 | gets a List', () => {
      expect.assertions(1);
      return expect(
        trello.lists(listId).getList()
      ).resolves.toBeDefined();
    });

    skipIf((isSkipped), 'LST-G-01-T02 | gets a List with some arguments', () => {
      expect.assertions(1);
      return expect(
        trello.lists(listId).getList({
          cards: 'all',
          board: true,
          fields: 'all',
        })
      ).resolves.toBeDefined();
    });

    skipIf((isSkipped), 'LST-G-01-T03 | gets a List with all arguments', async () => {
      const response = await trello.lists(listId).getList({
        cards: 'all',
        cardFields: 'all',
        board: true,
        boardFields: 'all',
        fields: 'all',
      });
      listData = response.data || {};
      expect(response.data).toBeDefined();
    });

    skipIf((isSkipped), 'LST-G-02-T01 | gets the value of the name field for the List', () => {
      expect.assertions(1);
      return expect(
        trello.lists(listId).getFieldValue('name')
      ).resolves.toBeDefined();
    });

    skipIf((isSkipped), 'LST-G-03-T01 | gets the associated Actions', () => {
      expect.assertions(1);
      return expect(
        trello.lists(listId).actions().getActions()
      ).resolves.toBeDefined();
    });

    skipIf((isSkipped), 'LST-G-03-T02 | gets the 10 Actions with filter applied', () => {
      expect.assertions(1);
      return expect(
        trello.lists(listId).actions().getActions({ filter: 'all', limit: 10 })
      ).resolves.toBeDefined();
    });

    skipIf((isSkipped), 'LST-G-04-T01 | gets the associated Board', () => {
      expect.assertions(1);
      return expect(
        trello.lists(listId).board().getBoard()
      ).resolves.toBeDefined();
    });

    skipIf(
      (isSkipped),
      'LST-G-04-T02 | gets only the specified fields for the associated Board',
      () => {
        expect.assertions(1);
        return expect(
          trello.lists(listId).board().getBoard({ fields: ['desc', 'name'] })
        ).resolves.toBeDefined();
    });

    skipIf(
      (isSkipped),
      'LST-G-05-T01 | gets the value of the name field of the associated Board',
      () => {
        expect.assertions(1);
        return expect(
          trello.lists(listId).board().getFieldValue('name')
        ).resolves.toBeDefined();
    });

    skipIf((isSkipped), 'LST-G-06-T01 | gets the associated Cards', () => {
      expect.assertions(1);
      return expect(
        trello.lists(listId).cards().getCards()
      ).resolves.toBeDefined();
    });

    skipIf(
      (isSkipped),
      'LST-G-06-T02 | gets only the specified fields for the associated Cards',
      () => {
        expect.assertions(1);
        return expect(
          trello.lists(listId).cards().getCards({ fields: ['name', 'pos'] })
        ).resolves.toBeDefined();
    });

    skipIf((isSkipped), 'LST-G-07-T01 | gets only the closed Cards with filter applied', () => {
      expect.assertions(1);
      return expect(
        trello.lists(listId).cards().getCards({ filter: 'closed' })
      ).resolves.toBeDefined();
    });
  });

  describe('LST-U | List PUT requests', () => {
    beforeAll((done) => {
      setTimeout(() => done(), global.testDelay);
    });

    skipIf((isSkipped), 'LST-U-01-T01 | updates a List', () => {
      expect.assertions(1);
      return expect(
        trello.lists(listId).updateList({
          name: 'LST-U-01-T01',
          closed: false,
          pos: 'bottom',
        })
      ).resolves.toBeDefined();
    });

    skipIf((isSkipped), 'LST-U-02-T01 | updates the closed status of a List', () => {
      expect.assertions(1);
      return expect(
        trello.lists(listId).updateClosedStatus(false)
      ).resolves.toBeDefined();
    });

    skipIf((isSkipped), 'LST-U-03-T01 | moves the List to a different Board', () => {
      if (!global.resources.board) throw new Error('Board not found for List.');
      const boardId = global.resources.board.id;

      expect.assertions(1);
      return expect(
        trello.lists(listId).moveToBoard(boardId)
      ).resolves.toBeDefined();
    });

    skipIf((isSkipped), 'LST-U-04-T01 | updates the name of a List', () => {
      expect.assertions(1);
      return expect(
        trello.lists(listId).updateName('LST-U-04-T01')
      ).resolves.toBeDefined();
    });

    skipIf((isSkipped), 'LST-U-05-T01 | updates the position of a List', () => {
      expect.assertions(1);
      return expect(
        trello.lists(listId).updatePosition('top')
      ).resolves.toBeDefined();
    });

    skipIf((isSkipped), 'LST-U-06-T01 | updates the subscribed status of a List', () => {
      expect.assertions(1);
      return expect(
        trello.lists(listId).updateSubscribed(true)
      ).resolves.toBeDefined();
    });
  });
});
