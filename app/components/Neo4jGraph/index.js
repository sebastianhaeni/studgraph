import React from 'react';
import vis from 'vis';

import styles from './styles.css';

export class Neo4jGraph extends React.Component {

  componentDidMount() {
    this.createNetwork(this.props);
  }

  componentWillReceiveProps(nextProps) {
    this.createNetwork(nextProps);
  }

  createNetwork(props) {
    const options = {
      nodes: {
        shape: 'box',
      },
      interaction: {
        hover: true,
        zoomView: false,
      },
    };
    this.network = new vis.Network(this.canvas, props.graph, options);
    this.network.on('doubleClick', (params) => props.handleDoubleClick(params));
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
