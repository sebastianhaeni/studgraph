/**
 * ModuleistItem
 *
 * Lists the name and the issue count of a module
 */
/* eslint-disable react/prefer-stateless-function */

import React from 'react';
import { connect } from 'react-redux';
import { createSelector } from 'reselect';

import { selectCurrentUser } from 'containers/App/selectors';

import ListItem from 'components/ListItem';
import A from 'components/A';

import styles from './styles.css';

export class ModuleListItem extends React.Component {

  render() {
    const item = this.props.item;
    const style = {
      display: 'inline-block',
      width: '100px',
      lineHeight: '47px',
    };
    // Put together the content of the module
    const content = (
      <div className={styles.linkWrapper}>
        <A onClick={() => this.props.handleClick(item.uid)}>
          <div>
            <span style={style}>{item.uid}</span>
            <span>{item.name_de}</span>
          </div>
        </A>
      </div>
    );

    // Render the content into a list item
    return (
      <ListItem key={`module-list-item-${item.name_de}`} item={content} />
    );
  }
}

ModuleListItem.propTypes = {
  item: React.PropTypes.object,
  currentUser: React.PropTypes.string,
  handleClick: React.PropTypes.func,
};

export default connect(createSelector(
  selectCurrentUser(),
  (currentUser) => ({ currentUser })
))(ModuleListItem);
