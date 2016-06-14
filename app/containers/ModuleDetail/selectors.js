import { createSelector } from 'reselect';

/**
 * Direct selector to the moduleDetail state domain
 */
const selectModuleDetailDomain = () => state => state.get('moduleDetail');

/**
 * Other specific selectors
 */
const selectModule = () => createSelector(
  selectModuleDetailDomain(),
  (moduleState) => moduleState.getIn(['userData', 'module'])
);

const selectUid = () => createSelector(
  selectModuleDetailDomain(),
  (moduleState) => moduleState.get('currentUid')
);

const selectGraph = () => createSelector(
  selectModuleDetailDomain(),
  (moduleState) => moduleState.getIn(['userData', 'graph'])
);

const selectHierarchicalGraph = () => createSelector(
  selectModuleDetailDomain(),
  (moduleState) => moduleState.getIn(['userData', 'hierarchicalGraph'])
);

const selectLoadingData = () => createSelector(
  selectModuleDetailDomain(),
  (globalState) => globalState.get('dataLoading')
);

const selectLoadingGraph = () => createSelector(
  selectModuleDetailDomain(),
  (globalState) => globalState.get('graphLoading')
);

const selectLoadingHierarchicalGraph = () => createSelector(
  selectModuleDetailDomain(),
  (globalState) => globalState.get('hierarchicalGraphLoading')
);

const selectError = () => createSelector(
  selectModuleDetailDomain(),
  (globalState) => globalState.get('error')
);

/**
 * Default selector used by ModuleDetail
 */

const selectModuleDetail = () => createSelector(
  selectModuleDetailDomain(),
  (substate) => substate
);

export default selectModuleDetail;
export {
  selectModuleDetailDomain,
  selectUid,
  selectGraph,
  selectHierarchicalGraph,
  selectLoadingData,
  selectLoadingGraph,
  selectLoadingHierarchicalGraph,
  selectError,
  selectModule,
};
