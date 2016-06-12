/**
 * Homepage selectors
 */

import { createSelector } from 'reselect';

const selectHome = () => (state) => state.get('home');

const selectName = () => createSelector(
  selectHome(),
  (homeState) => homeState.get('username')
);

export {
  selectHome,
  selectName,
};
