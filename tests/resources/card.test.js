/* External dependencies */
import skipIf from 'skip-if';

/* Internal dependencies */
import Trello from '../../src/index';

describe('CAR | Card Resource', () => {
  let trello;
  let cardData = {};
  let cardId = '';
  let isSkipped = false;

  beforeAll(() => {
    trello =  new Trello(global.config);
    if (global.resources.card) cardId = global.resources.card.id;
    isSkipped = (cardId === '');
  });

  describe('CAR-G | Card GET Requests', () => {
    before(() => {
      setTimeout(() => done(), global.testDelay);
    });

    skipIf((isSkipped), 'CAR-G-01-T01 | gets a Card', () => {
      expect.assertions(1);
      return expect(
        trello.cards(cardId).getCard()
      ).resolves.toBeDefined();
    });

    skipIf((isSkipped), 'CAR-G-01-T02 | gets a Card with some arguments', () => {
      expect.assertions(1);
      return expect(
        trello.cards(cardId).getCard({
          actions: 'none',
          members: true,
          stickers: true,
        })
      ).resolves.toBeDefined();
    });

    skipIf((isSkipped), 'CAR-G-01-T03 | gets a Card with all arguments', async () => {
      const response = await trello.cards(cardId).getCard({
        actions: ['createCard', 'commentCard'],
        actionsEntities: true,
        actionsDisplay: true,
        actionsLimit: 20,
        actionFields: 'all',
        actionMemberCreatorFields: 'username',
        attachments: true,
        members: true,
        memberFields: 'username',
        membersVoted: true,
        membersVotedFields: 'username',
        checkItemStates: true,
        checkItemStateFields: 'all',
        checklists: 'all',
        checklistFields: ['name', 'pos', 'idBoard'],
        board: true,
        list: false,
        listFields: ['name', 'pos'],
        pluginData: true,
        stickers: true,
        stickerFields: 'all',
        fields: 'all',
      });
      cardData = response.data || {};
      expect(response.data).toBeDefined();
    });

    skipIf((isSkipped), 'CAR-G-02-T01 | gets the value of the name field for the Card', () => {
      expect.assertions(1);
      return expect(
        trello.cards(cardId).getFieldValue('name')
      ).resolves.toBeDefined();
    });

    skipIf((isSkipped), 'CAR-G-03-T01 | gets the associated Actions', () => {
      expect.assertions(1);
      return expect(
        trello.cards(cardId).actions().getActions()
      ).resolves.toBeDefined();
    });

    skipIf(
      (isSkipped),
      'CAR-G-03-T02 | gets up to 10 Actions that are of type updateCard with filter applied',
      () => {
        expect.assertions(1);
        return expect(
          trello.cards(cardId).actions().getActions({ filter: 'updateCard', limit: 10 })
        ).resolves.toBeDefined();
    });

    skipIf((isSkipped), 'CAR-G-03-T03 | gets the associated Comments', () => {
      expect.assertions(1);
      return expect(
        trello.cards(cardId).comments().getComments()
      ).resolves.toBeDefined();
    });

    skipIf((isSkipped), 'CAR-G-04-T01 | gets all the Attachments', () => {
      expect.assertions(1);
      return expect(
        trello.cards(cardId).attachments().getAttachments()
      ).resolves.toBeDefined();
    });

    skipIf(
      (isSkipped),
      'CAR-G-05-T01 | gets the associated Attachment with the specified Id',
      () => {
      if (!cardData.attachments.length) throw new Error('Attachment not found on Card.');
      const attachmentId = cardData.attachments[0].id;

      expect.assertions(1);
      return expect(
        trello.cards(cardId).attachments(attachmentId).getAttachment()
      ).resolves.toBeDefined();
    });

    skipIf((isSkipped), 'CAR-G-06-T01 | gets the associated Board', () => {
      expect.assertions(1);
      return expect(
        trello.cards(cardId).board().getBoard()
      ).resolves.toBeDefined();
    });

    skipIf(
      (isSkipped),
      'CAR-G-06-T02 | gets only the specified fields for the associated Board',
      () => {
        expect.assertions(1);
        return expect(
          trello.cards(cardId).board().getBoard({ fields: ['desc', 'name'] })
        ).resolves.toBeDefined();
    });

    skipIf(
      (isSkipped),
      'CAR-G-07-T01 | gets the value of the name field of the associated Board',
      () => {
        expect.assertions(1);
        return expect(
          trello.cards(cardId).board().getFieldValue('name')
        ).resolves.toBeDefined();
    });

    skipIf((isSkipped), 'CAR-G-08-T01 | gets the associated Check Item States', () => {
      expect.assertions(1);
      return expect(
        trello.cards(cardId).checkItemStates().getCheckItemStates()
      ).resolves.toBeDefined();
    });

    skipIf((isSkipped), 'CAR-G-09-T01 | gets the associated Checklists', () => {
      expect.assertions(1);
      return expect(
        trello.cards(cardId).checklists().getChecklists()
      ).resolves.toBeDefined();
    });

    skipIf(
      (isSkipped),
      'CAR-G-09-T02 | gets only the specified fields for the associated Checklists',
      () => {
        expect.assertions(1);
        return expect(
          trello.cards(cardId).checklists().getChecklists({
            fields: ['idBoard', 'name', 'pos'],
          })
        ).resolves.toBeDefined();
    });

    skipIf(
      (isSkipped),
      'CAR-G-10-T01 | gets the associated Check Item with the specified Id',
      () => {
      if (!global.resources.card.checkItems.length) throw new Error('Check Items not on Card.');
      const checkItemId = global.resources.card.checkItems[0].id;

      expect.assertions(1);
      return expect(
        trello.cards(cardId).checkItem(checkItemId).getCheckItem()
      ).resolves.toBeDefined();
    });

    skipIf((isSkipped), 'CAR-G-11-T01 | gets the associated List', () => {
      expect.assertions(1);
      return expect(
        trello.cards(cardId).list().getList()
      ).resolves.toBeDefined();
    });

    skipIf(
      (isSkipped),
      'CAR-G-11-T02 | gets only the specified fields for the associated List',
      () => {
        expect.assertions(1);
        return expect(
          trello.cards(cardId).list().getList({ fields: ['name', 'pos'] })
        ).resolves.toBeDefined();
    });

    skipIf(
      (isSkipped),
      'CAR-G-12-T01 | gets the value of the name field of the associated List',
      () => {
        expect.assertions(1);
        return expect(
          trello.cards(cardId).list().getFieldValue('name')
        ).resolves.toBeDefined();
    });

    skipIf((isSkipped), 'CAR-G-13-T01 | gets the associated Members', () => {
      expect.assertions(1);
      return expect(
        trello.cards(cardId).members().getMembers()
      ).resolves.toBeDefined();
    });

    skipIf(
      (isSkipped),
      'CAR-G-13-T02 | gets the specified fields for the associated Members',
      () => {
        expect.assertions(1);
        return expect(
          trello.cards(cardId).members().getMembers({
            fields: ['fullName', 'initials'],
          })
        ).resolves.toBeDefined();
    });

    skipIf((isSkipped), 'CAR-G-14-T01 | gets the associated Members Voted', () => {
      expect.assertions(1);
      return expect(
        trello.cards(cardId).membersVoted().getMembers()
      ).resolves.toBeDefined();
    });

    skipIf((isSkipped), 'CAR-G-15-T01 | gets the associated Plugin Data', () => {
      expect.assertions(1);
      return expect(
        trello.cards(cardId).getPluginData()
      ).resolves.toBeDefined();
    });

    skipIf((isSkipped), 'CAR-G-16-T01 | gets the associated Stickers', () => {
      expect.assertions(1);
      return expect(
        trello.cards(cardId).stickers().getStickers()
      ).resolves.toBeDefined();
    });

    skipIf(
      (isSkipped),
      'CAR-G-16-T02 | gets the specified fields for the associated Stickers',
      () => {
        expect.assertions(1);
        return expect(
          trello.cards(cardId).stickers().getStickers({ fields: ['left', 'top'] })
        ).resolves.toBeDefined();
    });

    skipIf((isSkipped), 'CAR-G-17-T01 | gets the associated Sticker with the specified Id', () => {
      if (!cardData.stickers.length) throw new Error('Sticker not found on Card.');
      const stickerId = cardData.stickers[0].id;

      expect.assertions(1);
      return expect(
        trello.cards(cardId).stickers(stickerId).getSticker()
      ).resolves.toBeDefined();
    });
  });

  describe('CAR-U | Card PUT requests', () => {
    beforeAll((done) => {
      setTimeout(() => done(), global.testDelay);
    });

    const getFirstCheckItem = () => {
      const checkItems = global.resources.card.checkItems || [];
      if (checkItems.length !== 0) return checkItems[0] || {};
      return {};
    };

    const getTrelloChecklistCheckItem = () => {
      const firstCheckItem = getFirstCheckItem();
      if (!firstCheckItem) return ;
      const checklistId = firstCheckItem.idChecklist;
      const checkItemId = firstCheckItem.id;
      return trello.cards(cardId).checklist(checklistId).checkItem(checkItemId);
    };

    skipIf((isSkipped), 'CAR-U-01-T01 | updates a Card', () => {
      expect.assertions(1);
      return expect(
        trello.cards(cardId).updateCard({
          name: 'CAR-U-01-T01',
          desc: 'This is the updated description.',
        })
      ).resolves.toBeDefined();
    });

    skipIf((isSkipped), 'CAR-U-02-T01 | updates an associated Comment', () => {
      if (!global.resources.card.comment) throw new Error('Comment not found.');
      const commentId = global.resources.card.comment.id;

      expect.assertions(1);
      return expect(
        trello.cards(cardId).comments(commentId).updateComment('CAR-U-02-T01')
      ).resolves.toBeDefined();
    });

    skipIf(
      (isSkipped),
      'CAR-U-03-T01 | updates the name of an associated Check Item on a Checklist with the specified Id',
      () => {
        const trelloCheckItem = getTrelloChecklistCheckItem();
        if (!trelloCheckItem) throw new Error('Check Item not on Card.');

        expect.assertions(1);
        return expect(
          trelloCheckItem.updateName('CAR-U-03-T01')
        ).resolves.toBeDefined();
    });

    skipIf(
      (isSkipped),
      'CAR-U-04-T01 | updates the position of an associated Check Item on a Checklist with the specified Id',
      () => {
        const trelloCheckItem = getTrelloChecklistCheckItem();
        if (!trelloCheckItem) throw new Error('Check Item not on Card.');

        expect.assertions(1);
        return expect(
          trelloCheckItem.updatePosition('top')
        ).resolves.toBeDefined();
    });

    skipIf(
      (isSkipped),
      'CAR-U-05-T01 | updates the state of an associated Check Item on a Checklist with the specified Id',
      () => {
        const trelloCheckItem = getTrelloChecklistCheckItem();
        if (!trelloCheckItem) throw new Error('Check Item not on Card.');

        expect.assertions(1);
        return expect(
          trelloCheckItem.updateState('complete')
        ).resolves.toBeDefined();
    });

    skipIf(
      (isSkipped),
      'CAR-U-06-T01 | updates a Check Item on a Checklist with the specified Id',
      () => {
        const trelloCheckItem = getTrelloChecklistCheckItem();
        if (!trelloCheckItem) throw new Error('Check Item not on Card.');

        expect.assertions(1);
        return expect(
          trelloCheckItem.updateCheckItem({ name: 'CAR-U-06-T01', pos: 'top' })
        ).resolves.toBeDefined();
    });

    skipIf((isSkipped), 'CAR-U-07-T01 | updates a Check Item with the specified Id', () => {
      const firstCheckItem = getFirstCheckItem();
      if (!firstCheckItem) throw new Error('Check Item not on Card.');
      const checkItemId = firstCheckItem.id;

      expect.assertions(1);
      return expect(
        trello.cards(cardId).checkItem(checkItemId).updateCheckItem({
          name: 'CAR-U-07-T01',
          pos: 'top',
        })
      ).resolves.toBeDefined();
    });

    skipIf((isSkipped), 'CAR-U-08-T01 | updates the closed status', () => {
      expect.assertions(1);
      return expect(
        trello.cards(cardId).updateClosedStatus(false)
      ).resolves.toBeDefined();
    });

    skipIf((isSkipped), 'CAR-U-09-T01 | updates the description', () => {
      expect.assertions(1);
      return expect(
        trello.cards(cardId).updateDescription('CAR-U-09-T01')
      ).resolves.toBeDefined();
    });

    skipIf((isSkipped), 'CAR-U-10-T01 | updates the due date', () => {
      expect.assertions(1);
      return expect(
        trello.cards(cardId).updateDueDate(null)
      ).resolves.toBeDefined();
    });

    skipIf((isSkipped), 'CAR-U-11-T01 | updates the due complete status', () => {
      expect.assertions(1);
      return expect(
        trello.cards(cardId).updateDueComplete(false)
      ).resolves.toBeDefined();
    });

    skipIf((isSkipped), 'CAR-U-12-T01 | updates the Attachment cover image', () => {
      expect.assertions(1);
      return expect(
        trello.cards(cardId).updateAttachmentCoverImage('')
      ).resolves.toBeDefined();
    });

    skipIf((isSkipped), 'CAR-U-13-T01 | moves the Card to a different Board', () => {
      if (!global.resources.board) throw new Error('Board not found.');
      const boardId = global.resources.board.id;

      expect.assertions(1);
      return expect(
        trello.cards(cardId).moveToBoard(boardId)
      ).resolves.toBeDefined();
    });

    skipIf((isSkipped), 'CAR-U-14-T01 | moves the Card to a different List', () => {
      if (!global.resources.list) throw new Error('List not found.');
      const listId = global.resources.list.id;

      expect.assertions(1);
      return expect(
        trello.cards(cardId).moveToList(listId)
      ).resolves.toBeDefined();
    });

    skipIf((isSkipped), 'CAR-U-15-T01 | updates the member associations', () => {
      if (!global.resources.member) throw new Error('Member not found.');
      const memberId = global.resources.member.id;

      expect.assertions(1);
      return expect(
        trello.cards(cardId).associateMembers([ memberId ])
      ).resolves.toBeDefined();
    });

    skipIf((isSkipped), 'CAR-U-16-T01 | updates the name', () => {
      expect.assertions(1);
      return expect(
        trello.cards(cardId).updateName('CAR-U-16-T01')
      ).resolves.toBeDefined();
    });

    skipIf((isSkipped), 'CAR-U-17-T01 | updates the position', () => {
      expect.assertions(1);
      return expect(
        trello.cards(cardId).updatePosition('top')
      ).resolves.toBeDefined();
    });

    skipIf((isSkipped), 'CAR-U-18-T01 | updates an associated Sticker', () => {
      if (!global.resources.card.stickers.length) throw new Error('Stickers not on Card.');
      const stickerId = global.resources.card.stickers[0].id;

      expect.assertions(1);
      return expect(
        trello.cards(cardId).stickers(stickerId).updateSticker({ top: 12, left: 12 })
      ).resolves.toBeDefined();
    });

    skipIf((isSkipped), 'CAR-U-19-T01 | updates the subscribed status', () => {
      expect.assertions(1);
      return expect(
        trello.cards(cardId).updateSubscribed(true)
      ).resolves.toBeDefined();
    });
  });
});
