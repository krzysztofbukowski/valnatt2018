import * as React from 'react';

export interface ErrorHandlerProps {
  error?: Error;
}

export default class ErrorHandler extends React.PureComponent<ErrorHandlerProps> {
  /**
   * render
   */
  public render() {
    if (this.props.error) {
      return (
        <div>
          <h1>Oops... there was some error with rendering the app</h1>
          <strong>{this.props.error.message}</strong>
          <pre>
            {this.props.error.stack}
          </pre>
        </div>
      );
    }

    return null;
  }
}