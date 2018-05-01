// @flow
import BaseResource from './baseResource';
import Board from './board';
import type { ArgumentGroup } from '../types';

// These colors are also available, they're just not documented:

export type LabelColor =
  | 'blue'
  | 'green'
  | 'orange'
  | 'purple'
  | 'red'
  | 'yellow'
  | 'sky'
  | 'lime'
  | 'pink'
  | 'black';

export type LabelField = 'color' | 'idBoard' | 'name' | 'uses';

/**
 * @namespace Label
 */
export default class Label extends BaseResource {
  getLabels(queryArgs?: { fields?: ArgumentGroup<LabelField> }): Promise<any> {
    return this.httpGet('/', queryArgs);
  }

  getLabel(queryArgs?: { fields?: ArgumentGroup<LabelField> }): Promise<any> {
    return this.httpGet('/', queryArgs);
  }

  board() {
    return new Board(this.config, `${this.routePath}/board`);
  }

  updateLabel(queryArgs?: {
    name?: string,
    color?: ?LabelColor,
  }): Promise<any> {
    return this.httpPut('/', queryArgs);
  }

  updateColor(value: ?LabelColor): Promise<any> {
    return this.httpPut('/color', { value });
  }

  updateName(value: string): Promise<any> {
    return this.httpPut('/name', { value });
  }

  addLabel(queryArgs: {
    name: string,
    color: ?LabelColor,
    idBoard?: string,
  }): Promise<any> {
    let updatedArgs = queryArgs;
    if (this.routePathElements[0] === 'boards') {
      updatedArgs = { ...queryArgs, idBoard: this.routePathElements[1] };
    }
    return this.httpPost('/', updatedArgs);
  }

  deleteLabel(): Promise<any> {
    return this.httpDelete('/');
  }
}
