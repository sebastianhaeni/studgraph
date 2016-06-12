/*
 *
 * ModuleDetail actions
 *
 */

import {
  DEFAULT_ACTION,
  LOAD_MODULE,
  LOAD_MODULE_ERROR,
} from './constants';

export function defaultAction() {
  return {
    type: DEFAULT_ACTION,
  };
}

export function moduleLoaded(module, uid) {
  return {
    type: LOAD_MODULE,
    module,
    uid,
  };
}

export function moduleLoadingError(error) {
  return {
    type: LOAD_MODULE_ERROR,
    error,
  };
}

