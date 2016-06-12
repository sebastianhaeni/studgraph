import React from 'react';
import vis from 'vis';

import styles from './styles.css';

export class Neo4jGraph extends React.Component {

  componentDidMount() {
    const options = {
      nodes: {
        shape: 'box',
      },
      interaction: { hover: true },
    };
    this.network = new vis.Network(this.canvas, this.props.graph, options);
    this.network.on('doubleClick', (params) => this.props.handleDoubleClick(params));
  }

  network;

  render() {
    return (
      <div className={styles.graph} ref={(ref) => { this.canvas = ref; }}></div>
    );
  }
}

Neo4jGraph.propTypes = {
  graph: React.PropTypes.object.isRequired,
  handleDoubleClick: React.PropTypes.func,
};

export default Neo4jGraph;
