/**
 * Gets the repositories of the user from Github
 */

/* eslint-disable no-constant-condition */

import {take, call, put, select, race} from 'redux-saga/effects';

import {LOCATION_CHANGE} from 'react-router-redux';

import {LOAD_REPOS} from 'containers/App/constants';
import {reposLoaded, repoLoadingError} from 'containers/App/actions';

//import request from 'utils/request';
import {selectUsername} from 'containers/HomePage/selectors';
import {v1 as neo4j}  from 'neo4j-driver/lib/browser/neo4j-web';

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
    const driver = neo4j.driver("http://app51574861-6ZaiAq:moGGdF579oSmDCjyPveW@app515748616zaiaq.sb04.stations.graphenedb.com:24789", neo4j.auth.basic("neo4j", "1234"));
    const session = driver.session();

    let result = yield call([session, session.run], "MATCH (n:Module) WHERE n.name_de =~ {nameParam} RETURN n",
      {nameParam: '(?i)' + username + '.*'});
    yield put(reposLoaded(result.records, username));
  }
}
