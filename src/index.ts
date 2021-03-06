import Action from './resources/action';
import Batch from './resources/batch';
import Board from './resources/board';
import Card from './resources/card';
import Checklist from './resources/checklist';
import Enterprise from './resources/enterprise';
import Label from './resources/label';
import List from './resources/list';
import Member from './resources/member';
import Notification from './resources/notification';
import Organization from './resources/organization';
import Search from './resources/search';
import Token from './resources/token';
import Type from './resources/type';
import Webhook from './resources/webhook';
import { Config } from './types';

export default class Trello {
  config: Config;

  constructor(config: Config) {
    this.config = config;
  }

  actions(actionId: string = ''): Object {
    return new Action(this.config, `/actions/${actionId}`);
  }

  batch(): Object {
    return new Batch(this.config, '/batch');
  }

  boards(boardId: string = ''): Object {
    return new Board(this.config, `/boards/${boardId}`);
  }

  cards(cardId: string = ''): Object {
    return new Card(this.config, `/cards/${cardId}`);
  }

  checklists(checklistId: string = ''): Object {
    return new Checklist(this.config, `/checklists/${checklistId}`);
  }

  enterprises(enterpriseId: string = ''): Object {
    return new Enterprise(this.config, `/enterprise/${enterpriseId}`);
  }

  labels(labelId: string = ''): Object {
    return new Label(this.config, `/labels/${labelId}`);
  }

  lists(listId: string = ''): Object {
    return new List(this.config, `/lists/${listId}`);
  }

  members(memberIdOrUsername: string = ''): Object {
    return new Member(this.config, `/members/${memberIdOrUsername}`);
  }

  notifications(notificationId: string = ''): Object {
    return new Notification(this.config, `/notifications/${notificationId}`);
  }

  organizations(orgIdOrName: string = ''): Object {
    return new Organization(this.config, `/organizations/${orgIdOrName}`);
  }

  search(): Object {
    return new Search(this.config, '/search');
  }

  tokens(tokenName: string = ''): Object {
    return new Token(this.config, `/tokens/${tokenName}`);
  }

  types(): Object {
    return new Type(this.config, '/types');
  }

  webhooks(webhookId: string = ''): Object {
    return new Webhook(this.config, `/webhooks/${webhookId}`);
  }
}
