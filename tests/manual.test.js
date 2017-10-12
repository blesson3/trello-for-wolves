/* External dependencies */
import fs from 'fs';

/* Internal dependencies */
import Trello from '../src/index';
import performApiRequest from '../src/utils/api-request';

describe('Manual Tests', () => {
  let trello;

  beforeAll((done) => {
    trello = new Trello(global.config);
    setTimeout(() => done(), 1000);
  });

  test.skip('posts a text file attachment to a Card using streams', async () => {
    const textFilePath = `${assetsDir}/file.txt`;
    const fileStream = fs.createReadStream(textFilePath);
    expect.assertions(1);
    const response = await trello.cards('[CARD_ID]').attachments().uploadAttachment({
      file: fileStream,
      name: 'Hooray.txt',
      mimeType: 'text/plain'
    });
    expect(response.data).toBeDefined();
  });

  test('ARQ-EXECUTE-T03 | fails gracefully when an error occurs', () => {
    expect.assertions(1);
    return performApiRequest('yep', '1', 3, 300).catch(e =>
      expect(e.name).toEqual('ApiCallResponseError')
    );
  });
});
