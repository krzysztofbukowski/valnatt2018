import * as React from 'react';
import className from '../../utils/className';
import * as styles from './messenger.scss';

export interface MessengerProps {
  message: string;
  isError: boolean;
}

const Messenger = (props: MessengerProps) => {
  const classNameString = className({
    [styles.messenger]: true,
    [styles.messengerError]: props.isError
  });  

  return (
    <div className={classNameString}>{props.message}</div>
  );
};

export default Messenger;
