/* External dependencies */
import skipIf from 'skip-if';

/* Internal dependencies */
import Trello from '../../src/index';

describe('ARQ | API Request', () => {
  let trello;
  let boardId = '';
  let listId = '';
  let isSkipped = false;

  beforeAll(() => {
    trello = new Trello(global.config);
    if (global.resources.board) boardId = global.resources.board.id;
    isSkipped = (boardId === '');
  });

  describe('ARQ-SETUP | API Request Setup', () => {
    skipIf(
      (isSkipped),
      'ARQ-SETUP-T01 | creates a List on a Board for testing rate limits',
      async () => {
        expect.assertions(1);
        const response = await trello.boards(boardId).lists().addList({
          name: 'ARQ-SETUP-T01',
        });
        if (response.data) listId = response.data.id;
        expect(response.data).toBeDefined();
      });
  });

  describe('ARQ-EXECUTE | API Request Test Execution', () => {
    beforeAll(() => {
      if (!listId) throw new Error('List Id not found.  API request testing cannot proceed.');
    });

    skipIf(
      (isSkipped),
      'ARQ-EXECUTE-T01 | creates 110 Cards in a List to validate rate limiter',
      async () => {
        let queuedRequests = [];
        for (let i = 0; i < 110; i++) {
          queuedRequests.push(trello.lists(listId).cards().addCard({ name: `(1) CARD-${i}` }));
        }
        const responses = await Promise.all(queuedRequests);

        expect.assertions(1);
        expect(responses.length).toEqual(110);
    });

    skipIf(
      (isSkipped),
      'ARQ-EXECUTE-T02 | deletes 110 Cards in a List to validate rate limiter',
      async () => {
        const response = await trello.lists(listId).cards().getCards({ fields: 'idList' });
        const cardIds = response.data.map(item => item.id);

        const deletionRequests = cardIds.map(cardId => trello.cards(cardId).deleteCard());
        const responses = await Promise.all(deletionRequests);

        expect.assertions(1);
        expect(responses.length).toEqual(110);
    });
  });
});
