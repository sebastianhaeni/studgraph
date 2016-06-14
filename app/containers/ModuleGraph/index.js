/*
 *
 * ModuleGraph
 *
 */

import React from 'react';
import {connect} from 'react-redux';
import {push} from 'react-router-redux';

import { createSelector } from 'reselect';


import H1 from 'components/H1';
import Neo4jGraph from 'components/Neo4jGraph';
import LoadingIndicator from 'components/LoadingIndicator';
import Button from 'components/Button';

import {
  selectModuleGraph,
  selectGraph,
  selectLoading,
} from './selectors';
import {loadGraph} from './actions';
import styles from './styles.css';

export class ModuleGraph extends React.Component { // eslint-disable-line react/prefer-stateless-function

  componentWillMount() {
    this.props.load()
  }

  graphStyle = {
    height: '600px',
  };

  /**
   * Changes the route
   *
   * @param  {string} route The route we want to go to
   */
  openRoute = (route) => {
    this.props.changeRoute(route);
  };

  openHomePage = () => {
    this.openRoute('/');
  };

  handleDoubleClick = (params) => {
    if (!params) {
      return;
    }

    this.openRoute(`/module/${params.uid}`);
  };

  render() {

    let content = null;

    if(this.props.loading){
      content = <LoadingIndicator />;
    } else {
      content = <Neo4jGraph graph={this.props.graph} enableZoom={true} handleDoubleClick={this.handleDoubleClick} />;
    }

    return (
      <div className={ styles.moduleGraph }>
        <Button handleRoute={this.openHomePage}>Back</Button>
        <H1>Module Graph</H1>
        <div style={this.graphStyle}>
          {content}
        </div>
      </div>
    );
  }
}

ModuleGraph.propTypes = {
  changeRoute: React.PropTypes.func,
  loading: React.PropTypes.bool,
  graph: React.PropTypes.oneOfType([
    React.PropTypes.object,
    React.PropTypes.bool,
  ]).isRequired,
};

function mapDispatchToProps(dispatch) {
  return {
    changeRoute: (url) => dispatch(push(url)),
    load: () => dispatch(loadGraph()),

    dispatch,
  };
}

export default connect(createSelector(
  selectModuleGraph(),
  selectGraph(),
  selectLoading(),
  (moduleGraph, graph, loading,) => ({moduleGraph, graph, loading,})
), mapDispatchToProps)(ModuleGraph);
