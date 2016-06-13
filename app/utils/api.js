import { call } from 'redux-saga/effects';
import { NEO4J } from '../config';
import request from './request';

export default execute;

export function* execute(statement, params) {
  return yield call(request, `${NEO4J.URL}`, {
    method: 'POST',
    body: JSON.stringify({
      statement,
      params,
    }),
  });
}
