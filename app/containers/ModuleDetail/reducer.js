/*
 *
 * ModuleDetail reducer
 *
 */

import { fromJS } from 'immutable';
import {
  LOAD_MODULE,
  LOAD_MODULE_SUCCESS,
  LOAD_GRAPH_SUCCESS,
  LOAD_HIERARCHICAL_GRAPH_SUCCESS,
  LOAD_MODULE_ERROR,
} from './constants';

const initialState = fromJS({
  dataLoading: false,
  graphLoading: false,
  hierarchicalGraphLoading: false,
  error: false,
  currentUid: false,
  userData: fromJS({
    module: false,
    hierarchicalGraph: {},
    graph: {},
  }),
});

function moduleDetailReducer(state = initialState, action) {
  switch (action.type) {
    case LOAD_MODULE:
      return state
        .set('dataLoading', true)
        .set('graphLoading', true)
        .set('hierarchicalGraphLoading', true)
        .set('error', false)
        .set('currentUid', action.uid)
        .setIn(['userData', 'module'], false)
        .setIn(['userData', 'graph'], {})
        .setIn(['userData', 'hierarchicalGraph'], {});
    case LOAD_MODULE_SUCCESS:
      return state
        .setIn(['userData', 'module'], action.module)
        .set('dataLoading', false);
    case LOAD_GRAPH_SUCCESS:
      return state
        .setIn(['userData', 'graph'], action.graph)
        .set('graphLoading', false);
    case LOAD_HIERARCHICAL_GRAPH_SUCCESS:
      return state
        .setIn(['userData', 'hierarchicalGraph'], action.graph)
        .set('hierarchicalGraphLoading', false);
    case LOAD_MODULE_ERROR:
      return state
        .set('error', action.error)
        .set('dataLoading', false)
        .set('graphLoading', false)
        .set('hierarchicalGraphLoading', false);
    default:
      return state;
  }
}

export default moduleDetailReducer;
