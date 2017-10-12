/* External dependencies */
import skipIf from 'skip-if';

/* Internal dependencies */
import Trello from '../src/index';

describe('TEARDOWN | Test Cleanup', () => {
  let trello;

  beforeAll(() => {
    trello = new Trello(global.config);
  });

  describe('CHK-D | Checklist DELETE requests', () => {
    let checklistId = '';
    let isSkipped = false;

    beforeAll((done) => {
      if (global.resources.checklist) checklistId = global.resources.checklist.id;
      isSkipped = (checklistId === '');
      setTimeout(() => done(), global.testDelay);
    });

    skipIf(
      (isSkipped || global.resources.checklist.checkItems.length === 0),
      'CHK-D-02-T01 | deletes a Check Item from a Checklist',
      () => {
        const checkItemId = global.resources.checklist.checkItems[0].id;

        expect.assertions(1);
        return expect(
          trello.checklists(checklistId).checkItems(checkItemId).deleteCheckItem()
        ).resolves.toBeDefined();
    });

    skipIf((isSkipped), 'CHK-D-01-T01 | deletes a Checklist', () => {
      expect.assertions(1);
      return expect(
        trello.checklists(checklistId).deleteChecklist()
      ).resolves.toBeDefined();
    });
  });

  describe('CAR-D | Card DELETE requests', () => {
    let cardId = '';
    let isSkipped = false;

    beforeAll((done) => {
      if (global.resources.card) cardId = global.resources.card.id;
      isSkipped = (cardId === '');
      setTimeout(() => done(), global.testDelay);
    });

    skipIf(
      (isSkipped || global.resources.card.stickers.length === 0),
      'CAR-D-10-T01 | deletes a Sticker from a Card',
      () => {
        const stickerId = global.resources.card.stickers[0].id;

        expect.assertions(1);
        return expect(
          trello.cards(cardId).stickers(stickerId).deleteSticker()
        ).resolves.toBeDefined();
    });

    // @fix: Returns "unauthorized card permission requested" error.
    test.skip('CAR-D-09-T01 | changes the Voting status for a Member on a Card', () => {
      if (!global.resources.member) return expect(true).toEqual(true);
      const memberId = global.resources.member.id;

      expect.assertions(1);
      return expect(
        trello.cards(cardId).membersVoted(memberId).updateVote(false)
      ).resolves.toBeDefined();
    });

    // @fix: Returns "member is not on the card" error.
    skipIf(
      (isSkipped || !global.resources.member),
      'CAR-D-08-T01 | deletes a Member on a Card',
      () => {
        const memberId = global.resources.member.id;

        expect.assertions(1);
        return expect(
          trello.cards(cardId).dissociateMember(memberId)
        ).resolves.toBeDefined();
    });

    skipIf((isSkipped), 'CAR-D-07-T01 | deletes a Label on a Card', () => {
      if (!global.resources.card.label) throw new Error('Label not on Card.');
      const labelId = global.resources.card.label.id;

      expect.assertions(1);
      return expect(
        trello.cards(cardId).dissociateLabel(labelId)
      ).resolves.toBeDefined();
    });

    skipIf(
      (isSkipped || !global.resources.card.checklistCopy),
      'CAR-D-06-T01 | deletes a Checklist on a Card',
      () => {
        const checklistId = global.resources.card.checklistCopy.id;

        expect.assertions(1);
        return expect(
          trello.cards(cardId).checklists(checklistId).deleteChecklist()
        ).resolves.toBeDefined();
    });

    skipIf(
      (isSkipped || global.resources.card.checkItems.length === 0),
      'CAR-D-05-T01 | deletes a Check Item on a Card',
      () => {
        const checkItemId = global.resources.card.checkItems[0].id;

        expect.assertions(1);
        return expect(
          trello.cards(cardId).checkItem(checkItemId).deleteCheckItem()
        ).resolves.toBeDefined();
    });

    skipIf(
      (isSkipped || !global.resources.card.checklist || global.resources.card.checkItems.length === 0),
      'CAR-D-04-T01 | deletes a Check Item on a Checklist on a Card',
      () => {
        const checklistId = global.resources.card.checklist.id;
        const checkItemId = global.resources.card.checkItems[1].id;

        expect.assertions(1);
        return expect(
          trello.cards(cardId).checklist(checklistId).checkItem(checkItemId).deleteCheckItem()
        ).resolves.toBeDefined();
    });

    skipIf(
      (isSkipped || !global.resources.card.attachmentFile),
      'CAR-D-03-T01 | deletes an Attachment on a Card',
      () => {
        const attachmentId = global.resources.card.attachmentFile.id;

        expect.assertions(1);
        return expect(
          trello.cards(cardId).attachments(attachmentId).deleteAttachment()
        ).resolves.toBeDefined();
    });

    skipIf(
      (isSkipped || !global.resources.card.comment),
      'CAR-D-02-T01 | deletes a Comment on a Card',
      () => {
        const commentId = global.resources.card.comment.id;

        expect.assertions(1);
        return expect(
          trello.cards(cardId).comments(commentId).deleteComment()
        ).resolves.toBeDefined();
    });

    skipIf((isSkipped), 'CAR-D-01-T01 | deletes a Card', () => {
      expect.assertions(1);
      return expect(
        trello.cards(cardId).deleteCard()
      ).resolves.toBeDefined();
    });

    skipIf(
      (isSkipped || !global.resources.card.convertedCard),
      'CAR-D-01-T02 | deletes a Card converted from a Check Item',
      () => {
        const convertedCardId = global.resources.card.convertedCard.id;

        expect.assertions(1);
        return expect(
          trello.cards(convertedCardId).deleteCard()
        ).resolves.toBeDefined();
    });
  });

  describe('LBL-D | Label DELETE requests', () => {
    let isSkipped = false;

    beforeAll((done) => {
      isSkipped = (!global.resources.labels);
      setTimeout(() => done(), global.testDelay);
    });

    skipIf(
      (isSkipped || global.resources.labels.length === 0),
      'LBL-D-01-T01 | deletes the first Label',
      () => {
        const labelId = global.resources.labels[0].id;

        expect.assertions(1);
        return expect(
          trello.labels(labelId).deleteLabel()
        ).resolves.toBeDefined();
    });

    skipIf(
      (isSkipped || !global.resources.labels.length > 1),
      'LBL-D-01-T02 | deletes the second Label',
      () => {
        const labelId = global.resources.labels[1].id;

        expect.assertions(1);
        return expect(
          trello.labels(labelId).deleteLabel()
        ).resolves.toBeDefined();
    });
  });

  describe('BRD-D | Board DELETE requests', () => {
    let boardId = '';
    let isSkipped = false;

    beforeAll((done) => {
      if (global.resources.board) boardId = global.resources.board.id;
      isSkipped = (boardId === '');
      setTimeout(() => done(), global.testDelay);
    });

    skipIf((isSkipped), 'BRD-D-02-T01 | deletes a PowerUp', () => {
      expect.assertions(1);
      return expect(
        trello.boards(boardId).deletePowerUp('cardAging')
      ).resolves.toBeDefined();
    });

    // @fix: Getting "membership not found" error.
    test.skip('BRD-D-01-T01 | deletes a member', () => {
      if (!global.resources.member) {
        // Skip test (use skipIf)
      }
      const memberId = global.resources.member.id;

      expect.assertions(1);
      return expect(
        trello.boards(boardId).members(memberId).deleteMember()
      ).resolves.toBeDefined();
    });

    // This is done to make it easier to delete the board after tests are run.
    skipIf((isSkipped), 'BRD-U-02-T02 | closes the board', () => {
      expect.assertions(1);
      return expect(
        trello.boards(boardId).updateClosedStatus(true)
      ).resolves.toBeDefined();
    });
  });

  describe('ORG-D | Organization DELETE requests', () => {
    let orgId = '';
    let isSkipped = false;

    beforeAll((done) => {
      if (global.resources.org) orgId = global.resources.org.id;
      isSkipped = (orgId === '');
      setTimeout(() => done(), global.testDelay);
    });

    // @todo: Need email address for this.
    test.skip('ORG-D-06-T01 | deletes the Org Invite Restriction pref', () => {
      expect.assertions(1);
      return expect(
        trello.organizations(orgId).prefs().deleteOrgInviteRestrict('')
      ).resolves.toBeDefined();
    });

    // @fix: Getting "unauthorized organization" error.
    test.skip('ORG-D-05-T01 | deletes the Associated Domain pref', () => {
      expect.assertions(1);
      return expect(
        trello.organizations(orgId).prefs().deleteAssociatedDomain()
      ).resolves.toBeDefined();
    });

    test.skip('ORG-D-04-T01 | removes a Member from all Boards in the Organization', () => {
      if (!global.resources.member) {
        // Skip test (use skipIf)
      }
      const memberId = global.resources.member.id;

      expect.assertions(1);
      return expect(
        trello.organizations(orgId).members(memberId).dissociateMemberFromAll()
      ).resolves.toBeDefined();
    });

    skipIf(
      (!global.resources.member),
      'ORG-D-03-T01 | removes a Member from the Organization',
      () => {
        const memberId = global.resources.member.id;

        expect.assertions(1);
        return expect(
          trello.organizations(orgId).members(memberId).dissociateMember()
        ).resolves.toBeDefined();
    });

    test('ORG-D-02-T01 | deletes a Logo', () => {
      expect.assertions(1);
      return expect(
        trello.organizations(orgId).deleteLogo()
      ).resolves.toBeDefined();
    });

    test('ORG-D-01-T01 | deletes an Organization', () => {
      expect.assertions(1);
      return expect(
        trello.organizations(orgId).deleteOrganization()
      ).resolves.toBeDefined();
    });
  });
});
