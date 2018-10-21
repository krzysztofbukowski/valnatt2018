import * as React from 'react';
import * as styles from './SearchBox.scss';

export interface SearchBoxProps {
  placeholder: string;
}

export default (props: SearchBoxProps) => (
  <input type="text" className={styles.searchBox} placeholder={props.placeholder} />
);