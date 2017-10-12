/* External dependencies */
import skipIf from 'skip-if';

/* Internal dependencies */
import Trello from '../../src/index';

describe('BRD | Board Resource', () => {
  let trello;
  let boardData = {};
  let boardId = '';
  let isSkipped = false;

  beforeAll(() => {
    trello =  new Trello(global.config);
    if (global.resources.board) boardId = global.resources.board.id;
    isSkipped = (boardId === '');
  });

  describe('BRD-G | Board GET requests', () => {
    beforeAll((done) => {
      setTimeout(() => done(), global.testDelay);
    });

    skipIf((isSkipped), 'BRD-G-01-T01 | gets a Board', () => {
      expect.assertions(1);
      return expect(
        trello.boards(boardId).getBoard()
      ).resolves.toBeDefined();
    });

    skipIf((isSkipped), 'BRD-G-01-T02 | gets a Board with some arguments', () => {
      expect.assertions(1);
      return expect(
        trello.boards(boardId).getBoard({
          actions: 'none',
          cards: 'all',
          members: 'all',
        })
      ).resolves.toBeDefined();
    });

    skipIf((isSkipped), 'BRD-G-01-T03 | gets a Board with all arguments', async () => {
      const response = await trello.boards(boardId).getBoard({
        actions: 'createBoard',
        actionsEntities: true,
        actionsDisplay: true,
        actionsFormat: 'minimal',
        actionsSince: null,
        actionsLimit: 20,
        actionFields: ['date', 'type'],
        actionMember: true,
        actionMemberFields: 'username',
        actionMemberCreator: true,
        actionMemberCreatorFields: 'username',
        cards: 'all',
        cardFields: 'all',
        cardAttachments: true,
        cardAttachmentFields: 'name',
        cardChecklists: 'all',
        cardPluginData: true,
        cardStickers: true,
        boardStars: 'mine',
        labels: 'all',
        labelFields: 'all',
        labelsLimit: 50,
        lists: 'all',
        listFields: 'all',
        memberships: 'all',
        membershipsMember: true,
        membershipsMemberFields: ['fullName', 'username'],
        members: 'all',
        memberFields: ['fullName', 'username'],
        membersInvited: 'all',
        membersInvitedFields: ['fullName', 'username'],
        pluginData: true,
        checklists: 'all',
        checklistFields: 'all',
        organization: true,
        organizationFields: 'name',
        organizationMemberships: 'none',
        organizationPluginData: true,
        myPrefs: true,
        tags: true,
        fields: 'all',
      });

      boardData = response.data || {};
      expect(response.data).toBeDefined();
    });

    skipIf((isSkipped), 'BRD-G-02-T01 | gets the value of the name field for the Board', () => {
      expect.assertions(1);
      return expect(
        trello.boards(boardId).getFieldValue('name')
      ).resolves.toBeDefined();
    });

    skipIf((isSkipped), 'BRD-G-03-T01 | gets the associated Actions', () => {
      expect.assertions(1);
      return expect(
        trello.boards(boardId).actions().getActions()
      ).resolves.toBeDefined();
    });

    skipIf(
      (isSkipped),
      'BRD-G-03-T02 | gets up to 10 Actions that are of type createBoard with filter applied',
      () => {
        expect.assertions(1);
        return expect(
          trello.boards(boardId).actions().getActions({ filter: 'createBoard', limit: 10 })
        ).resolves.toBeDefined();
    });

    skipIf((isSkipped), 'BRD-G-04-T01 | gets all the Board Stars', () => {
      expect.assertions(1);
      return expect(
        trello.boards(boardId).getBoardStars()
      ).resolves.toBeDefined();
    });

    skipIf((isSkipped), 'BRD-G-04-T02 | gets only my Board Stars with filter applied', () => {
      expect.assertions(1);
      return expect(
        trello.boards(boardId).getBoardStars({ filter: 'mine' })
      ).resolves.toBeDefined();
    });

    skipIf((isSkipped), 'BRD-G-05-T01 | gets the associated Cards', () => {
      expect.assertions(1);
      return expect(
        trello.boards(boardId).cards().getCards()
      ).resolves.toBeDefined();
    });

    skipIf((isSkipped), 'BRD-G-06-T01 | gets only the closed Cards with filter applied', () => {
      expect.assertions(1);
      return expect(
        trello.boards(boardId).cards().getCards({ filter: 'closed' })
      ).resolves.toBeDefined();
    });

    skipIf((isSkipped), 'BRD-G-07-T01 | gets the associated Card with the specified Id', () => {
      if (!boardData.cards.length) throw new Error('Cards not found.');
      const cardId = boardData.cards[0].id;

      expect.assertions(1);
      return expect(
        trello.boards(boardId).cards(cardId).getCard()
      ).resolves.toBeDefined();
    });

    skipIf((isSkipped), 'BRD-G-08-T01 | gets the associated Checklists', () => {
      expect.assertions(1);
      return expect(
        trello.boards(boardId).checklists().getChecklists()
      ).resolves.toBeDefined();
    });

    skipIf(
      (isSkipped),
      'BRD-G-08-T02 | gets only the specified fields for the associated Checklists',
      () => {
        expect.assertions(1);
        return expect(
          trello.boards(boardId).checklists().getChecklists({ fields: ['idBoard', 'name', 'pos'] })
        ).resolves.toBeDefined();
    });

    /**
     * @skip BRD-G-09
     * @reason Business Class account required
     */
    test.skip('BRD-G-09-T01 | gets the associated Deltas', () => {
      expect.assertions(1);
      return expect(
        trello.boards(boardId).getDeltas({ tags: 'tag?', ixLastUpdate: 1 })
      ).resolves.toBeDefined();
    });

    /**
     * @skip BRD-G-10
     * @reason Business Class account required
     */
    test.skip('BRD-G-10-T01 | gets the associated Tags', () => {
      expect.assertions(1);
      return expect(
        trello.boards(boardId).getTags()
      ).resolves.toBeDefined();
    });

    skipIf((isSkipped), 'BRD-G-11-T01 | gets the associated Labels', () => {
      expect.assertions(1);
      return expect(
        trello.boards(boardId).labels().getLabels()
      ).resolves.toBeDefined();
    });

    skipIf(
      (isSkipped),
      'BRD-G-11-T02 | gets only the specified fields for the associated Labels',
      () => {
        expect.assertions(1);
        return expect(
          trello.boards(boardId).labels().getLabels({ fields: ['color', 'name'] })
        ).resolves.toBeDefined();
    });

    skipIf((isSkipped), 'BRD-G-12-T01 | gets the associated Label with the specified Id', () => {
      if (!boardData.labels.length) throw new Error('Labels not found.');
      const labelId = boardData.labels[0].id;

      expect.assertions(1);
      return expect(
        trello.boards(boardId).labels(labelId).getLabel()
      ).resolves.toBeDefined();
    });

    skipIf((isSkipped), 'BRD-G-13-T01 | gets the associated Lists', () => {
      expect.assertions(1);
      return expect(
        trello.boards(boardId).lists().getLists()
      ).resolves.toBeDefined();
    });

    skipIf((isSkipped), 'BRD-G-13-T02 | gets the specified fields for the associated Lists', () => {
      expect.assertions(1);
      return expect(
        trello.boards(boardId).lists().getLists({ fields: ['name', 'pos'] })
      ).resolves.toBeDefined();
    });

    skipIf((isSkipped), 'BRD-G-14-T01 | gets only the open Lists with filter applied', () => {
      expect.assertions(1);
      return expect(
        trello.boards(boardId).lists().getListsFilteredBy('open')
      ).resolves.toBeDefined();
    });

    skipIf((isSkipped), 'BRD-G-15-T01 | gets the associated Members', () => {
      expect.assertions(1);
      return expect(
        trello.boards(boardId).members().getMembers()
      ).resolves.toBeDefined();
    });

    skipIf((isSkipped), 'BRD-G-15-T02 | gets the specified fields for the associated Members', () => {
      expect.assertions(1);
      return expect(
        trello.boards(boardId).members().getMembers({ fields: ['fullName', 'initials'] })
      ).resolves.toBeDefined();
    });

    skipIf((isSkipped), 'BRD-G-16-T01 | gets only the normal Members with filter applied', () => {
      expect.assertions(1);
      return expect(
        trello.boards(boardId).members().getMembersFilteredBy('normal')
      ).resolves.toBeDefined();
    });

    skipIf((isSkipped), 'BRD-G-17-T01 | gets the associated cards for the specified Member', () => {
      if (!boardData.members.length) throw new Error('Members not found.');
      const memberId = boardData.members[0].id;

      expect.assertions(1);
      return expect(
        trello.boards(boardId).members(memberId).cards().getCards()
      ).resolves.toBeDefined();
    });

    skipIf((isSkipped), 'BRD-G-18-T01 | gets the associated Members Invited', () => {
      expect.assertions(1);
      return expect(
        trello.boards(boardId).membersInvited().getMembers()
      ).resolves.toBeDefined();
    });

    skipIf(
      (isSkipped),
      'BRD-G-18-T02 | gets the specified fields for the associated Members Invited',
      () => {
        expect.assertions(1);
        return expect(
          trello.boards(boardId).membersInvited().getMembers({
            fields: ['email', 'fullName', 'username'],
          })
        ).resolves.toBeDefined();
    });

    skipIf(
      (isSkipped),
      'BRD-G-19-T01 | gets the value of the fullName field for the associated Members Invited',
      () => {
        expect.assertions(1);
        return expect(
          trello.boards(boardId).membersInvited().getFieldValue('fullName')
        ).resolves.toBeDefined();
    });

    skipIf((isSkipped), 'BRD-G-20-T01 | gets the associated Memberships', () => {
      expect.assertions(1);
      return expect(
        trello.boards(boardId).memberships().getMemberships({ filter: 'me' })
      ).resolves.toBeDefined();
    });

    skipIf(
      (isSkipped),
      'BRD-G-20-T02 | gets only the specified Member fields for the associated Memberships',
      () => {
        expect.assertions(1);
        return expect(
          trello.boards(boardId).memberships().getMemberships({
            memberFields: ['status', 'username'],
          })
        ).resolves.toBeDefined();
    });

    skipIf(
      (isSkipped),
      'BRD-G-21-T01 | gets the associated Membership with the specified Id',
      () => {
      if (!boardData.memberships.length) throw new Error('Memberships not found.');
      const membershipId = boardData.memberships[0].id;

      expect.assertions(1);
      return expect(
        trello.boards(boardId).memberships(membershipId).getMembership()
      ).resolves.toBeDefined();
    });

    skipIf(
      (isSkipped),
      'BRD-G-21-T02 | gets the only the specified Member fields for the associated Membership with the specified Id',
      () => {
      if (!boardData.memberships.length) throw new Error('Memberships not found.');
      const membershipId = boardData.memberships[0].id;

      expect.assertions(1);
      return expect(
        trello.boards(boardId).memberships(membershipId).getMembership({
          memberFields: ['status', 'username'],
        })
      ).resolves.toBeDefined();
    });

    skipIf((isSkipped), 'BRD-G-22-T01 | gets the associated myPrefs', () => {
      expect.assertions(1);
      return expect(
        trello.boards(boardId).myPrefs().getMyPrefs()
      ).resolves.toBeDefined();
    });

    skipIf((isSkipped), 'BRD-G-23-T01 | gets the associated Organization', () => {
      expect.assertions(1);
      return expect(
        trello.boards(boardId).organization().getOrganization()
      ).resolves.toBeDefined();
    });

    skipIf(
      (isSkipped),
      'BRD-G-23-T02 | gets only the specified fields for the associated Organization',
      () => {
        expect.assertions(1);
        return expect(
          trello.boards(boardId).organization().getOrganization({
            fields: ['displayName', 'name', 'url']
          })
        ).resolves.toBeDefined();
    });

    skipIf(
      (isSkipped),
      'BRD-G-24-T01 | gets the value of the name field for the associated Organization',
      () => {
        expect.assertions(1);
        return expect(
          trello.boards(boardId).organization().getFieldValue('name')
        ).resolves.toBeDefined();
    });

    skipIf((isSkipped), 'BRD-G-25-T01 | gets the associated Plugin Data', () => {
      expect.assertions(1);
      return expect(
        trello.boards(boardId).getPluginData()
      ).resolves.toBeDefined();
    });
  });

  describe('BRD-U | Board PUT requests', () => {
    let newMemberId = '';

    beforeAll((done) => {
      setTimeout(() => done(), global.testDelay);
    });

    skipIf((isSkipped), 'BRD-U-01-T01 | updates a Board', () => {
      expect.assertions(1);
      return expect(
        trello.boards(boardId).updateBoard({ name: 'BRD-U-01-T01' })
      ).resolves.toBeDefined();
    });

    skipIf((isSkipped), 'BRD-U-02-T01 | updates the closed status', () => {
      expect.assertions(1);
      return expect(
        trello.boards(boardId).updateClosedStatus(false)
      ).resolves.toBeDefined();
    });

    skipIf((isSkipped), 'BRD-U-03-T01 | updates the description', () => {
      expect.assertions(1);
      return expect(
        trello.boards(boardId).updateDescription('BRD-U-03-T01')
      ).resolves.toBeDefined();
    });

    skipIf((isSkipped), 'BRD-U-04-T01 | updates the Organization association', () => {
      const orgId = boardData.idOrganization;
      if (!orgId) throw new Error('Organization Id not found.');

      expect.assertions(1);
      return expect(
        trello.boards(boardId).moveToOrganization(orgId)
      ).resolves.toBeDefined();
    });

    skipIf((isSkipped), 'BRD-U-05-T01 | updates the name of the Blue label', () => {
      expect.assertions(1);
      return expect(
        trello.boards(boardId).updateLabelNameForColor('blue', 'BRD-U-05-T01')
      ).resolves.toBeDefined();
    });

    skipIf((isSkipped), 'BRD-U-06-T01 | updates the name of the Green label', () => {
      expect.assertions(1);
      return expect(
        trello.boards(boardId).updateLabelNameForColor('green', 'BRD-U-06-T01')
      ).resolves.toBeDefined();
    });

    skipIf((isSkipped), 'BRD-U-07-T01 | updates the name of the Orange label', () => {
      expect.assertions(1);
      return expect(
        trello.boards(boardId).updateLabelNameForColor('orange', 'BRD-U-07-T01')
      ).resolves.toBeDefined();
    });

    skipIf((isSkipped), 'BRD-U-08-T01 | updates the name of the Purple label', () => {
      expect.assertions(1);
      return expect(
        trello.boards(boardId).updateLabelNameForColor('purple', 'BRD-U-08-T01')
      ).resolves.toBeDefined();
    });

    skipIf((isSkipped), 'BRD-U-09-T01 | updates the name of the Red label', () => {
      expect.assertions(1);
      return expect(
        trello.boards(boardId).updateLabelNameForColor('red', 'BRD-U-09-T01')
      ).resolves.toBeDefined();
    });

    skipIf((isSkipped), 'BRD-U-10-T01 | updates the name of the Yellow label', () => {
      expect.assertions(1);
      return expect(
        trello.boards(boardId).updateLabelNameForColor('yellow', 'BRD-U-10-T01')
      ).resolves.toBeDefined();
    });

    /**
     * @skip BRD-U-11
     * @reason Excessive Data
     * @passed 06.09.17
     */
    test.skip('BRD-U-11-T01 | adds an associated Member', () => {
      trello.boards(boardId).members().addMember({
        email: 'test@tfw.com',
        fullName: 'BRD-U-11-T01',
      })
        .then((response) => {
          const { data: { members } } = response;
          const newMember = members.find(member => member.memberType === 'ghost');
          if (newMember) {
            newMemberId = newMember.id;
          }
          expect(newMember).toBeDefined();
        })
        .catch(error => done(error));
    });

    skipIf(
      (isSkipped),
      'BRD-U-12-T01 | updates the type for an associated Member with specified Id',
      () => {
        if (!global.resources.member) throw new Error('Member not found.');
        const memberId = global.resources.member.id;

        expect.assertions(1);
        return expect(
          trello.boards(boardId).members(memberId).updateMemberType('normal')
        ).resolves.toBeDefined();
    });

    /**
     * @skip BRD-U-13
     * @reason Excessive Data
     * @passed 06.09.17
     */
    test.skip('BRD-U-13-T01 | updates the associated Membership with the specified Id', () => {
      if (!boardData.memberships.length) throw new Error('Memberships not found.');
      const membershipId = boardData.memberships[0].id;

      expect.assertions(1);
      return expect(
        trello.boards(boardId).memberships(membershipId).updateMembership({ type: 'admin' })
      ).resolves.toBeDefined();
    });

    skipIf((isSkipped), 'BRD-U-14-T01 | updates the emailPosition myPref', () => {
      expect.assertions(1);
      return expect(
        trello.boards(boardId).myPrefs().updateEmailPosition('bottom')
      ).resolves.toBeDefined();
    });

    // @todo: Figure out what the requirements are for this.
    test.skip('BRD-U-15-T01 | updates the idEmailList myPref', () => {
      expect.assertions(1);
      return expect(
        trello.boards(boardId).myPrefs().moveToEmailList(null)
      ).resolves.toBeDefined();
    });

    skipIf((isSkipped), 'BRD-U-16-T01 | updates the showListGuide myPref', () => {
      expect.assertions(1);
      return expect(
        trello.boards(boardId).myPrefs().updateShowListGuide(false)
      ).resolves.toBeDefined();
    });

    skipIf((isSkipped), 'BRD-U-17-T01 | updates the showSidebar myPref', () => {
      expect.assertions(1);
      return expect(
        trello.boards(boardId).myPrefs().updateShowSidebar(false)
      ).resolves.toBeDefined();
    });

    skipIf((isSkipped), 'BRD-U-18-T01 | updates the showSidebarActivity myPref', () => {
      expect.assertions(1);
      return expect(
        trello.boards(boardId).myPrefs().updateShowSidebarActivity(true)
      ).resolves.toBeDefined();
    });

    skipIf((isSkipped), 'BRD-U-19-T01 | updates the showSidebarBoardActions myPref', () => {
      expect.assertions(1);
      return expect(
        trello.boards(boardId).myPrefs().updateShowSidebarBoardActions(true)
      ).resolves.toBeDefined();
    });

    skipIf((isSkipped), 'BRD-U-20-T01 | updates the showSidebarMembers myPref', () => {
      expect.assertions(1);
      return expect(
        trello.boards(boardId).myPrefs().updateShowSidebarMembers(true)
      ).resolves.toBeDefined();
    });

    skipIf((isSkipped), 'BRD-U-21-T01 | updates the name of the Board', () => {
      expect.assertions(1);
      return expect(
        trello.boards(boardId).updateName('BRD-U-21-T01')
      ).resolves.toBeDefined();
    });

    skipIf((isSkipped), 'BRD-U-22-T01 | updates the background preference', () => {
      expect.assertions(1);
      return expect(
        trello.boards(boardId).prefs().updateBackground('orange')
      ).resolves.toBeDefined();
    });

    skipIf((isSkipped), 'BRD-U-23-T01 | updates the calendarFeedEnabled preference', () => {
      expect.assertions(1);
      return expect(
        trello.boards(boardId).prefs().updateCalendarFeedEnabled(true)
      ).resolves.toBeDefined();
    });

    skipIf((isSkipped), 'BRD-U-24-T01 | updates the cardAging preference', () => {
      expect.assertions(1);
      return expect(
        trello.boards(boardId).prefs().updateCardAging('regular')
      ).resolves.toBeDefined();
    });

    skipIf((isSkipped), 'BRD-U-25-T01 | updates the cardCovers preference', () => {
      expect.assertions(1);
      return expect(
        trello.boards(boardId).prefs().updateCardCovers(true)
      ).resolves.toBeDefined();
    });

    skipIf((isSkipped), 'BRD-U-26-T01 | updates the comments preference', () => {
      expect.assertions(1);
      return expect(
        trello.boards(boardId).prefs().updateComments('members')
      ).resolves.toBeDefined();
    });

    skipIf((isSkipped), 'BRD-U-27-T01 | updates the invitations preference', () => {
      expect.assertions(1);
      return expect(
        trello.boards(boardId).prefs().updateInvitations('members')
      ).resolves.toBeDefined();
    });

    skipIf((isSkipped), 'BRD-U-28-T01 | updates the permissionLevel preference', () => {
      expect.assertions(1);
      return expect(
        trello.boards(boardId).prefs().updatePermissionLevel('org')
      ).resolves.toBeDefined();
    });

    skipIf((isSkipped), 'BRD-U-29-T01 | updates the selfJoin preference', () => {
      expect.assertions(1);
      return expect(
        trello.boards(boardId).prefs().updateSelfJoin(true)
      ).resolves.toBeDefined();
    });

    skipIf((isSkipped), 'BRD-U-30-T01 | updates the voting preference', () => {
      expect.assertions(1);
      return expect(
        trello.boards(boardId).prefs().updateVoting('disabled')
      ).resolves.toBeDefined();
    });

    skipIf((isSkipped), 'BRD-U-31-T01 | updates the subscribed status', () => {
      expect.assertions(1);
      return expect(
        trello.boards(boardId).updateSubscribed(false)
      ).resolves.toBeDefined();
    });
  });
});
