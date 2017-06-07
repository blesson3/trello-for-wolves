/* @flow */

/* Internal dependencies */
import BaseResource from '../base-resource';
import Board from '../board';
import Card from '../card';
import List from '../list';
import Member from '../member';

/* Types */
import type {
  Auth,
  BoardInclusionQueryArgs,
  CardInclusionQueryArgs,
  FieldsQueryArg,
  FilterQueryArg,
  MemberInclusionQueryArgs,
  MemberCreatorInclusionQueryArgs,
  OrganizationInclusionQueryArgs,
  NotificationField,
  ResourceConstructorOptions,
} from '../types';

export type NotificationField =
  'data'
  | 'date'
  | 'idMemberCreator'
  | 'type'
  | 'unread';

export type NotificationFilter =
  'addAdminToBoard'
  | 'addAdminToOrganization'
  | 'addedAttachmentToCard'
  | 'addedMemberToCard'
  | 'addedToBoard'
  | 'addedToCard'
  | 'addedToOrganization'
  | 'cardDueSoon'
  | 'changeCard'
  | 'closeBoard'
  | 'commentCard'
  | 'createdCard'
  | 'declinedInvitationToBoard'
  | 'declinedInvitationToOrganization'
  | 'invitedToBoard'
  | 'invitedToOrganization'
  | 'makeAdminOfBoard'
  | 'makeAdminOfOrganization'
  | 'memberJoinedTrello'
  | 'mentionedOnCard'
  | 'removedFromBoard'
  | 'removedFromCard'
  | 'removedFromOrganization'
  | 'removedMemberFromCard'
  | 'unconfirmedInvitedToBoard'
  | 'unconfirmedInvitedToOrganization'
  | 'updateCheckItemStateOnCard';

export default class Notification extends BaseResource {
  constructor(
    auth: Auth,
    options?: ResourceConstructorOptions = {},
  ) {
    super(auth, 'notification', options);
  }

  getNotification(
    queryArgs?: BoardInclusionQueryArgs &
      CardInclusionQueryArgs &
      FieldsQueryArg<NotificationField> &
      FilterQueryArg<NotificationField> &
      MemberCreatorInclusionQueryArgs &
      MemberInclusionQueryArgs &
      OrganizationInclusionQueryArgs &
      {
        entities?: boolean,
        list?: boolean,
      } = {},
  ): Promise<*> {
    const idNotification = this.instanceId;
    const updatedArgs = (this.parentPath)
      ? { idNotification, ...queryArgs }
      : queryArgs;
    return this.httpGet('/', updatedArgs);
  }

  getNotifications(
    queryArgs?: FieldsQueryArg<NotificationField> &
      {
        limit?: number,
      } = {},
  ): Promise<*> {
    return this.httpGet('/', queryArgs);
  }

  getFieldValue(field: NotificationField): Promise<*> {
    return this.httpGet(`/${field}`);
  }

  getDisplay(): Promise<*> {
    return this.httpGet('/display');
  }

  getEntities(): Promise<*> {
    return this.httpGet('/entities');
  }

  board() {
    return new Board(this.auth, {
      parentPath: `actions/${this.instanceId}`,
      resourcePath: '/board',
    });
  }

  card() {
    return new Card(this.auth, {
      parentPath: `actions/${this.instanceId}`,
      resourcePath: '/card',
    });
  }

  list() {
    return new List(this.auth, {
      parentPath: `actions/${this.instanceId}`,
      resourcePath: '/list',
    });
  }

  member() {
    return new Member(this.auth, {
      parentPath: `actions/${this.instanceId}`,
      resourcePath: '/member',
    });
  }

  updateNotification(
    queryArgs?: {
      name?: string,
      closed?: boolean,
      idBoard?: string,
      subscribed?: boolean,
    } = {},
  ): Promise<*> {
    return this.httpPut('/', queryArgs);
  }

  updateClosedStatus(value: boolean): Promise<*> {
    return this.httpPut('/closed', { value });
  }

  addNotification(
    queryArgs: {
      name: string,
      idBoard: string,
      idNotificationSource?: string,
    },
  ): Promise<*> {
    return this.httpPost('/', queryArgs);
  }
}