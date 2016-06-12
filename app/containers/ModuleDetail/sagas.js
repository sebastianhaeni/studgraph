/* eslint-disable no-constant-condition */

import { take, call, put, select, race } from 'redux-saga/effects';
import { LOCATION_CHANGE } from 'react-router-redux';

import { DEFAULT_ACTION } from './constants';
import { moduleLoaded, moduleLoadingError } from './actions';

import { selectUid } from './selectors';
import api from 'utils/api';

// All sagas to be loaded
export default [
  defaultSaga,
];

export function* defaultSaga() {
  while (true) {
    const watcher = yield race({
      loadModule: take(DEFAULT_ACTION),
      stop: take(LOCATION_CHANGE), // stop watching if user leaves page
    });

    if (watcher.stop) break;

    const name = yield select(selectUid());

    const response = yield(call(api, {
      statement: 'MATCH (n:Module) WHERE n.name_de =~ {name} RETURN n',
      parameters: { name: `(?i).*${name}.*` },
    }));

    if (response.err === undefined || response.err === null) {
      const rows = response.data.results.length > 0 && response.data.results[0].data.length > 0
        ? response.data.results[0].data.map(n => n.row[0])
        : [];
      yield put(moduleLoaded(rows, name));
    } else {
      console.log(response.err); // eslint-disable-line no-console
      yield put(moduleLoadingError(response.err));
    }
  }
}
