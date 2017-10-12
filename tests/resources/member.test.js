/* External dependencies */
import fs from 'fs';

/* Internal dependencies */
import Trello from '../../src/index';

describe('MBR | Member Resource', () => {
  const myMemberId = process.env.TRELLO_MEMBER_ID || '';
  let trello;
  let memberData = {};
  let testBoardBackground = {};
  let testCustomBackground = {};
  let testBoardStar = {};
  let testCustomEmoji = {};
  let testCustomSticker = {};
  let testSavedSearch = {};

  beforeAll(() => {
    trello =  new Trello(global.config);
  });

  describe('MBR-P | Member POST requests', () => {
    beforeAll((done) => {
      setTimeout(() => done(), global.testDelay);
    });

    it.skip('MBR-P-01-T01 | uploads an Avatar', () => {
      const avatarFile = fs.createReadStream(`${assetsDir}/avatar.jpg`);
      trello.members(myMemberId).uploadAvatar(avatarFile)
    });

    it('MBR-P-02-T01 | uploads a Board Background', () => {
      const backgroundFile = fs.createReadStream(`${assetsDir}/background.jpg`);
      trello.members(myMemberId).boardBackgrounds().uploadBoardBackground(backgroundFile)
        .then(logResponse)
        .then((response) => {
          testBoardBackground = response.data || {};
          assert.isDefined(response.data);
          done();
        })
        .catch(error => done(error));
    });

    it('MBR-P-03-T01 | adds a Board Star', () => {
      if (!resources.board) throw new Error('Board not found.');
      const boardId = resources.board.id;
      trello.members(myMemberId).boardStars().addBoardStar({
        idBoard: boardId,
        pos: 'top',
      })
        .then(logResponse)
        .then((response) => {
          testBoardStar = response.data || {};
          assert.isDefined(response.data);
          done();
        })
        .catch(error => done(error));
    });

    it('MBR-P-04-T01 | uploads a Custom Board Background', () => {
      const backgroundFile = fs.createReadStream(`${assetsDir}/background.jpg`);
      trello.members(myMemberId).customBoardBackgrounds().uploadBoardBackground(backgroundFile)
        .then(logResponse)
        .then((response) => {
          testCustomBackground = response.data || {};
          assert.isDefined(response.data);
          done();
        })
        .catch(error => done(error));
    });

    it('MBR-P-05-T01 | uploads a Custom Emoji', () => {
      const emojiFile = fs.createReadStream(`${assetsDir}/custom-emoji.png`);
      trello.members(myMemberId).customEmoji().uploadCustomEmoji({
        name: 'test',
        file: emojiFile,
      })
        .then((response) => {
          testCustomEmoji = response.data || {};
          assert.isDefined(response.data);
          done();
        })
        .catch(error => done(error));
    });

    it('MBR-P-06-T01 | uploads a Custom Sticker', () => {
      const stickerFile = fs.createReadStream(`${assetsDir}/custom-sticker.png`);
      trello.members(myMemberId).customStickers().uploadSticker(stickerFile)
        .then(logResponse)
        .then((response) => {
          testCustomSticker = response.data || {};
          assert.isDefined(response.data);
          done();
        })
        .catch(error => done(error));
    });

    /**
     * @skip MBR-P-07
     * @reason Need a message type
     */
    it.skip('MBR-P-07-T01 | dismisses messages one time', () => {
      trello.members(myMemberId).dismissOneTimeMessages('')
    });

    it('MBR-P-08-T01 | adds a Saved Search', () => {
      const currentTime = Date.now();
      const newSavedSearch = {
        name: `test-${currentTime}`,
        query: `find-${currentTime}`,
        pos: 'top',
      };
      trello.members(myMemberId).savedSearches().addSavedSearch(newSavedSearch)
        .then(logResponse)
        .then((response) => {
          testSavedSearch = response.data || {};
          assert.isDefined(response.data);
          done();
        })
        .catch(error => done(error));
    });
  });

  describe('MBR-G | Member GET requests', () => {
    beforeAll((done) => {
      setTimeout(() => done(), global.testDelay);
    });

    // Add a delay between requests due to the large amount of tests and
    // rate limiting.
    beforeEach((done) => {
      setTimeout(() => done(), 300);
    });

    it('MBR-G-01-T01 | gets a Member', () => {
      trello.members(myMemberId).getMember()
    });

    it('MBR-G-01-T02 | gets a Member with some arguments', () => {
      trello.members(myMemberId).getMember({
        actions: 'none',
        cards: 'all',
        cardFields: ['fullName', 'username'],
      })
    });

    it('MBR-G-01-T03 | gets a Member with all arguments', () => {
      trello.members(myMemberId).getMember({
        actions: 'createMember',
        actionsEntities: true,
        actionsDisplay: true,
        actionsLimit: 20,
        actionFields: ['date', 'type'],
        cards: 'all',
        cardFields: 'all',
        cardMembers: true,
        cardMemberFields: 'all',
        cardAttachments: true,
        cardAttachmentFields: 'name',
        cardStickers: true,
        boards: 'all',
        boardFields: 'all',
        boardActions: 'none',
        boardActionsEntities: true,
        boardActionsDisplay: true,
        boardActionsFormat: 'minimal',
        boardActionsSince: null,
        boardActionsLimit: 20,
        boardActionFields: ['date', 'type'],
        boardLists: 'all',
        boardMemberships: 'all',
        boardOrganization: true,
        boardOrganizationFields: 'all',
        boardsInvited: 'all',
        boardsInvitedFields: 'all',
        boardStars: true,
        savedSearches: true,
        organizations: 'all',
        organizationFields: 'all',
        organizationPaidAccount: false,
        organizationsInvited: 'all',
        organizationsInvitedFields: 'all',
        notifications: 'none',
        notificationsEntities: true,
        notificationsDisplay: true,
        notificationsLimit: 20,
        notificationFields: 'all',
        notificationMemberCreator: true,
        notificationMemberCreatorFields: 'all',
        tokens: 'all',
        paidAccount: false,
        boardBackgrounds: 'all',
        customBoardBackgrounds: 'all',
        customStickers: 'all',
        customEmoji: 'all',
        fields: 'all',
      })
        .then(logResponse)
        .then((response) => {
          memberData = response.data || {};
          assert.isDefined(response.data);
          done();
        })
        .catch(error => done(error));
    });

    it('MBR-G-02-T01 | gets the value of the fullName field for the Member', () => {
      trello.members(myMemberId).getFieldValue('fullName')
    });

    it('MBR-G-03-T01 | gets the associated Actions', () => {
      trello.members(myMemberId).actions().getActions()
    });

    it('MBR-G-04-T01 | gets the associated Board Backgrounds', () => {
      trello.members(myMemberId).boardBackgrounds().getBoardBackgrounds()
    });

    it('MBR-G-05-T01 | gets the associated Board Background with the specified Id', () => {
      if (!memberData.boardBackgrounds) {
        done(new Error('Board Background not found.'));
      }
      const backgroundId = memberData.boardBackgrounds.slice(-1).id;
      trello.members(myMemberId).boardBackgrounds(backgroundId).getBoardBackground()
    });

    it('MBR-G-06-T01 | gets the associated Board Stars', () => {
      trello.members(myMemberId).boardStars().getBoardStars()
    });

    it('MBR-G-07-T01 | gets the associated Board Star with the specified Id', () => {
      if (!memberData.boardStars.length) {
        done(new Error('Board Stars not found.'));
      }
      const boardStarId = memberData.boardStars[0].id;
      trello.members(myMemberId).boardStars(boardStarId).getBoardStar()
    });

    it('MBR-G-08-T01 | gets the associated Boards', () => {
      trello.members(myMemberId).boards().getBoards()
    });

    it('MBR-G-08-T02 | gets the specified fields for the associated Boards', () => {
      trello.members(myMemberId).boards().getBoards({
        fields: ['name', 'pos'],
      })
    });

    it('MBR-G-09-T01 | gets only the open Boards with filter applied', () => {
      trello.members(myMemberId).boards().getBoardsFilteredBy('open')
    });

    it('MBR-G-10-T01 | gets the associated Boards Invited', () => {
      trello.members(myMemberId).boardsInvited().getBoards()
    });

    it('MBR-G-10-T02 | gets the specified fields for the associated Boards Invited', () => {
      trello.members(myMemberId).boardsInvited().getBoards({
        fields: ['name', 'desc'],
      })
    });

    it('MBR-G-11-T01 | gets the value of the name field for the associated Boards Invited', () => {
      trello.members(myMemberId).boardsInvited().getFieldValue('name')
        .then(logResponse)
        .should.eventually.be.rejected
        .notify(done);
    });

    it('MBR-G-12-T01 | gets the associated Cards', () => {
      trello.members(myMemberId).cards().getCards()
    });

    it('MBR-G-12-T02 | gets the specified fields for the associated Cards', () => {
      trello.members(myMemberId).cards().getCards({
        fields: ['name', 'desc'],
      })
    });

    it('MBR-G-13-T01 | gets only the open Cards with filter applied', () => {
      trello.members(myMemberId).cards().getCardsFilteredBy('open')
    });

    it('MBR-G-14-T01 | gets the associated Custom Board Backgrounds', () => {
      trello.members(myMemberId).customBoardBackgrounds().getBoardBackgrounds()
    });

    it('MBR-G-15-T01 | gets the associated Custom Board Background with the specified Id', () => {
      if (!memberData.customBoardBackgrounds.length) {
        done(new Error('Custom Board Backgrounds not found.'));
      }
      const backgroundId = memberData.customBoardBackgrounds[0].id;
      trello.members(myMemberId).customBoardBackgrounds(backgroundId).getBoardBackground()
    });

    it('MBR-G-16-T01 | gets the associated Custom Emojis', () => {
      trello.members(myMemberId).customEmoji().getCustomEmojis()
    });

    it('MBR-G-17-T01 | gets the associated Custom Emoji with the specified Id', () => {
      if (!memberData.customEmoji.length) {
        done(new Error('Custom Emojis not found.'));
      }
      const emojiId = memberData.customEmoji[0].id;
      trello.members(myMemberId).customEmoji(emojiId).getCustomEmoji()
    });

    it('MBR-G-18-T01 | gets the associated Custom Stickers', () => {
      trello.members(myMemberId).customStickers().getStickers()
    });

    it('MBR-G-19-T01 | gets the associated Custom Sticker with the specified Id', () => {
      if (!memberData.customStickers.length) {
        done(new Error('Custom Stickers not found.'));
      }
      const customStickerId = memberData.customStickers[0].id;
      trello.members(myMemberId).customStickers(customStickerId).getSticker()
    });

    /**
     * @skip MBR-G-09
     * @reason Business Class account required
     */
    it.skip('MBR-G-20-T01 | gets the associated Deltas', () => {
      trello.members(myMemberId).getDeltas({
        tags: 'tag?',
        ixLastUpdate: 1,
      })
        .then(logResponse)
        .should.eventually.be.rejected
        .notify(done);
    });

    it('MBR-G-21-T01 | gets the associated Notifications', () => {
      trello.members(myMemberId).notifications().getNotifications()
    });

    it('MBR-G-21-T02 | gets the specified fields for the associated Notifications', () => {
      trello.members(myMemberId).notifications().getNotifications({
        fields: ['data', 'date'],
      })
    });

    it('MBR-G-22-T01 | gets only the createdCard Notifications with filter applied', () => {
      trello.members(myMemberId).notifications().getNotificationsFilteredBy('createdCard')
    });

    it('MBR-G-23-T01 | gets the associated Organizations', () => {
      trello.members(myMemberId).organizations().getOrganizations()
    });

    it('MBR-G-23-T02 | gets the specified fields for the associated Organizations', () => {
      trello.members(myMemberId).organizations().getOrganizations({
        fields: ['name', 'desc'],
      })
    });

    it('MBR-G-24-T01 | gets only the members Organizations with filter applied', () => {
      trello.members(myMemberId).organizations().getOrganizationsFilteredBy('members')
    });

    it('MBR-G-25-T01 | gets the associated Organizations Invited', () => {
      trello.members(myMemberId).organizationsInvited().getOrganizations()
    });

    it('MBR-G-25-T02 | gets the specified fields for the associated Organizations Invited', () => {
      trello.members(myMemberId).organizationsInvited().getOrganizations({
        fields: ['desc', 'displayName', 'name'],
      })
    });

    it('MBR-G-26-T01 | gets the value of the displayName field for the associated Organizations Invited', () => {
      trello.members(myMemberId).organizationsInvited().getFieldValue('displayName')
        .then(logResponse)
        .should.eventually.be.rejected
        .notify(done);
    });

    it('MBR-G-27-T01 | gets the associated Saved Searches', () => {
      trello.members(myMemberId).savedSearches().getSavedSearches()
    });

    it('MBR-G-28-T01 | gets the associated Saved Search with the specified Id', () => {
      if (!memberData.savedSearches) {
        done(new Error('Saved Searches key not in Member data.'));
      }
      if (!memberData.savedSearches.length) {
        done(new Error('Saved Searches not found.'));
      }
      const savedSearchId = memberData.savedSearches[0].id;
      trello.members(myMemberId).savedSearches(savedSearchId).getSavedSearch()
    });

    it('MBR-G-29-T01 | gets the associated Tokens', () => {
      trello.members(myMemberId).tokens().getTokens()
    });
  });

  describe('MBR-U | Member PUT requests', () => {
    before(() => {
      setTimeout(() => done(), global.testDelay);
    });

    it('MBR-U-01-T01 | updates a Member', () => {
      const { fullName, bio } = memberData;
      trello.members(myMemberId).updateMember({
        fullName,
        bio,
      })
    });

    it('MBR-U-02-T01 | updates the avatar source', () => {
      const { avatarSource } = memberData;
      trello.members(myMemberId).updateAvatarSource(avatarSource)
    });

    it('MBR-U-03-T01 | updates the bio', () => {
      const { bio } = memberData;
      trello.members(myMemberId).updateBio(bio)
    });

    it('MBR-U-04-T01 | updates an associated Board Background', () => {
      if (!testBoardBackground) {
        done(new Error('Background not found.'))
      }
      const { id, tile = false } = testBoardBackground;
      if (typeof id === 'undefined' || typeof tile === 'undefined') {
        done(new Error('Board Background fields not found.'))
      }
      trello.members(myMemberId).boardBackgrounds(id).updateBoardBackground({
        tile,
      })
    });

    it('MBR-U-05-T01 | updates an associated Board Star', () => {
      if (!testBoardStar) {
        done(new Error('Board Star not found.'))
      }
      const { id, pos } = testBoardStar;
      if (typeof id === 'undefined' || typeof pos === 'undefined') {
        done(new Error('Board Star fields not found.'))
      }
      trello.members(myMemberId).boardStars(id).updateBoardStar({
        pos,
      })
    });

    it('MBR-U-06-T01 | updates the Board for an associated Board Star', () => {
      if (!testBoardStar) {
        done(new Error('Board Star not found.'))
      }
      const { id, idBoard } = testBoardStar;
      if (typeof id === 'undefined' || typeof idBoard === 'undefined') {
        done(new Error('Board Star fields not found.'))
      }
      trello.members(myMemberId).boardStars(id).moveBoardStarToBoard(idBoard)
    });

    it('MBR-U-07-T01 | updates the position for an associated Board Star', () => {
      if (!testBoardStar) {
        done(new Error('Board Star not found.'))
      }
      const { id, pos } = testBoardStar;
      if (typeof id === 'undefined' || typeof pos === 'undefined') {
        done(new Error('Board Star fields not found.'))
      }
      trello.members(myMemberId).boardStars(id).updatePosition(pos)
    });

    it('MBR-U-08-T01 | updates an associated Custom Board Background', () => {
      if (!testCustomBackground) {
        done(new Error('Custom Background not found.'))
      }
      const { id, tile } = testCustomBackground;
      if (typeof id === 'undefined' || typeof tile === 'undefined') {
        done(new Error('Custom Background fields not found.'))
      }
      trello.members(myMemberId).customBoardBackgrounds(id).updateBoardBackground({
        tile,
      })
    });

    it('MBR-U-09-T01 | updates the full name', () => {
      const { fullName } = memberData;
      trello.members(myMemberId).updateFullName(fullName)
    });

    it('MBR-U-10-T01 | updates the initials', () => {
      const { initials } = memberData;
      trello.members(myMemberId).updateInitials(initials)
    });

    it('MBR-U-11-T01 | updates the color blind preference', () => {
      trello.members(myMemberId).prefs().updateColorBlind(false)
    });

    it('MBR-U-12-T01 | updates the locale preference', () => {
      trello.members(myMemberId).prefs().updateLocale('en-US')
    });

    it('MBR-U-13-T01 | updates the minutes between summaries preference', () => {
      trello.members(myMemberId).prefs().updateMinutesBetweenSummaries(-1)
    });

    it('MBR-U-14-T01 | updates an associated Saved Search', () => {
      if (!testSavedSearch) {
        done(new Error('Saved Search not found.'))
      }
      const { id, name, pos } = testSavedSearch;
      if (typeof id === 'undefined' || typeof name === 'undefined' || typeof pos === 'undefined') {
        done(new Error('Saved Search fields not found.'))
      }
      trello.members(myMemberId).savedSearches(id).updateSavedSearch({
        name,
        pos,
      })
    });

    it('MBR-U-15-T01 | updates the name of an associated Saved Search', () => {
      if (!testSavedSearch) {
        done(new Error('Saved Search not found.'))
      }
      const { id, name } = testSavedSearch;
      if (typeof id === 'undefined' || typeof name === 'undefined') {
        done(new Error('Saved Search fields not found.'))
      }
      trello.members(myMemberId).savedSearches(id).updateName(name)
    });

    it('MBR-U-16-T01 | updates the position of an associated Saved Search', () => {
      if (!testSavedSearch) {
        done(new Error('Saved Search not found.'))
      }
      const { id, pos } = testSavedSearch;
      if (typeof id === 'undefined' || typeof pos === 'undefined') {
        done(new Error('Saved Search fields not found.'))
      }
      trello.members(myMemberId).savedSearches(id).updatePosition(pos)
    });

    it('MBR-U-17-T01 | updates the query of an associated Saved Search', () => {
      if (!testSavedSearch) {
        done(new Error('Saved Search not found.'))
      }
      const { id } = testSavedSearch;
      if (typeof id === 'undefined') {
        done(new Error('Saved Search fields not found.'))
      }
      trello.members(myMemberId).savedSearches(id).updateQuery(`check-${Date.now()}`)
    });

    it('MBR-U-18-T01 | updates the username', () => {
      const { username } = memberData;
      if (!username) {
        done(new Error('Username not found.'));
      }
      trello.members(myMemberId).updateUsername(username)
    });
  });

  describe('MBR-D | Member DELETE requests', () => {
    before(function (done) {
      setTimeout(() => done(), global.testDelay);
    });

    it('MBR-D-01-T01 | deletes a Board Background', () => {
      if (!testBoardBackground) {
        done(new Error('Board Background not found.'));
      }
      const { id } = testBoardBackground;
      if (typeof id === 'undefined') {
        done(new Error('Board Background Id is invalid.'))
      }
      trello.members(myMemberId).boardBackgrounds(id).deleteBoardBackground()
    });

    it('MBR-D-02-T01 | deletes a Board Star', () => {
      if (!testBoardStar) {
        done(new Error('Board Star not found.'));
      }
      const { id } = testBoardStar;
      if (typeof id === 'undefined') {
        done(new Error('Board Star Id is invalid.'))
      }
      trello.members(myMemberId).boardStars(id).deleteBoardStar()
    });

    it('MBR-D-03-T01 | deletes a Custom Board Background', () => {
      if (!testCustomBackground) {
        done(new Error('Custom Board Background not found.'));
      }
      const { id } = testCustomBackground;
      if (typeof id === 'undefined') {
        done(new Error('Custom Board Background Id is invalid.'))
      }
      trello.members(myMemberId).customBoardBackgrounds(id).deleteBoardBackground()
    });

    it('MBR-D-04-T01 | deletes a Custom Sticker', () => {
      if (!testCustomSticker) {
        done(new Error('Custom Sticker not found.'));
      }
      const { id } = testCustomSticker;
      if (typeof id === 'undefined') {
        done(new Error('Custom Sticker Id is invalid.'))
      }
      trello.members(myMemberId).customStickers(id).deleteSticker()
    });

    it('MBR-D-05-T01 | deletes a Saved Search', () => {
      if (!testSavedSearch) {
        done(new Error('Saved Search not found.'));
      }
      const { id } = testSavedSearch;
      if (typeof id === 'undefined') {
        done(new Error('Saved Search Id is invalid.'))
      }
      trello.members(myMemberId).savedSearches(id).deleteSavedSearch()
    });
  });
});
