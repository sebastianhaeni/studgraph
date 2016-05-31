import expect from 'expect';
import moduleDetailReducer from '../reducer';
import { fromJS } from 'immutable';

describe('moduleDetailReducer', () => {
  it('returns the initial state', () => {
    expect(moduleDetailReducer(undefined, {})).toEqual(fromJS({}));
  });
});
