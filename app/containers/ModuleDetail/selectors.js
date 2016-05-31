import { createSelector } from 'reselect';

/**
 * Direct selector to the moduleDetail state domain
 */
const selectModuleDetailDomain = () => state => state.get('moduleDetail');

/**
 * Other specific selectors
 */


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
};
