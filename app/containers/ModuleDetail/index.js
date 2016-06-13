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
  selectLoading,
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
    if (params.nodes.length <= 0) {
      return;
    }

    const uid = params.nodes[0];
    this.openRoute(`/module/${uid}`);
  };

  openHomePage = () => {
    this.openRoute('/');
  };

  render() {
    this.moduleProps = [];

    let statsContent = null;
    let graphContent = null;
    let hierarchicalGraphContent = null;

    if (this.props.loading) {
      statsContent = (<LoadingIndicator />);
      graphContent = statsContent;
      hierarchicalGraphContent = statsContent;
    } else {
      Object.keys(this.props.module).forEach((key) => {
        const prop = this.props.module[key];
        this.moduleProps.push(
          <tr key={key}>
            <td style={this.firstCellStyle}>{ModuleDetail.mapToLabel(key)}</td>
            <td>{prop}</td>
          </tr>
        );
      });
      statsContent = (
        <table>
          <tbody>
          {this.moduleProps}
          </tbody>
        </table>
      );
      graphContent = (<Neo4jGraph graph={this.props.graph} handleDoubleClick={this.handleDoubleClick} />);
      hierarchicalGraphContent = (<Neo4jGraph graph={this.props.hierarchicalGraph} />);
    }

    return (
      <div>
        <Button handleRoute={this.openHomePage}>Back</Button>
        <H1>{this.props.params.id} - {this.props.loading ? '...' : this.props.module.name_de}</H1>
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
  loading: React.PropTypes.bool,
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
  selectLoading(),
  selectError(),
  (module, graph, hierarchicalGraph, loading, error) => ({ module, graph, hierarchicalGraph, loading, error })
), mapDispatchToProps)(ModuleDetail);
