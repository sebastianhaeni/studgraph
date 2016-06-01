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

    const requestURL = 'http://app515748616zaiaq.sb04.stations.graphenedb.com:24789/db/data/transaction/commit';
    const nodes = yield call(request, requestURL, {
      method: 'post',
      mode: 'cors',
      body: {
        statements: [
          {
            statement: 'MATCH (n:Module) WHERE n.name_de =~ {name} RETURN n',
            parameters: { props: { name: username } },
          },
        ],
      },
    });

    // We return an object in a specific format, see utils/request.js for more information
    if (nodes.err === undefined || nodes.err === null) {
      yield put(reposLoaded(nodes.data, username));
    } else {
      console.log(nodes.err.response); // eslint-disable-line no-console
      yield put(repoLoadingError(nodes.err));
    }
  }
}
