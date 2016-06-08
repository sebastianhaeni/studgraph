import React from 'react';
import vis from 'vis';

import styles from './styles.css';

export class Neo4jGraph extends React.Component {

  componentDidMount() {
    // create an array with nodes
    const nodes = new vis.DataSet([
      { id: 1, label: 'Node 1' },
      { id: 2, label: 'Node 2' },
      { id: 3, label: 'Node 3' },
      { id: 4, label: 'Node 4' },
      { id: 5, label: 'Node 5' },
    ]);

    // create an array with edges
    const edges = new vis.DataSet([
      { from: 1, to: 3 },
      { from: 1, to: 2 },
      { from: 2, to: 4 },
      { from: 2, to: 5 },
    ]);

    // create a network
    const data = {
      nodes,
      edges,
    };
    const options = {};
    this.network = new vis.Network(this.canvas, data, options);
  }

  render() {
    return (
      <div className={styles.graph} ref={(ref) => { this.canvas = ref; }}></div>
    );
  }
}

Neo4jGraph.propTypes = {
  query: React.PropTypes.string,
};

export default Neo4jGraph;
