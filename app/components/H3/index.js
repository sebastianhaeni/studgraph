import React from 'react';

import styles from './styles.css';

function H3(props) {
  return (
    <h3 className={styles.heading3} { ...props } />
  );
}

export default H3;
