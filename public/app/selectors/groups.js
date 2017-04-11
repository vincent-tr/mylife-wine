'use strict';

import Immutable from 'immutable';
import { createSelector } from 'reselect';

export const getGroups = (state) => state.groups.toArray();
export const getGroup  = (state, { group }) => state.groups.get(group);

export const getChildren = (state, props) => {
  if(!props.group) {
    return state.groups.filter(it => !it.parent); // Root elements
  } else if (!props.group.id) {
    return Immutable.Map(); // Non tries -> no children
  } else {
    return state.groups.filter(it => it.parent === props.group.id);
  }
};

export const makeGetSortedChildren = () => createSelector(
  [ getChildren ],
  (groups) => groups.sortBy(it => it.display).toArray()
);


export const getGroupAndChildrenIds = (state, props) => {
  if(!props.group) { return [null]; }

  const groups = getGroups(state);
  const ids    = [];
  children(props.group);
  return ids;

  function children(id) {
    ids.push(id);
    for(const child of groups.filter(g => g.parent === id).map(g => g.id)) {
      children(child);
    }
  }
};