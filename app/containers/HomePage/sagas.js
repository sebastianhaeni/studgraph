/**
 * Gets the repositories of the user from Github
 */

/* eslint-disable no-constant-condition */

import { take, call, put, select, race } from 'redux-saga/effects';

import { LOCATION_CHANGE } from 'react-router-redux';

import { LOAD_REPOS } from 'containers/App/constants';
import { reposLoaded, repoLoadingError } from 'containers/App/actions';

import request from 'utils/request';
import { selectUsername } from 'containers/HomePage/selectors';

// Bootstrap sagas
export default [
  getGithubData,
];

// Individual exports for testing
export function* getGithubData() {
  while (true) {
    const watcher = yield race({
      loadRepos: take(LOAD_REPOS),
      stop: take(LOCATION_CHANGE), // stop watching if user leaves page
    });

    if (watcher.stop) break;

    const username = yield select(selectUsername());

    const headers = new Headers();
    headers.append('Authorization', 'Basic realm="Neo4j" ' + btoa('neo4j:1234'));
    headers.append('Content-Type', 'application/json');
    const response = yield call(request, 'http://localhost:7474/db/data/transaction/commit', {
      //const response = yield call(request, 'http://app515748616zaiaq.sb04.stations.graphenedb.com:24789/db/data/transaction/commit', {
      headers: headers,
      method: 'POST',
      body: JSON.stringify({
        statements: [{
          statement: 'MATCH (n:Module) WHERE n.name_de =~ {name} RETURN n',
          parameters: {name: '(?i).*' + username + '.*'}
        }]
      }),
    });

    if (response.err === undefined || response.err === null) {
      const rows = response.data.results.length > 0 && response.data.results[0].data.length > 0
        ? response.data.results[0].data.map(n => n.row[0])
        : [];
      yield put(reposLoaded(rows, username));
    } else {
      console.log(response.err); // eslint-disable-line no-console
      yield put(repoLoadingError(response.err));
    }
  }
}
