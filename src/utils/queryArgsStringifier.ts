import snakeCase from 'lodash.snakecase';

/**
 * Returns a string to append to the query string that accommodates for nested
 *    entities.  These need to be un-nested to successfully perform the API call.
 * @example
 *   Given:
 *    queryArgs = {
 *      prefs: {
 *        invitations: 'admins'
 *        selfJoin: true,
 *      }
 *      separator: '/',
 *    }
 *  Output: prefs/invitations=admins&prefs/selfJoin=true
 *
 * @param {string} childName Name of the key containing children.
 * @param {object} queryArgs Arguments to parse.
 * @returns {string} URL string in correct format.
 */
const getQueryStringForNestedArgs = (
  childName: string,
  queryArgs: any,
): string => {
  let childUrlString = '';
  const childGroup = queryArgs[childName];

  // Ensure the separator was specified for nested args.
  const { separator } = queryArgs;
  /* istanbul ignore next: The separator isn't specified by the user, I don't need to test this. */
  if (!separator) {
    throw new Error('Separator must be specified for child args');
  }

  Object.keys(childGroup).forEach(childKey => {
    const childArgKey = `${childName}${separator}${childKey}`;
    const childArgValue = childGroup[childKey];
    childUrlString = `${childUrlString}${childArgKey}=${childArgValue}&`;
  });

  // Remove the trailing ampersand.
  return childUrlString.slice(0, -1);
};

/**
 * Returns the key for building the query string with the correct casing.  The
 *    "queryArgs" object passed into the request function has camel cased
 *    keys.  The Trello API's keys are snake cased (with a few exceptions).
 * @param {string} key Camel cased key.
 * @returns {string} Snake cased key.
 */
const getKeyForQueryString = (key: string): string => {
  // Certain keys should not be recased.
  const excludedKeys = [
    'avatarSource',
    'boardBackgrounds',
    'boardStars',
    'callbackURL',
    'confirmationAccepted', // Enterprise
    'customBoardBackgrounds',
    'customEmoji',
    'customStickers',
    'defaultLabels',
    'defaultLists',
    'displayName',
    'dueComplete',
    'fullName',
    'ixLastUpdate',
    'keepFromSource',
    'mimeType',
    'modelTypes',
    'myPrefs',
    'onlyOrgMembers',
    'powerUp',
    'powerUps',
    'returnUrl', // Enterprise
    'savedSearches',
    'webhook',
    'webhooks',
    'website',
    'zIndex',
  ];
  if (excludedKeys.includes(key)) {
    return key;
  }

  // All of the params that start with "id" (e.g. idBoard, idCard, etc.)
  // shouldn't be recased.
  if (key.substr(0, 2) === 'id') {
    return key;
  }

  // Ensure this doesn't get converted to one word.
  if (key === 'cardBoard') {
    return 'card_board';
  }

  let recasedKey: string = snakeCase(key);

  // These are fields that have been recased to ensure all the other words
  // are separated by underscores, but only part of the key needs to be
  // changed.
  if (recasedKey.includes('member_creator')) {
    recasedKey = recasedKey.replace('_creator', 'Creator');
  } else if (recasedKey.includes('_voted')) {
    recasedKey = recasedKey.replace('_voted', 'Voted');
  } else if (recasedKey.includes('plugin_data')) {
    recasedKey = recasedKey.replace('_data', 'Data');
  } else if (recasedKey.includes('_invited')) {
    recasedKey = recasedKey.replace('_invited', 'Invited');
  } else if (recasedKey.includes('check_item')) {
    recasedKey = recasedKey.replace('check_item', 'checkItem');
    if (recasedKey.includes('_state')) {
      recasedKey = recasedKey.replace('_state', 'State');
    }
  } else if (recasedKey.includes('sort_by')) {
    recasedKey = recasedKey.replace('sort_by', 'sortBy');
  } else if (recasedKey.includes('sort_order')) {
    recasedKey = recasedKey.replace('sort_order', 'sortOrder');
  } else if (recasedKey.includes('start_index')) {
    recasedKey = recasedKey.replace('start_index', 'startIndex');
  }

  return recasedKey;
};

/**
 * Creates the query string that will be appended to the endpoint path to
 *    perform the request to the Trello API.
 * @param {object} queryArgs Argument(s) used to build query string.
 * @returns {string} Query string for the request.
 */
const stringifyQueryArgs = (queryArgs: Object): string => {
  let queryArgsString = '';
  Object.keys(queryArgs).forEach((queryArgKey: string) => {
    const value = queryArgs[queryArgKey];
    // If the value of the entry is an object (rather than a value), the
    // corresponding child properties need to be combined for the URL string.
    if (typeof value === 'object' && !Array.isArray(value) && value !== null) {
      const nestedString = getQueryStringForNestedArgs(queryArgKey, queryArgs);
      queryArgsString = `${queryArgsString}${nestedString}&`;

      // These are simple key/value pairs in which the value is a string or
      // number.
    } else {
      // Ensure the separator key specified for handling nested args isn't
      // present in the query string.
      if (queryArgKey !== 'separator') {
        // eslint-disable-line no-lonely-if
        const argKey = getKeyForQueryString(queryArgKey);
        queryArgsString = `${queryArgsString}${argKey}=${value}&`;
      }
    }
  });

  // Ensure there is no double ampersand in the query string.  This may
  // occur due to the string being constructed manually.
  return queryArgsString.replace('&&', '&');
};

export default stringifyQueryArgs;
