import * as React from 'react';

import * as styles from './Button.scss';

export interface ButtonProps {
  label: string;
  onClick?: () => void;
}

export default (props: ButtonProps) => {
  return (
    <button className={styles.button} onClick={props.onClick}>{props.label}</button>
  );
};