/*
 * App Actions
 *
 * Actions change things in your application
 * Since this boilerplate uses a uni-directional data flow, specifically redux,
 * we have these actions which are the only way your application interacts with
 * your appliction state. This guarantees that your state is up to date and nobody
 * messes it up weirdly somewhere.
 *
 * To add a new Action:
 * 1) Import your constant
 * 2) Add a function like this:
 *    export function yourAction(var) {
 *        return { type: YOUR_ACTION_CONSTANT, var: var }
 *    }
 */

import {
  LOAD_MODULES,
  LOAD_MODULES_SUCCESS,
  LOAD_MODULES_ERROR,
} from './constants';

/**
 * Load the modules, this action starts the getModuleData saga
 *
 * @return {object} An action object with a type of LOAD_MODULES
 */
export function loadModules() {
  return {
    type: LOAD_MODULES,
  };
}

/**
 * Dispatched when the modules are loaded by the getModuleData saga
 *
 * @param  {array} modules The module data
 * @param  {string} username The current name
 *
 * @return {object}      An action object with a type of LOAD_MODULES_SUCCESS passing the modules
 */
export function modulesLoaded(modules, username) {
  return {
    type: LOAD_MODULES_SUCCESS,
    modules,
    username,
  };
}

/**
 * Dispatched when loading the modules fails
 *
 * @param  {object} error The error
 *
 * @return {object}       An action object with a type of LOAD_MODULES_ERROR passing the error
 */
export function moduleLoadingError(error) {
  return {
    type: LOAD_MODULES_ERROR,
    error,
  };
}
