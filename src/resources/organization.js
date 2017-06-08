/* @flow */

/* Internal dependencies */
import BaseResource from './base-resource';
import Action from './action';
import Board from './board';
import Member from './member';
import Membership from './membership';

/* Types */
import type {
  ActionField,
  ActionFilter,
  ArgumentGroup,
  Auth,
  BoardField,
  BoardFilter,
  FilterDate,
  Format,
  ListFilter,
  MemberField,
  MemberFilter,
  MembershipFilter,
  PermissionLevel,
  ResourceConstructorOptions,
} from '../types';

export type OrganizationField =
  'billableMemberCount'
  | 'desc'
  | 'descData'
  | 'displayName'
  | 'idBoards'
  | 'invitations'
  | 'invited'
  | 'logoHash'
  | 'memberships'
  | 'name'
  | 'powerUps'
  | 'prefs'
  | 'premiumFeatures'
  | 'products'
  | 'url'
  | 'website';

export type OrganizationFilter =
  'all'
  | 'members'
  | 'none'
  | 'public';

type BoardVisibilityFilter = 'admin' | 'none' | 'org';

type BoardVisibilityRestrictionLevel = 'org' | 'private' | 'public';

class Pref extends BaseResource {
  constructor(
    auth: Auth,
    organizationId: string,
  ) {
    super(auth, 'pref', { parentPath: `organizations/${organizationId}` });
  }

  updateAssociatedDomain(value: string): Promise<*> {
    return this.httpPut('/associatedDomain', { value });
  }

  updateBoardVisibilityRestriction(
    level: BoardVisibilityRestrictionLevel,
    value: BoardVisibilityFilter,
  ): Promise<*> {
    return this.httpPut(`/boardVisibilityRestrict/${level}`, { value });
  }

  updateExternalMembersDisabled(value: boolean): Promise<*> {
    return this.httpPut('/externalMembersDisabled', { value });
  }

  updateGoogleAppsVersion(value: number): Promise<*> {
    return this.httpPut('/googleAppsVersion', { value });
  }

  updateOrgInviteRestrict(value: string): Promise<*> {
    return this.httpPut('/orgInviteRestrict', { value });
  }

  updatePermissionLevel(value: PermissionLevel): Promise<*> {
    return this.httpPut('/permissionLevel', { value });
  }

  deleteAssociatedDomain(): Promise<*> {
    return this.httpDelete('/associatedDomain');
  }

  deleteOrgInviteRestrict(): Promise<*> {
    return this.httpDelete('/orgInviteRestrict');
  }
}

export default class Organization extends BaseResource {
  constructor(
    auth: Auth,
    options?: ResourceConstructorOptions = {},
  ) {
    super(auth, 'organization', options);
  }

  getOrganizations(
    queryArgs?: {
      filter?: ArgumentGroup<OrganizationFilter>,
      fields?: ArgumentGroup<OrganizationField>,
      paidAccount?: boolean,
    } = {},
  ): Promise<*> {
    return this.httpGet('/', queryArgs);
  }

  getOrganization(
    queryArgs?: {
      actions?: ArgumentGroup<ActionFilter>,
      actionsEntities?: boolean,
      actionsDisplay?: boolean,
      actionsLimit?: number,
      actionFields?: ArgumentGroup<ActionField>,
      memberships?: ArgumentGroup<MembershipFilter>,
      membershipsMember?: boolean,
      membershipsMemberFields?: ArgumentGroup<MemberField>,
      members?: MemberFilter,
      memberFields?: ArgumentGroup<MemberField>,
      memberActivity?: boolean,
      membersInvited?: MemberFilter,
      membersInvitedFields?: ArgumentGroup<MemberField>,
      boards?: ArgumentGroup<BoardFilter>,
      boardFields?: ArgumentGroup<BoardField>,
      boardActions?: ArgumentGroup<ActionFilter>,
      boardActionsEntities?: boolean,
      boardActionsDisplay?: boolean,
      boardActionsFormat?: Format,
      boardActionsSince?: FilterDate,
      boardActionsLimit?: number,
      boardActionFields?: ArgumentGroup<ActionField>,
      boardLists?: ArgumentGroup<ListFilter>,
      boardPluginData?: boolean,
      paidAccount?: boolean,
      fields?: ArgumentGroup<OrganizationField>,
    } = {},
  ): Promise<*> {
    return this.httpGet('/', queryArgs);
  }

  getFieldValue(field: OrganizationField): Promise<*> {
    return this.httpGet(`/${field}`);
  }

  actions() {
    return new Action(this.auth, this.getOptionsForChild());
  }

  boards() {
    return new Board(this.auth, this.getOptionsForChild());
  }

  getDeltas(
    queryArgs: {
      tags: string,
      ixLastUpdate: number,
    },
  ): Promise<*> {
    return this.httpGet('/deltas', queryArgs);
  }

  members(memberId?: string = '') {
    return new Member(this.auth, this.getOptionsForChild(memberId));
  }

  membersInvited() {
    return new Member(
      this.auth, this.getOptionsForChild('', '/membersInvited'));
  }

  memberships(membershipId?: string = '') {
    return new Membership(this.auth, this.getOptionsForChild(membershipId));
  }

  getPluginData(): Promise<*> {
    return this.httpGet('/pluginData');
  }

  getTags(): Promise<*> {
    return this.httpGet('/tags');
  }

  updateOrganization(
    queryArgs?: {
      prefs?: {
        associatedDomain?: string,
        externalMembersDisabled?: boolean,
        googleAppsVersion?: number,
        orgInviteRestrict?: string,
        permissionLevel?: PermissionLevel,
        boardVisibilityRestrict?: {
          orgRestriction?: BoardVisibilityFilter,
          privateRestriction?: BoardVisibilityFilter,
          publicRestriction?: BoardVisibilityFilter,
        },
      },
      name?: string,
      displayName?: string,
      desc?: string,
      website?: ?string,
    } = {},
  ): Promise<*> {
    // TODO: Write handler for nested prefs.
    return this.httpPut('/', { ...queryArgs, separator: '/' });
  }

  updateDescription(value: string): Promise<*> {
    return this.httpPut('/desc', { value });
  }

  updateDisplayName(value: string): Promise<*> {
    return this.httpPut('/displayName', { value });
  }

  updateName(value: string): Promise<*> {
    return this.httpPut('/name', { value });
  }

  prefs() {
    return new Pref(this.auth, this.instanceId);
  }

  updateWebsite(value: ?string): Promise<*> {
    return this.httpPut('/website', { value });
  }

  addOrganization(
    queryArgs?: {
      name?: string,
      displayName?: string,
      desc?: string,
      website?: string,
    } = {},
  ): Promise<*> {
    return this.httpPost('/', queryArgs);
  }

  addLogo(file: Object): Promise<*> {
    return this.httpPost('/logo', {}, file);
  }

  addTags(value: string): Promise<*> {
    return this.httpPost('/tags', { value });
  }

  /**
   * Associates an organization with a parent or child resource.  The resource
   *    path is overriden to remove the ID number from the endpoint.
   *
   * @example
   * POST > .../boards/[boardId]/idOrganization?value=[organizationId]&key=...
   * @see {@link https://developers.trello.com/advanced-reference/board#put-1-boards-board-id-idorganization}
   */
  addAssociation(): Promise<*> {
    this.resourcePath = this.resourcePath.split('/')[1];
    return this.httpPost('/', { value: this.instanceId });
  }

  deleteOrganization(): Promise<*> {
    return this.httpDelete('/');
  }

  deleteLogo(): Promise<*> {
    return this.httpDelete('/logo');
  }
}
