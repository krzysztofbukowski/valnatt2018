import * as React from 'react';

import './Button.scss';

export interface ButtonProps {
  label: string;
  onClick?: () => void;
}

export default (props: ButtonProps) => {
  return (
    <button className="button" onClick={props.onClick}>{props.label}</button>
  );
};