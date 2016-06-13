/*
 *
 * ModuleDetail actions
 *
 */

import {
  LOAD_MODULE,
  LOAD_MODULE_SUCCESS,
  LOAD_GRAPH_SUCCESS,
  LOAD_HIERARCHICAL_GRAPH_SUCCESS,
  LOAD_MODULE_ERROR,
} from './constants';

export function loadModule(uid) {
  return {
    type: LOAD_MODULE,
    uid,
  };
}

export function moduleLoaded(module) {
  return {
    type: LOAD_MODULE_SUCCESS,
    module,
  };
}

export function graphLoaded(graph) {
  return {
    type: LOAD_GRAPH_SUCCESS,
    graph,
  };
}

export function hierarchicalGraphLoaded(graph) {
  return {
    type: LOAD_HIERARCHICAL_GRAPH_SUCCESS,
    graph,
  };
}

export function moduleLoadingError(error) {
  return {
    type: LOAD_MODULE_ERROR,
    error,
  };
}

