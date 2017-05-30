/* @flow */

/* Types */
import type { ArgumentGroup } from '../types';

export type ListField = 'closed' | 'idBoard' | 'name' | 'pos' | 'subscribed';

export type ListStatus = 'all' | 'closed' | 'none' | 'open';

export type ListFieldsQueryArgs = {
  list?: boolean,
  listFields?: ArgumentGroup<ListField>,
};
