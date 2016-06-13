import expect from 'expect';
import moduleGraphReducer from '../reducer';
import { fromJS } from 'immutable';

describe('moduleGraphReducer', () => {
  it('returns the initial state', () => {
    expect(moduleGraphReducer(undefined, {})).toEqual(fromJS({}));
  });
});
