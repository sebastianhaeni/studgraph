/*
 *
 * ModuleDetail
 *
 */

import React from 'react';
import { connect } from 'react-redux';
import selectModuleDetail from './selectors';
import styles from './styles.css';

export class ModuleDetail extends React.Component { // eslint-disable-line react/prefer-stateless-function
  render() {
    return (
      <div className={ styles.moduleDetail }>
      This is ModuleDetail container !
      </div>
    );
  }
}

const mapStateToProps = selectModuleDetail();

function mapDispatchToProps(dispatch) {
  return {
    dispatch
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(ModuleDetail);
