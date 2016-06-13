import { call } from 'redux-saga/effects';
import { NEO4J } from '../config';
import request from './request';

export default execute;

export function* execute(statement) {
  const headers = new Headers();
  headers.append('Authorization', `Basic realm="Neo4j" ${btoa(`${NEO4J.USERNAME}:${NEO4J.PASSWORD}`)}`);
  headers.append('Content-Type', 'application/json');
  return yield call(request, `${NEO4J.URL}/db/data/transaction/commit`, {
    headers,
    method: 'POST',
    body: JSON.stringify({
      statements: [statement],
    }),
  });
}
