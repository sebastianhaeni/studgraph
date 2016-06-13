import { createSelector } from 'reselect';

/**
 * Direct selector to the moduleGraph state domain
 */
const selectModuleGraphDomain = () => state => state.get('moduleGraph');

/**
 * Other specific selectors
 */


/**
 * Default selector used by ModuleGraph
 */

const selectModuleGraph = () => createSelector(
  selectModuleGraphDomain(),
  (substate) => substate
);

export default selectModuleGraph;
export {
  selectModuleGraphDomain,
};
