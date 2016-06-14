import React from 'react';
import vis from 'vis';

import styles from './styles.css';

export class Neo4jGraph extends React.Component {

  componentDidMount() {
    this.createNetwork(this.props);
  }

  mapClickToData(params) {
    if(params.nodes.length <= 0){
      return;
    }
    return this.props.graph.meta.get(params.nodes[0]).data;
  }

  createNetwork(props) {
    const options = {
      nodes: {
        shape: 'box',
      },
      interaction: {
        hover: true,
        zoomView: !!props.enableZoom,
      },
    };
    this.network = new vis.Network(this.canvas, props.graph, options);
    if (props.handleDoubleClick) {
      this.network.on('doubleClick', (params) => props.handleDoubleClick(this.mapClickToData(params)));
    }
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
  enableZoom: React.PropTypes.bool,
};

export default Neo4jGraph;
