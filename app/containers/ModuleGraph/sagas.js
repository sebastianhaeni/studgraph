import {take, call, put, select, race} from 'redux-saga/effects';

import {LOCATION_CHANGE} from 'react-router-redux';
import {LOAD_GRAPH} from './constants';
import {graphLoaded, loadError} from './actions';

import api from 'utils/api';
import neo4j2vis from 'utils/neo4j2vis';

// All sagas to be loaded
export default [
  getGraphData,
];

export function* getGraphData() {
  while (true) {
    const watcher = yield race({
      loadModule: take(LOAD_GRAPH),
      stop: take(LOCATION_CHANGE), // stop watching if user leaves page
    });

    if (watcher.stop) break;

    const graphResponse = yield(call(api,
      'MATCH (before:Module)-[preceeding:precedes*0..]->(current:Module)-[succeeding:precedes*0..]->(after:Module) ' +
      'RETURN before, current, after, preceeding, succeeding',
    ));

    if (graphResponse.err === undefined || graphResponse.err === null) {
      yield put(graphLoaded(neo4j2vis(graphResponse.data)));
    } else {
      console.log(graphResponse.err); // eslint-disable-line no-console
      yield put(loadError(graphResponse.err));
    }
  }
}