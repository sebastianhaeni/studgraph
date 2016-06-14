/*
 *
 * ModuleGraph actions
 *
 */

import {
  LOAD_GRAPH,
  LOAD_GRAPH_SUCCESS,
  LOAD_ERROR,
} from './constants';

export function loadGraph() {
  return {
    type: LOAD_GRAPH,
  };
}

export function graphLoaded(graph) {
  return {
    type: LOAD_GRAPH_SUCCESS,
    graph,
  };
}

export function loadError(error){
  return {
    type: LOAD_ERROR,
    error,
  }
}