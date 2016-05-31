/**
 * RepoListItem
 *
 * Lists the name and the issue count of a repository
 */
/* eslint-disable react/prefer-stateless-function */

import React from 'react';
import {connect} from 'react-redux';
import {createSelector} from 'reselect';

import {selectCurrentUser} from 'containers/App/selectors';

import ListItem from 'components/ListItem';
import A from 'components/A';

import styles from './styles.css';

export class RepoListItem extends React.Component {
  render() {
    const item = this.props.item._fields[0].properties;
    console.log(item);

    // Put together the content of the repository
    const content = (
      <div className={styles.linkWrapper}>
        <A
          className={styles.linkRepo}
          href={'module/' + item.uid}>
          <div>{item.uid}</div>
          {item.name_de}
        </A>
      </div>
    );

    // Render the content into a list item
    return (
      <ListItem key={`repo-list-item-${item.name_de}`} item={content}/>
    );
  }
}

RepoListItem.propTypes = {
  item: React.PropTypes.object,
  currentUser: React.PropTypes.string,
};

export default connect(createSelector(
  selectCurrentUser(),
  (currentUser) => ({currentUser})
))(RepoListItem);
