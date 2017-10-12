/* External dependencies */
import fs from 'fs';
import skipIf from 'skip-if';

/* Internal dependencies */
import Trello from '../src/index';

describe('SETUP | Test Preparation and Setup', () => {
  let trello;

  beforeAll(() => {
    trello = new Trello(global.config);
  });

  describe('ORG-P | Organization POST requests', () => {
    let orgId = '';

    beforeAll(() => {
      if (!global.resources.org) global.resources.org = {};
    });

    test('ORG-P-01-T01 | creates an Organization', async () => {
      const orgName = 'ORG-P-01-T01';

      const response = await trello.organizations().addOrganization({
        displayName: orgName,
        desc: 'This is for testing',
      });
      const { data: { id, name, displayName } } = response;
      global.resources.org = { id, name };
      orgId = id;

      expect.assertions(1);
      expect(displayName).toEqual(orgName);
    });

    skipIf((orgId === ''), 'ORG-P-02-T01 | uploads a Logo to an Organization', () => {
      const logoFile = fs.createReadStream(`${assetsDir}/logo.jpg`);

      expect.assertions(1);
      return expect(
        trello.organizations(orgId).uploadLogo(logoFile)
      ).resolves.toBeDefined();
    });

    /**
     * @skip ORG-P-03
     * @reason Business Class account required
     */
    test.skip('ORG-P-03-T01 | adds Tags to an Organization', () => {
      expect.assertions(1);
      return expect(
        trello.organizations(orgId).addTags('')
      ).resolves.toBeDefined();
    });

    skipIf((orgId === ''), 'ORG-U-04-T01 | adds an associated Member', async () => {
      const memberFullName = 'ORG-U-04-T01';

      const response = await trello.organizations(orgId).members().addMember({
        email: 'user@test.com',
        fullName: memberFullName,
        type: 'normal',
      });
      const { data: { members } } = response;
      const { id, fullName, username } = members.pop();
      global.resources.member = { id, username };

      expect.assertions(1);
      expect(fullName).toEqual(memberFullName);
    });
  });

  describe('BRD-P | Board POST requests', () => {
    let boardId = '';

    beforeAll((done) => {
      if (!global.resources.board) global.resources.board = {};
      setTimeout(() => done(), global.testDelay);
    });

    test('BRD-P-01-T01 | creates a Board', async () =>{
      const boardName = 'BRD-P-01-T01';

      const response = await trello.boards().addBoard({
        name: boardName,
        defaultLabels: false,
        defaultLists: false,
        idOrganization: global.resources.org.id,
        prefs: {
          permissionLevel: 'private',
        },
      });
      const { data: { id, name } } = response;
      global.resources.board = { id, name };
      boardId = id;

      expect.assertions(1);
      expect(name).toEqual(boardName);
    });

    /**
     * @skip BRD-P-02
     * @reason Excessive Data
     * @passed 06.09.17
     */
    test.skip('BRD-P-02-T01 | generates a calendar key for a Board', () => {
      expect.assertions(1);
      return expect(
        trello.boards(boardId).generateCalendarKey()
      ).resolves.toBeDefined();
    });

    // @fix: Getting error with invalid idCard?
    test.skip('BRD-P-03-T01 | adds a Checklist to a Board', async () => {
      const checklistName = 'BRD-P-03-T01';

      const response = await trello.boards(boardId).checklists().addChecklist({
        name: checklistName,
      });
      const { data: { id, name } } = response;
      global.resources.board.checklist = { id, name };

      expect.assertions(1);
      expect(name).toEqual(checklistName);
    });

    /**
     * @skip BRD-P-04
     * @reason Excessive Data
     * @passed 06.09.17
     */
    test.skip('BRD-P-04-T01 | generates an email key for a Board', () => {
      expect.assertions(1);
      return expect(
        trello.boards(boardId).generateEmailKey()
      ).resolves.toBeDefined();
    });

    /**
     * @skip BRD-P-05
     * @reason Business Class account required
     */
    test.skip('BRD-P-05-T01 | adds Tags to a Board', () => {
      expect.assertions(1);
      return expect(
        trello.boards(boardId).addTags('[tag]')
      ).resolves.toBeDefined();
    });

    skipIf((boardId === ''), 'BRD-P-06-T01 | adds a Label to a Board', async () => {
      const labelName = 'BRD-P-06-T01';

      const response = await trello.boards(boardId).labels().addLabel({
        name: labelName,
        color: 'blue',
      });
      const { data: { id, name } } = response;
      global.resources.board.label = { id, name };

      expect.assertions(1);
      expect(name).toEqual(labelName);
    });

    skipIf((boardId === ''), 'BRD-P-06-T01 | adds a List to a Board', async () => {
      const listName = 'BRD-P-06-T01';

      const response = await trello.boards(boardId).lists().addList({
        name: listName,
      });
      const { data: { id, name } } = response;
      global.resources.board.list = { id, name };

      expect.assertions(1);
      expect(name).toEqual(listName);
    });

    skipIf((boardId === ''), 'BRD-P-08-T01 | marks Board as viewed', () => {
      expect.assertions(1);
      return expect(
        trello.boards(boardId).markAsViewed()
      ).resolves.toBeDefined();
    });

    // @fix: Figure out why this isn't working.
    test.skip('BRD-P-09-T01 | adds a PowerUp to a Board', () => {
      expect.assertions(1);
      return expect(
        trello.boards(boardId).addPowerUp('cardAging')
      ).resolves.toBeDefined();
    });
  });

  describe('LBL-P | Label POST requests', () => {
    let boardId = '';
    let isSkipped = false;

    beforeAll((done) => {
      if (global.resources.board) boardId = global.resources.board.id;
      isSkipped = (boardId === '');
      if (!global.resources.labels) global.resources.labels = [];
      setTimeout(() => done(), global.testDelay);
    });

    skipIf((isSkipped), 'LBL-P-01-T01 | creates a Green Label', async () => {
      const labelName = 'LBL-P-01-T01';

      const response = await trello.labels().addLabel({
        name: labelName,
        color: 'green',
        idBoard: boardId,
      });
      const { data: { id, name } } = response;
      global.resources.labels.push({ id, name });

      expect.assertions(1);
      expect(name).toEqual(labelName);
    });

    skipIf((isSkipped), 'LBL-P-01-T02 | creates a Blue Label', async () => {
      const labelName = 'LBL-P-01-T02';

      const response = await trello.labels().addLabel({
        name: labelName,
        color: 'blue',
        idBoard: boardId,
      });
      const { data: { id, name } } = response;
      global.resources.labels.push({ id, name });

      expect.assertions(1);
      expect(name).toEqual(labelName);
    });
  });

  describe('LST-P | List POST requests', () => {
    let listId = '';

    beforeAll((done) => {
      if (!global.resources.list) global.resources.list = {};
      setTimeout(() => done(), global.testDelay);
    });

    test('LST-P-01-T01 | creates a List', async () => {
      const listName = 'LST-P-01-T01';
      const boardId = global.resources.board.id;
      if (!boardId) throw new Error('Board not found.');

      const response = await trello.lists().addList({
        name: listName,
        idBoard: boardId,
      });
      const { data: { id, name } } = response;
      global.resources.list = { id, name };
      listId = id;

      expect.assertions(1);
      expect(name).toEqual(listName);
    });

    skipIf((listId === ''), 'LST-P-03-T01 | adds a Card to a List with no description', async () => {
      if (!global.resources.list.cards) global.resources.list.cards = [];
      const cardName = 'LST-P-03-T01';

      const response = await trello.lists(listId).cards().addCard({
        name: cardName,
        due: null,
      });
      const { data: { id, name } } = response;
      global.resources.list.cards.push({ id, name });

      expect.assertions(1);
      expect(name).toEqual(cardName);
    });

    skipIf((listId === ''), 'LST-P-03-T02 | adds a Card to a List with description and label', async () => {
      const cardName = 'LST-P-03-T02';

      const response = await trello.lists(listId).cards().addCard({
        name: cardName,
        desc: 'This is a test card.',
        labels: 'blue',
        due: null,
      });
      const { data: { id, name } } = response;
      global.resources.list.cards.push({ id, name });

      expect.assertions(1);
      expect(name).toEqual(cardName);
    });

    skipIf((listId === ''), 'LST-P-04-T01 | moves all Cards to a List', () => {
      const boardId = global.resources.board.id;

      expect.assertions(1);
      return expect(
        trello.lists(listId).moveAllCards({ idBoard: boardId, idList: listId })
      ).resolves.toBeDefined();
    });

    skipIf((listId === ''), 'LST-P-02-T01 | archives all Cards on a List', () => {
      expect.assertions(1);
      return expect(
        trello.lists(listId).archiveAllCards()
      ).resolves.toBeDefined();
    });
  });

  describe('CAR-P | Card POST Requests', () => {
    let cardId = '';

    beforeAll((done) => {
      if (!global.resources.card) global.resources.card = {};
      setTimeout(() => done(), global.testDelay);
    });

    test('CAR-P-01-T01 | creates a Card', async () => {
      if (!global.resources.list) throw new Error('List Id not found.');
      const listId = global.resources.list.id;
      const cardName = 'CAR-P-01-T01';

      const response = await trello.cards().addCard({
        idList: listId,
        name: cardName,
        desc: 'This is a test description',
      });
      const { data: { id, name } } = response;
      global.resources.card = { id, name };
      cardId = id;

      expect.assertions(1);
      expect(name).toEqual(cardName);
    });

    skipIf((cardId === ''), 'CAR-P-02-T01 | adds a Comment to a Card', async () => {
      const commentText = 'CAR-P-02-T01';

      const response = await trello.cards(cardId).comments().addComment(commentText);
      const { data: { id, data: { text } } } = response;
      global.resources.card.comment = { id, text };

      expect.assertions(1);
      expect(text).toEqual(commentText);
    });

    skipIf((cardId === ''), 'CAR-P-02-T02 | adds a second Comment to a Card', async () => {
      const commentText = 'CAR-P-02-T02';

      const response = await trello.cards(cardId).comments().addComment(commentText);
      global.resources.comment = response.data;

      expect.assertions(1);
      expect(response.data).toBeDefined();
    });

    skipIf((cardId === ''), 'CAR-P-03-T01 | uploads an image Attachment to a Card', async () => {
      const attachmentFile = fs.createReadStream(`${assetsDir}/attachment.jpg`);

      const response = await trello.cards(cardId).attachments().uploadAttachment({
        file: attachmentFile,
        name: 'wolf-one.jpg',
        mimeType: 'image/jpeg',
      });
      global.resources.card.attachmentFile = response.data;

      expect.assertions(1);
      expect(response.data).toBeDefined();
    });

    skipIf((cardId === ''), 'CAR-P-03-T02 | uploads a plain text Attachment to a Card', async () => {
      const attachmentFile = fs.createReadStream(`${assetsDir}/file.txt`);

      const response = await trello.cards(cardId).attachments().uploadAttachment({
        file: attachmentFile,
        name: 'file.txt',
        mimeType: 'text/plain',
      });

      expect.assertions(1);
      expect(response.data).toBeDefined();
    });

    skipIf((cardId === ''), 'CAR-P-03-T03 | uploads an Attachment as a URL to a Card', async () => {
      const response = await trello.cards(cardId).attachments().uploadAttachment({
        url: 'http://www.spiritanimal.info/wp-content/uploads/Wolf-Spirit-Animal-2.jpg',
        name: 'wolf-two.jpg',
      });
      global.resources.card.attachmentUrl = response.data;

      expect.assertions(1);
      expect(response.data).toBeDefined();
    });

    skipIf((cardId === ''), 'CAR-P-06-T01 | adds a Checklist to a Card', async () => {
      const checklistName = 'CAR-P-06-T01';

      const response = await trello.cards(cardId).checklists().addChecklist({
        name: checklistName,
      });
      const { data: { id, name } } = response;
      global.resources.card.checklist = { id, name };

      expect.assertions(1);
      expect(name).toEqual(checklistName);
    });

    skipIf((cardId === ''), 'CAR-P-06-T02 | copies a Checklist on a Card', async () => {
      if (!global.resources.card.checklist) throw new Error('Existing Checklist not found.');
      const sourceChecklistId = global.resources.card.checklist.id;
      const checklistName = 'CAR-P-06-T02';

      const response = await trello.cards(cardId).checklists().addChecklist({
        name: checklistName,
        idChecklistSource: sourceChecklistId,
      });
      const { data: { id, name } } = response;
      global.resources.card.checklistCopy = { id, name };

      expect.assertions(1);
      expect(name).toEqual(checklistName);
    });

    skipIf(
      (cardId === ''),
      'CAR-P-04-T01 | adds a Check Item to a Checklist on a Card with default position',
      async () => {
        if (!global.resources.card.checkItems) global.resources.card.checkItems = [];
        if (!global.resources.card.checklist) throw new Error('Checklist not found.');
        const checklistId = global.resources.card.checklist.id;
        const checkItemName = 'CAR-P-04-T01';

        const response = await trello.cards(cardId).checklist(checklistId).checkItem().addCheckItem({
          name: checkItemName,
        });
        const { data: { id, idChecklist, name } } = response;
        global.resources.card.checkItems.push({ id, idChecklist, name });

        expect.assertions(1);
        expect(name).toEqual(checkItemName);
    });

    skipIf(
      (cardId === ''),
      'CAR-P-04-T02 | adds a Check Item to a Checklist on a Card with numbered position',
      async () => {
        if (!global.resources.card.checklist) throw new Error('Checklist not found.');
        const checklistId = global.resources.card.checklist.id;
        const checkItemName = 'CAR-P-04-T02';

        const response = await trello.cards(cardId).checklist(checklistId).checkItem().addCheckItem({
          name: checkItemName,
          pos: 1,
        });
        const { data: { id, idChecklist, name } } = response;
        global.resources.card.checkItems.push({ id, idChecklist, name });

        expect.assertions(1);
        expect(name).toEqual(checkItemName);
    });

    skipIf(
      (cardId === ''),
      'CAR-P-04-T03 | adds a Check Item to a Checklist on a Card with named position',
      async () => {
        if (!global.resources.card.checklist) throw new Error('Checklist not found.');
        const checklistId = global.resources.card.checklist.id;
        const checkItemName = 'CAR-P-04-T03';

        const response = await trello.cards(cardId).checklist(checklistId).checkItem().addCheckItem({
          name: checkItemName,
          pos: 'bottom',
        });
        const { data: { id, idChecklist, name } } = response;
        global.resources.card.checkItems.push({ id, idChecklist, name });

        expect.assertions(1);
        expect(name).toEqual(checkItemName);
    });

    skipIf((cardId === ''), 'CAR-P-05-T01 | converts a Check Item to a Card', async () => {
      if (!global.resources.card.checklist) throw new Error('Checklist not found.');
      const checklistId = global.resources.card.checklist.id;
      if (!global.resources.card.checkItems.length) throw new Error('Check Item not found.');
      const lastCheckItem = global.resources.card.checkItems.pop();

      const response = await trello.cards(cardId).checklist(checklistId).checkItem(lastCheckItem.id).convertToCard();
      const { data: { id, name } } = response;
      global.resources.card.convertedCard = { id, name };

      expect.assertions(1);
      expect(name).toEqual(lastCheckItem.name);
    });

    skipIf((cardId === ''), 'CAR-P-07-T01 | associates a Label with a Card', () => {
      if (!global.resources.labels.length) throw new Error('Label not found.');
      const labelId = global.resources.labels[0].id;

      expect.assertions(1);
      return expect(
        trello.cards(cardId).associateLabel(labelId)
      ).resolves.toBeDefined();
    });

    // @fix: Returns "invalid member" error.
    test.skip('CAR-P-08-T01 | associates a Member with a Card', () => {
      if (!global.resources.member) throw new Error('Member not found.');
      const memberId = global.resources.member.id;

      expect.assertions(1);
      return expect(
        trello.cards(cardId).associateMember(memberId)
      ).resolves.toBeDefined();
    });

    skipIf((cardId === ''), 'CAR-P-09-T01 | adds a Label to a Card', async () => {
      const labelName = 'CAR-P-09-T01';

      const response = await trello.cards(cardId).labels().addLabel({
        name: labelName,
        color: 'red',
      });
      const { data: { id, name } } = response;
      global.resources.card.label = { id, name };

      expect.assertions(1);
      expect(name).toEqual(labelName);
    });

    skipIf((cardId === ''), 'CAR-P-10-T01 | marks associated Notifications as read', () => {
      expect.assertions(1);
      return expect(
        trello.cards(cardId).markAssociatedNotificationsRead()
      ).resolves.toBeDefined();
    });

    // @fix: Returns "unauthorized card permission requested" error.
    test.skip('CAR-P-11-T01 | updates the Members Voted on a Card', () => {
      if (!global.resources.member) throw new Error('Member not found.');
      const memberId = global.resources.member.id;

      expect.assertions(1);
      return expect(
        trello.cards(cardId).membersVoted(memberId).updateVote(true)
      ).resolves.toBeDefined();
    });

    skipIf(
      (cardId === ''),
      'CAR-P-12-T01 | adds a Sticker with the Check image to a Card',
      async () => {
        if (!global.resources.card.stickers) global.resources.card.stickers = [];
        const imageName = 'check';

        const response = await trello.cards(cardId).stickers().addSticker({
          image: imageName,
          top: 0,
          left: 0,
          zIndex: 1,
        });
        const { data: { id, image } } = response;
        global.resources.card.stickers.push({ id, image });

        expect.assertions(2);
        expect(response.data).toBeDefined();
        expect(image).toEqual(imageName);
    });

    skipIf(
      (cardId === ''),
      'CAR-P-12-T02 | adds a Sticker with the Heart image to a Card',
      async () => {
        const imageName = 'heart';

        const response = await trello.cards(cardId).stickers().addSticker({
          image: imageName,
          top: 10,
          left: 24,
          zIndex: 2,
        });
        const { data: { id, image } } = response;
        global.resources.card.stickers.push({ id, image });

        expect.assertions(2);
        expect(response.data).toBeDefined();
        expect(image).toEqual(imageName);
    });
  });

  describe('CHK-P | Checklist POST requests', () => {
    let checklistId = '';

    beforeAll((done) => {
      if (!global.resources.checklist) global.resources.checklist = {};
      setTimeout(() => done(), global.testDelay);
    });

    test('CHK-P-01-T01 | creates a Checklist', async () => {
      const cardId = global.resources.card.id;
      if (!cardId) throw new Error('Card not found.');
      const checklistName = 'CHK-P-01-T01';

      const response = await trello.checklists().addChecklist({
        name: checklistName,
        idCard: cardId,
      });
      const { data: { id, name } } = response;
      global.resources.checklist = { id, name };
      checklistId = id;

      expect.assertions(1);
      expect(name).toEqual(checklistName);
    });

    skipIf(
      (checklistId === ''),
      'CHK-P-02-T01 | adds an unchecked Check Item to a Checklist',
      async () => {
        if (!global.resources.checklist.checkItems) global.resources.checklist.checkItems = [];
        const checkItemName = 'CHK-P-02-T01';

        const response = await trello.checklists(checklistId).checkItems().addCheckItem({
          name: checkItemName,
          checked: false,
        });
        const { data: { id, idChecklist, name } } = response;
        global.resources.checklist.checkItems.push({ id, idChecklist, name });

        expect.assertions(1);
        expect(name).toEqual(checkItemName);
    });

    skipIf(
      (checklistId === ''),
      'CHK-P-02-T02 | adds a checked Check Item to a Checklist',
      async () => {
        const checkItemName = 'CHK-P-02-T02';

        const response = await trello.checklists(checklistId).checkItems().addCheckItem({
          name: checkItemName,
          checked: false,
        });
        const { data: { id, idChecklist, name } } = response;
        global.resources.checklist.checkItems.push({ id, idChecklist, name });

        expect.assertions(1);
        expect(name).toEqual(checkItemName);
    });
  });
});
