import * as React from 'react';
import './SearchBox.scss';

export interface SearchBoxProps {
  placeholder: string;
}

export default (props: SearchBoxProps) => (
  <input type="text" className="search-box" placeholder={props.placeholder} />
);