/*
 *
 * ModuleDetail
 *
 */

import React from 'react';
import { connect } from 'react-redux';
import { push } from 'react-router-redux';

import { createSelector } from 'reselect';

import H1 from 'components/H1';
import H3 from 'components/H3';
import {
  selectModule,
  selectGraph,
  selectHierarchicalGraph,
  selectLoadingData,
  selectLoadingGraph,
  selectLoadingHierarchicalGraph,
  selectError,
} from './selectors';
import { loadModule } from './actions';
import Neo4jGraph from 'components/Neo4jGraph';
import Button from 'components/Button';
import LoadingIndicator from 'components/LoadingIndicator';

export class ModuleDetail extends React.Component { // eslint-disable-line react/prefer-stateless-function

  static mapToLabel(key) {
    switch (key) {
      case 'uid':
        return 'Number';
      case 'assessment':
        return 'Assessment';
      case 'name_fr':
        return 'Name (french)';
      case 'name_de':
        return 'Name (german)';
      case 'points':
        return 'ECTS-Score';
      default:
        return key;
    }
  }

  componentWillMount() {
    this.id = this.props.params.id;
    this.props.load(this.props.params.id);
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.params.id === this.id) {
      return;
    }

    this.id = nextProps.params.id;
    this.props.load(nextProps.params.id);
  }

  id;
  moduleProps;

  graphStyle = {
    height: '600px',
  };

  firstCellStyle = {
    minWidth: '200px',
  };

  /**
   * Changes the route
   *
   * @param  {string} route The route we want to go to
   */
  openRoute = (route) => {
    this.props.changeRoute(route);
  };

  handleDoubleClick = (params) => {
    if (!params) {
      return;
    }

    this.openRoute(`/module/${params.uid}`);
  };

  openHomePage = () => {
    this.openRoute('/');
  };

  getStatsContent(){
    if(this.props.loadingData){
      return <LoadingIndicator />;
    }

    Object.keys(this.props.module).forEach((key) => {
      const prop = this.props.module[key];
      this.moduleProps.push(
        <tr key={key}>
          <td style={this.firstCellStyle}>{ModuleDetail.mapToLabel(key)}</td>
          <td>{prop}</td>
        </tr>
      );
    });

    return (
      <table>
        <tbody>
        {this.moduleProps}
        </tbody>
      </table>
    );
  }

  getGraphContent(){
    if(this.props.loadingGraph){
      return <LoadingIndicator />;
    }

    return (<Neo4jGraph graph={this.props.graph} handleDoubleClick={this.handleDoubleClick} />);
  }

  getHierarchicalGraphContent(){
    if(this.props.loadingHierarchicalGraph){
      return <LoadingIndicator />;
    }

    return (<Neo4jGraph graph={this.props.hierarchicalGraph} />);
  }

  render() {
    this.moduleProps = [];

    let statsContent = this.getStatsContent();
    let graphContent = this.getGraphContent();
    let hierarchicalGraphContent = this.getHierarchicalGraphContent();

    return (
      <div>
        <Button handleRoute={this.openHomePage}>Back</Button>
        <H1>{this.props.params.id} - {this.props.loadingData ? '...' : this.props.module.name_de}</H1>
        <H3>Stats</H3>
        {statsContent}
        <H3>Dependency graph</H3>
        <div style={this.graphStyle}>
          {graphContent}
        </div>
        <H3>Hierarchical graph</H3>
        <div style={this.graphStyle}>
          {hierarchicalGraphContent}
        </div>
      </div>
    );
  }
}

ModuleDetail.propTypes = {
  changeRoute: React.PropTypes.func,
  loadingData: React.PropTypes.bool,
  loadingGraph: React.PropTypes.bool,
  loadingHierarchicalGraph: React.PropTypes.bool,
  params: React.PropTypes.shape({
    id: React.PropTypes.string.isRequired,
  }),
  load: React.PropTypes.func.isRequired,
  module: React.PropTypes.oneOfType([
    React.PropTypes.object,
    React.PropTypes.bool,
  ]).isRequired,
  graph: React.PropTypes.oneOfType([
    React.PropTypes.object,
    React.PropTypes.bool,
  ]).isRequired,
  hierarchicalGraph: React.PropTypes.oneOfType([
    React.PropTypes.object,
    React.PropTypes.bool,
  ]).isRequired,
};

function mapDispatchToProps(dispatch) {
  return {
    changeRoute: (url) => dispatch(push(url)),
    load: (uid) => dispatch(loadModule(uid)),

    dispatch,
  };
}

export default connect(createSelector(
  selectModule(),
  selectGraph(),
  selectHierarchicalGraph(),
  selectLoadingData(),
  selectLoadingGraph(),
  selectLoadingHierarchicalGraph(),
  selectError(),
  (
    module, 
    graph, 
    hierarchicalGraph, 
    loadingData, 
    loadingGraph, 
    loadingHierarchicalGraph, 
    error,
  ) => ({ 
    module, 
    graph, 
    hierarchicalGraph, 
    loadingData, 
    loadingGraph, 
    loadingHierarchicalGraph, 
    error, 
  })
), mapDispatchToProps)(ModuleDetail);
