/*
 * HomePage
 *
 * This is the first thing users see of our App, at the '/' route
 */

import React from 'react';
import { connect } from 'react-redux';
import { push } from 'react-router-redux';

import { createSelector } from 'reselect';

import {
  selectModules,
  selectLoading,
  selectError,
} from 'containers/App/selectors';

import { selectName } from './selectors';
import { loadModules } from '../App/actions';
import { changeUsername } from './actions';

import RepoListItem from 'containers/RepoListItem';
import Button from 'components/Button';
import H1 from 'components/H1';
import H2 from 'components/H2';
import List from 'components/List';
import ListItem from 'components/ListItem';
import LoadingIndicator from 'components/LoadingIndicator';

import styles from './styles.css';

export class HomePage extends React.Component {
  /**
   * Changes the route
   *
   * @param  {string} route The route we want to go to
   */
  openRoute = (route) => {
    this.props.changeRoute(route);
  };

  /**
   * Changed route to '/module/{uid}'
   */
  openModulePage = (uid) => {
    console.log(uid);
    this.openRoute(`/module/${uid}`);
  };

  /**
   * Changed route to '/features'
   */
  openFeaturesPage = () => {
    this.openRoute('/features');
  };

  render() {
    let mainContent = null;

    // Show a loading indicator when we're loading
    if (this.props.loading) {
      mainContent = (<List component={LoadingIndicator} />);

      // Show an error if there is one
    } else if (this.props.error !== false) {
      const ErrorComponent = () => (
        <ListItem item={'Something went wrong, please try again!'} />
      );
      mainContent = (<List component={ErrorComponent} />);

      // If we're not loading, don't have an error and there are modules, show the modules
    } else if (this.props.modules !== false) {
      mainContent = (<List items={this.props.modules} handleClick={this.openModulePage} component={RepoListItem} />);
    }

    return (
      <article>
        <div>
          <section className={`${styles.textSection} ${styles.centered}`}>
            <H1>StudGraph</H1>
            <p>A highly scalable, graph-first tool with the best UX and a focus on performance and best practices</p>
          </section>
          <section className={styles.textSection}>
            <H2>Try me!</H2>
            <form className={styles.usernameForm}>
              <label htmlFor="username">Search for modules:
                <input
                  id="username"
                  className={styles.input}
                  type="text"
                  placeholder="Semantic Web"
                  value={this.props.username}
                  onChange={this.props.onChangeUsername}
                  autoComplete="off"
                  autoFocus
                />
              </label>
            </form>
            {mainContent}
          </section>
          <Button handleRoute={this.openFeaturesPage}>Features</Button>
        </div>
      </article>
    );
  }
}

HomePage.propTypes = {
  changeRoute: React.PropTypes.func,
  loading: React.PropTypes.bool,
  error: React.PropTypes.oneOfType([
    React.PropTypes.object,
    React.PropTypes.bool,
  ]),
  modules: React.PropTypes.oneOfType([
    React.PropTypes.array,
    React.PropTypes.bool,
  ]),
  onSubmitForm: React.PropTypes.func,
  username: React.PropTypes.string,
  onChangeUsername: React.PropTypes.func,
};

function mapDispatchToProps(dispatch) {
  return {
    changeRoute: (url) => dispatch(push(url)),
    onChangeUsername: (evt) => {
      evt.preventDefault();
      dispatch(changeUsername(evt.target.value));
      dispatch(loadModules());
    },

    dispatch,
  };
}

// Wrap the component to inject dispatch and state into it
export default connect(createSelector(
  selectModules(),
  selectName(),
  selectLoading(),
  selectError(),
  (modules, username, loading, error) => ({ modules, username, loading, error })
), mapDispatchToProps)(HomePage);
