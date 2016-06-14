/*
 *
 * ModuleGraph reducer
 *
 */

import {fromJS} from 'immutable';
import {
  LOAD_GRAPH,
  LOAD_ERROR,
  LOAD_GRAPH_SUCCESS,
} from './constants';

const initialState = fromJS({
  loading: false,
  error: false,
  userData: fromJS({
    graph: {},
  }),
});

function moduleGraphReducer(state = initialState, action) {
  switch (action.type) {
    case LOAD_GRAPH:
      return state
        .set('loading', true)
        .setIn(['userData', 'graph'], {});
    case LOAD_GRAPH_SUCCESS:
      return state
        .setIn(['userData', 'graph'], action.graph)
        .set('loading', false);
    case LOAD_ERROR:
      return state
        .set('error', action.error)
        .set('loading', false);
    default:
      return state;
  }
}

export default moduleGraphReducer;
