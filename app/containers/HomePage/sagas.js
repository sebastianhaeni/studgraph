/**
 * Gets the modules from a neo4j server
 */

/* eslint-disable no-constant-condition */

import { take, call, put, select, race } from 'redux-saga/effects';

import { LOCATION_CHANGE } from 'react-router-redux';

import { LOAD_MODULES } from 'containers/App/constants';
import { modulesLoaded, moduleLoadingError } from 'containers/App/actions';

import api from 'utils/api';
import { selectName } from 'containers/HomePage/selectors';

// Bootstrap sagas
export default [
  getModuleData,
];

// Individual exports for testing
export function* getModuleData() {
  while (true) {
    const watcher = yield race({
      loadModules: take(LOAD_MODULES),
      stop: take(LOCATION_CHANGE), // stop watching if user leaves page
    });

    if (watcher.stop) break;

    const name = yield select(selectName());

    const response = yield(call(api,
      'MATCH (n:Module) WHERE n.name_de =~ {name} OR n.name_fr =~ {name} OR n.uid =~ {name} RETURN n',
      { name: `(?i).*${name}.*` },
    ));

    if (response.err === undefined || response.err === null) {
      const rows = response.data.nodes.map(n => n.n.properties);
      yield put(modulesLoaded(rows, name));
    } else {
      console.log(response.err); // eslint-disable-line no-console
      yield put(moduleLoadingError(response.err));
    }
  }
}
