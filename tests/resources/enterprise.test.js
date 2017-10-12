/* External dependencies */
import skipIf from 'skip-if';

/* Internal dependencies */
import Trello from '../../src/index';

describe.skip('ENT | Enterprise Resource', () => {
  let trello;
  let enterpriseData = {};
  let enterpriseId = '';
  let memberId = '';
  let orgId = '';
  let isSkipped = true;

  before(() => {
    trello =  new Trello(global.config);
  });

  describe('ENT-G | Enterprise GET requests', () => {
    beforeAll((done) => {
      setTimeout(() => done(), global.testDelay);
    });

    skipIf((isSkipped), 'ENT-G-01-T01 | gets a Enterprise', () => {
      expect.assertions(1);
      return expect(
        trello.enterprises(enterpriseId).getEnterprise()
      ).resolves.toBeDefined();
    });

    skipIf((isSkipped), 'ENT-G-01-T02 | gets a Enterprise with all arguments', async () => {
      const response = await trello.enterprises(enterpriseId).getEnterprise({
        fields: 'all',
        members: 'all',
        memberFields: 'all',
        memberFilter: 'none',
        memberSortBy: 'none',
        memberSortOrder: 'ascending',
        memberStartIndex: 0,
        memberCount: 100,
        organizations: 'all',
        organizationFields: 'all',
        organizationPaidAccounts: false,
        organizationMemberships: 'normal',
      });
      enterpriseData = response.data || {};
      expect(response.data).toBeDefined();
    });

    skipIf((isSkipped), 'ENT-G-02-T01 | gets the associated admins', () => {
      expect.assertions(1);
      return expect(
        trello.enterprises(enterpriseId).getAdmins()
      ).resolves.toBeDefined();
    });

    skipIf((isSkipped), 'ENT-G-03-T02 | gets the associated Signup URL', () => {
      expect.assertions(1);
      return expect(
        trello.enterprises(enterpriseId).getSignupUrl()
      ).resolves.toBeDefined();
    });

    skipIf((isSkipped), 'ENT-G-04-T01 | gets the associated Members', () => {
      expect.assertions(1);
      return expect(
        trello.enterprises(enterpriseId).getMembers()
      ).resolves.toBeDefined();
    });

    skipIf((isSkipped), 'ENT-G-05-T01 | gets the associated Member with the specified ID', () => {
      expect.assertions(1);
      return expect(
        trello.enterprises(enterpriseId).getMember(memberId)
      ).resolves.toBeDefined();
    });

    skipIf(
      (isSkipped),
      'ENT-G-06-T01 | gets the transferrable status of the Organization with the specified ID',
      () => {
        expect.assertions(1);
        return expect(
          trello.enterprises(enterpriseId).getIfOrgTransferrable(orgId)
        ).resolves.toBeDefined();
    });
  });

  describe('ENT-U | Enterprise PUT requests', () => {
    beforeAll((done) => {
      setTimeout(() => done(), global.testDelay);
    });

    skipIf((isSkipped), 'ENT-U-01-T01 | deactivates a Member associated with the Enterprise', () => {
      expect.assertions(1);
      return expect(
        trello.enterprises(enterpriseId).deactivateMember(memberId)
      ).resolves.toBeDefined();
    });

    skipIf((isSkipped), 'ENT-U-02-T01 | transfers to a different Organization', () => {
      expect.assertions(1);
      return expect(
        trello.enterprises(enterpriseId).transferToOrganization(orgId)
      ).resolves.toBeDefined();
    });

    skipIf((isSkipped), 'ENT-U-03-T01 | adds a Member as admin', () => {
      expect.assertions(1);
      return expect(
        trello.enterprises(enterpriseId).addMemberAsAdmin(memberId)
      ).resolves.toBeDefined();
    });
  });

  describe('ENT-P | Enterprise POST requests', () => {
    beforeAll((done) => {
      setTimeout(() => done(), global.testDelay);
    });

    skipIf((isSkipped), 'ENT-P-01-T01 | adds a Token', () => {
      expect.assertions(1);
      return expect(
        trello.enterprises(enterpriseId).addToken()
      ).resolves.toBeDefined();
    });
  });

  describe('ENT-P | Enterprise DELETE requests', () => {
    beforeAll((done) => {
      setTimeout(() => done(), global.testDelay);
    });

    skipIf((isSkipped), 'ENT-D-01-T01 | removes the association with an Organization', () => {
      expect.assertions(1);
      return expect(
        trello.enterprises(enterpriseId).dissociateOrganization()
      ).resolves.toBeDefined();
    });

    skipIf((isSkipped), 'ENT-D-02-T01 | removes a Member from admin', () => {
      expect.assertions(1);
      return expect(
        trello.enterprises(enterpriseId).removeMemberFromAdmin()
      ).resolves.toBeDefined();
    });
  });
});
