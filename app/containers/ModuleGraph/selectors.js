import {createSelector} from 'reselect';

/**
 * Direct selector to the moduleGraph state domain
 */
const selectModuleGraphDomain = () => state => state.get('moduleGraph');

/**
 * Other specific selectors
 */

const selectLoading = () => createSelector(
  selectModuleGraphDomain(),
  (globalState) => globalState.get('loading')
);

const selectGraph = () => createSelector(
  selectModuleGraphDomain(),
  (globalState) => globalState.getIn(['userData', 'graph'])
);

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
  selectGraph,
  selectLoading,
  selectModuleGraph,
};
