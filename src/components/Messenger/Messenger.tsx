import * as React from 'react';
import * as ReactDOM from 'react-dom';

import className from '../../utils/className';
import * as styles from './messenger.scss';
import { connect } from 'react-redux';
import AppState, { MessageState } from '../../state';

export interface MessengerProps {
  message?: MessageState;
  isError?: boolean;
}

export class Messenger extends React.Component<MessengerProps, {}> {
  private container: HTMLDivElement;

  constructor(props: MessengerProps) {
    super(props);
    
    this.container = document.createElement('div');
  }

  componentDidMount() {
    document.body.appendChild(this.container);
  }

  public render() {
    if (!this.props.message) {
      return null;
    }

    const classNameString = className({
      [styles.messenger]: true,
      [styles.messengerError]: this.props.message.isError
    });

    return ReactDOM.createPortal(
      <div className={classNameString}>{this.props.message.content}</div>,
      this.container
    );
  }
}

const mapStateToProps = (state: AppState): MessengerProps => ({
  message: state.message
});

export default connect(mapStateToProps)(Messenger);