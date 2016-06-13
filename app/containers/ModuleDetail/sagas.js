/* eslint-disable no-constant-condition */

import { take, call, put, select, race } from 'redux-saga/effects';
import { LOCATION_CHANGE } from 'react-router-redux';
import { LOAD_MODULE } from './constants';
import { moduleLoaded, graphLoaded, hierarchicalGraphLoaded, moduleLoadingError } from './actions';
import { selectUid } from './selectors';
import api from 'utils/api';
import neo4j2vis from 'utils/neo4j2vis';

// All sagas to be loaded
export default [
  getModuleData,
  getGraphData,
  getHierarchicalData,
];

export function* getModuleData() {
  while (true) {
    const watcher = yield race({
      loadModule: take(LOAD_MODULE),
      stop: take(LOCATION_CHANGE), // stop watching if user leaves page
    });

    if (watcher.stop) break;

    const uid = yield select(selectUid());

    const dataResponse = yield(call(api,
      'MATCH (n:Module) WHERE n.uid =~ {uid} RETURN n',
      { uid },
    ));

    if (dataResponse.err === undefined || dataResponse.err === null) {
      const rows = dataResponse.data.nodes.map(n => n.n.properties);
      yield put(moduleLoaded(rows[0]));
    } else {
      console.log(dataResponse.err); // eslint-disable-line no-console
      yield put(moduleLoadingError(dataResponse.err));
    }
  }
}

export function* getGraphData() {
  while (true) {
    const watcher = yield race({
      loadModule: take(LOAD_MODULE),
      stop: take(LOCATION_CHANGE), // stop watching if user leaves page
    });

    if (watcher.stop) break;

    const uid = yield select(selectUid());

    const graphResponse = yield(call(api,
      'MATCH (before)-[preceeding:precedes*0..]->(current{uid:{uid}})-[succeeding:precedes*0..]->(after) ' +
      'RETURN before, current, after, preceeding, succeeding',
      { uid },
    ));

    if (graphResponse.err === undefined || graphResponse.err === null) {
      yield put(graphLoaded(neo4j2vis(graphResponse.data)));
    } else {
      console.log(graphResponse.err); // eslint-disable-line no-console
      yield put(moduleLoadingError(graphResponse.err));
    }
  }
}

export function* getHierarchicalData() {
  while (true) {
    const watcher = yield race({
      loadModule: take(LOAD_MODULE),
      stop: take(LOCATION_CHANGE), // stop watching if user leaves page
    });

    if (watcher.stop) break;

    const uid = yield select(selectUid());

    const graphResponse = yield(call(api,
      'MATCH (before)-[r*0..]->(current{uid:{uid}}) RETURN before, current, r',
      { uid },
    ));

    if (graphResponse.err === undefined || graphResponse.err === null) {
      yield put(hierarchicalGraphLoaded(neo4j2vis(graphResponse.data)));
    } else {
      console.log(graphResponse.err); // eslint-disable-line no-console
      yield put(moduleLoadingError(graphResponse.err));
    }
  }
}
