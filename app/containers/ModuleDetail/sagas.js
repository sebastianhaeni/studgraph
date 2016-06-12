/* eslint-disable no-constant-condition */

import { take, call, put, select, race } from 'redux-saga/effects';
import { LOCATION_CHANGE } from 'react-router-redux';

import { LOAD_MODULE } from './constants';
import { moduleLoaded, graphLoaded, moduleLoadingError } from './actions';

import { selectUid } from './selectors';
import api from 'utils/api';
import neo4j2vis from 'utils/neo4j2vis';

// All sagas to be loaded
export default [
  getModuleData,
  getGraphData,
];

export function* getModuleData() {
  while (true) {
    const watcher = yield race({
      loadModule: take(LOAD_MODULE),
      stop: take(LOCATION_CHANGE), // stop watching if user leaves page
    });

    if (watcher.stop) break;

    const uid = yield select(selectUid());

    const dataResponse = yield(call(api, {
      statement: 'MATCH (n:Module) WHERE n.uid =~ {uid} RETURN n',
      parameters: { uid },
    }));

    if (dataResponse.err === undefined || dataResponse.err === null) {
      const rows = dataResponse.data.results.length > 0 && dataResponse.data.results[0].data.length > 0
        ? dataResponse.data.results[0].data.map(n => n.row[0])
        : [];
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

    const graphResponse = yield(call(api, {
      statement: 'MATCH (before)-[:precedes*0..]->(current{uid:{uid}})-[:precedes*0..]->(after) RETURN before, current, after',
      parameters: { uid },
    }));

    if (graphResponse.err === undefined || graphResponse.err === null) {
      yield put(graphLoaded(neo4j2vis(graphResponse.data)));
    } else {
      console.log(graphResponse.err); // eslint-disable-line no-console
      yield put(moduleLoadingError(graphResponse.err));
    }
  }
}
