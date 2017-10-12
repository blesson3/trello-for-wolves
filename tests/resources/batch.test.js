/* External dependencies */
import skipIf from 'skip-if';

/* Internal dependencies */
import Trello from '../../src/index';

describe('BTC | Batch Resource', () => {
  const { board = { id: 0 }, card = { id: 0 } } = global.resources;
  let trello;

  beforeAll((done) => {
    trello =  new Trello(global.config);
    setTimeout(() => done(), global.testDelay);
  });

  describe('BTC-G | Batch GET requests', () => {
    let isSkipped = false;

    before(() => {
      isSkipped = (board.id === 0 || card.id === 0);
    });

    skipIf((isSkipped), 'BTC-G-01-T01 | performs a batch request when passed correct URLs', () => {
      expect.assertions(1);
      return expect(
        trello.batch().makeRequests([`/boards/${board.id}`, `/cards/${card.id}`])
      ).resolves.toBeDefined();
    });

    skipIf((isSkipped), 'BTC-G-01-T02 | fails gracefully when passed an invalid URL', () => {
      expect.assertions(1);
      return expect(
        trello.batch().makeRequests([`/boards${board.id}`, `/cards/${card.id}`])
      ).resolves.toBeDefined();
    });
  });
});
