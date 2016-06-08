/*
 *
 * ModuleDetail
 *
 */

import React from 'react';
import { connect } from 'react-redux';
import H1 from 'components/H1';
import selectModuleDetail from './selectors';
import styles from './styles.css';
import Neo4jGraph from 'components/Neo4jGraph';

export class ModuleDetail extends React.Component { // eslint-disable-line react/prefer-stateless-function

  render() {
    // console.log(this.props.params.id);

    const query = 'MATCH (before)-[:precedes]->(current{uid:\'BTI7302\'})-[:precedes]->(after) RETURN before, current, after;';
    const graph = {
      height: '600px',
    };

    return (
      <div className={styles.moduleDetail}>
        <H1>{this.props.params.id}</H1>
        This is ModuleDetail container !
        <div style={graph}>
          <Neo4jGraph query={query} />
        </div>
      </div>
    );
  }
}

ModuleDetail.propTypes = {
  params: React.PropTypes.shape({
    id: React.PropTypes.string.isRequired,
  }),
};

const mapStateToProps = selectModuleDetail();

function mapDispatchToProps(dispatch) {
  return {
    dispatch,
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(ModuleDetail);
