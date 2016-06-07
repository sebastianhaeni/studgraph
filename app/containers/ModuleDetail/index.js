/*
 *
 * ModuleDetail
 *
 */

import React from 'react';
import { connect } from 'react-redux';
import vis from 'vis';
import H1 from 'components/H1';
import selectModuleDetail from './selectors';
import styles from './styles.css';

export class ModuleDetail extends React.Component { // eslint-disable-line react/prefer-stateless-function

  componentDidMount() {
    // create an array with nodes
    var nodes = new vis.DataSet([
      {id: 1, label: 'Node 1'},
      {id: 2, label: 'Node 2'},
      {id: 3, label: 'Node 3'},
      {id: 4, label: 'Node 4'},
      {id: 5, label: 'Node 5'},
    ]);
    // create an array with edges
    var edges = new vis.DataSet([
      {from: 1, to: 3},
      {from: 1, to: 2},
      {from: 2, to: 4},
      {from: 2, to: 5},
    ]);

    // create a network
    var data = {
      nodes: nodes,
      edges: edges,
    };
    var options = {};
    console.log(this.canvas);
    var network = new vis.Network(this.canvas, data, options);
  }

  render() {
    console.log(this.props.params.id);

    let canvas = {
      width: '100%',
      height: '500px'
    };

    return (
      <div className={styles.moduleDetail}>
        <H1>{this.props.params.id}</H1>
        This is ModuleDetail container !
        <div style={canvas} ref={(ref) => this.canvas = ref}></div>
      </div>
    );
  }
}

const mapStateToProps = selectModuleDetail();

function mapDispatchToProps(dispatch) {
  return {
    dispatch,
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(ModuleDetail);
