import * as React from 'react';
import className from '../../utils/className';
import './messenger.scss';

export interface MessengerProps {
  message: string;
  isError: boolean;
}

const Messenger = (props: MessengerProps) => {
  const classNameString = className({
    'messenger': true,
    'messenger--error': props.isError
  });  

  return (
    <div className={classNameString}>{props.message}</div>
  );
};

export default Messenger;
