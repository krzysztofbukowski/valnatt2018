import * as React from 'react';
import * as ReactDOM from 'react-dom';

import className from '../../utils/className';
import * as styles from './messenger.scss';

export interface MessengerProps {
  message: string;
  isError: boolean;
}

export default class Messenger extends React.Component<MessengerProps, {}> {
  private container: HTMLDivElement;

  constructor(props: MessengerProps) {
    super(props);
    
    this.container = document.createElement('div');
  }

  componentDidMount() {
    document.body.appendChild(this.container);
  }

  public render() {
    const classNameString = className({
      [styles.messenger]: true,
      [styles.messengerError]: this.props.isError
    });

    return ReactDOM.createPortal(
      <div className={classNameString}>{this.props.message}</div>,
      this.container
    );
  }
}