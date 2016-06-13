/*
 *
 * ModuleGraph
 *
 */

import React from 'react';
import { connect } from 'react-redux';
import selectModuleGraph from './selectors';
import styles from './styles.css';

export class ModuleGraph extends React.Component { // eslint-disable-line react/prefer-stateless-function
  render() {
    return (
      <div className={ styles.moduleGraph }>
      This is ModuleGraph container !
      </div>
    );
  }
}

const mapStateToProps = selectModuleGraph();

function mapDispatchToProps(dispatch) {
  return {
    dispatch,
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(ModuleGraph);
