/* Internal dependencies */
import Trello from '../../src/index';

describe('ACT | Action Resource', () => {
  let trello;
  let commentActionId = '';
  let cardActionId = '';
  let orgActionId = '';

  /**
   * Gets the Ids of Actions required to perform tests.
   */
  const getIds = () => new Promise((resolve, reject) => {
    trello.members('me').actions().getActions({
      filter: ['commentCard', 'createCard', 'unconfirmedOrganizationInvitation'],
    })
      .then((response) => {
        const { data: actions } = response;
        actions.forEach((action) => {
          const { id, type } = action;
          if (type === 'commentCard' && !commentActionId) {
            commentActionId = id;
          }
          if (type === 'createCard' && !cardActionId) {
            cardActionId = id;
          }
          if (type === 'unconfirmedOrganizationInvitation' && !orgActionId) {
            orgActionId = id;
          }
        });
        resolve();
      })
      .catch((error) => {
        reject(new Error(`Error getting Ids: ${error}`));
      });
  });

  beforeAll((done) => {
    trello =  new Trello(global.config);
    getIds()
      .then(() => done())
      .catch(error => done(error));
  });

  describe('ACT-G | Action GET Requests', () => {
    beforeAll((done) => {
      setTimeout(() => done(), global.testDelay);
    });

    test('ACT-G-01-T01 | gets an Action', () => {
      expect.assertions(1);
      return expect(
        trello.actions(cardActionId).getAction()
      ).resolves.toBeDefined();
    });

    test('ACT-G-01-T02 | gets an Action with some arguments', () => {
      expect.assertions(1);
      return expect(
        trello.actions(cardActionId).getAction({ display: true, fields: 'all' })
      ).resolves.toBeDefined();
    });

    test('ACT-G-01-T03 | gets an Action with all arguments', () => {
      expect.assertions(1);
      return expect(
        trello.actions(cardActionId).getAction({
          display: true,
          entities: true,
          fields: 'all',
          member: false,
          memberFields: 'all',
          memberCreator: true,
          memberCreatorFields: 'all',
        })
      ).resolves.toBeDefined();
    });

    test('ACT-G-02-T01 | gets an Action field value for data', () => {
      expect.assertions(1);
      return expect(
        trello.actions(cardActionId).getFieldValue('data')
      ).resolves.toBeDefined();
    });

    test('ACT-G-02-T02 | gets an Action field value for date', () => {
      expect.assertions(1);
      return expect(
        trello.actions(cardActionId).getFieldValue('date')
      ).resolves.toBeDefined();
    });

    test('ACT-G-02-T03 | gets an Action field value for idMemberCreator', () => {
      expect.assertions(1);
      return expect(
        trello.actions(cardActionId).getFieldValue('idMemberCreator')
      ).resolves.toBeDefined();
    });

    test('ACT-G-02-T04 | gets an Action field value for type', () => {
      expect.assertions(1);
      return expect(
        trello.actions(cardActionId).getFieldValue('type')
      ).resolves.toBeDefined();
    });

    test('ACT-G-03-T01 | gets the associated Board', () => {
      expect.assertions(1);
      return expect(
        trello.actions(cardActionId).board().getBoard()
      ).resolves.toBeDefined();
    });

    test('ACT-G-03-T02 | gets only the specified fields for the associated Board', () => {
      expect.assertions(1);
      return expect(
        trello.actions(cardActionId).board().getBoard({ fields: ['closed', 'dateLastActivity'] })
      ).resolves.toBeDefined();
    });

    test('ACT-G-04-T01 | gets a field value for the associated Board', () => {
      expect.assertions(1);
      return expect(
        trello.actions(cardActionId).board().getFieldValue('name')
      ).resolves.toBeDefined();
    });

    test('ACT-G-05-T01 | gets the associated Card', () => {
      expect.assertions(1);
      return expect(
        trello.actions(cardActionId).card().getCard()
      ).resolves.toBeDefined();
    });

    test('ACT-G-05-T02 | gets only the specified fields for the associated Card', () => {
      expect.assertions(1);
      return expect(
        trello.actions(cardActionId).card().getCard({ fields: ['badges', 'closed', 'desc'] })
      ).resolves.toBeDefined();
    });

    test('ACT-G-06-T01 | gets a field value for the associated Card', () => {
      expect.assertions(1);
      return expect(
        trello.actions(cardActionId).card().getFieldValue('name')
      ).resolves.toBeDefined();
    });

    test('ACT-G-07-T01 | gets the Display data', () => {
      expect.assertions(1);
      return expect(
        trello.actions(cardActionId).getDisplay()
      ).resolves.toBeDefined();
    });

    test('ACT-G-08-T01 | gets the Entities data', () => {
      expect.assertions(1);
      return expect(
        trello.actions(cardActionId).getEntities()
      ).resolves.toBeDefined();
    });

    test('ACT-G-09-T01 | gets the associated List', () => {
      expect.assertions(1);
      return expect(
        trello.actions(cardActionId).list().getList()
      ).resolves.toBeDefined();
    });

    test('ACT-G-09-T02 | gets only the specified fields for the associated List', () => {
      expect.assertions(1);
      return expect(
        trello.actions(cardActionId).list().getList({ fields: ['name', 'pos'] })
      ).resolves.toBeDefined();
    });

    test('ACT-G-10-T01 | gets a field value for the associated List', () => {
      expect.assertions(1);
      return expect(
        trello.actions(cardActionId).list().getFieldValue('name')
      ).resolves.toBeDefined();
    });

    test('ACT-G-11-T01 | gets the associated Member', () => {
      expect.assertions(1);
      return expect(
        trello.actions(cardActionId).member().getMember()
      ).resolves.toBeDefined();
    });

    test('ACT-G-11-T01 | gets only the specified fields for the associated Member', () => {
      expect.assertions(1);
      return expect(
        trello.actions(orgActionId).member().getMember({ fields: ['email', 'fullName'] })
      ).resolves.toBeDefined();
    });

    test('ACT-G-12-T01 | gets a field value for the associated Member', () => {
      expect.assertions(1);
      return expect(
        trello.actions(orgActionId).member().getFieldValue('fullName')
      ).resolves.toBeDefined();
    });

    test('ACT-G-13-T01 | gets the associated Member Creator', () => {
      expect.assertions(1);
      return expect(
        trello.actions(cardActionId).memberCreator().getMember()
      ).resolves.toBeDefined();
    });

    test('ACT-G-13-T02 | gets only the specified fields for the associated Member Creator', () => {
      expect.assertions(1);
      return expect(
        trello.actions(cardActionId).memberCreator().getMember({
          fields: ['avatarSource', 'bio', 'bioData', 'confirmed', 'idBoards'],
        })
      ).resolves.toBeDefined();
    });

    test('ACT-G-14-T01 | gets a field value for the associated Member Creator', () => {
      expect.assertions(1);
      return expect(
        trello.actions(cardActionId).memberCreator().getFieldValue('avatarHash')
      ).resolves.toBeDefined();
    });

    test('ACT-G-15-T01 | gets the associated Organization', () => {
      expect.assertions(1);
      return expect(
        trello.actions(orgActionId).organization().getOrganization()
      ).resolves.toBeDefined();
    });

    test('ACT-G-16-T01 | gets a field value for the associated Organization', () => {
      expect.assertions(1);
      return expect(
        trello.actions(orgActionId).organization().getFieldValue('name')
      ).resolves.toBeDefined();
    });
  });

  describe('ACT-U | Action PUT Requests', () => {
    const commentText = 'This is a test comment';

    beforeAll((done) => {
      setTimeout(() => done(), global.testDelay);
    });

    test('ACT-U-01-T01 | updates an Action', () => {
      expect.assertions(1);
      return expect(
        trello.actions(commentActionId).updateAction({ text: commentText })
      ).resolves.toBeDefined();
    });

    test('ACT-U-02-T01 | updates the text for an Action', () => {
      expect.assertions(1);
      return expect(
        trello.actions(commentActionId).updateText(commentText)
      ).resolves.toBeDefined();
    });
  });

  describe('ACT-D | Action DELETE Requests', () => {
    beforeAll((done) => {
      setTimeout(() => done(), global.testDelay);
    });

    test('ACT-D-01-T01 | deletes an Action', () => {
      expect.assertions(1);
      return expect(
        trello.actions(commentActionId).deleteAction()
      ).resolves.toBeDefined();
    });
  });
});
