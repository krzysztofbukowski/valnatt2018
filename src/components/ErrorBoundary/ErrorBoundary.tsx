import * as React from 'react';

import { ReactElement } from 'react';

export interface ErrorBoundaryProps {
  fallbackUI: React.ReactElement<{}>;
}

interface ErrorBoundaryState {
  hasError: boolean;
  error: Error;
}

export default class ErrorBoundary extends React.Component<ErrorBoundaryProps, ErrorBoundaryState> {
  state = {
    hasError: false,
    error: {} as Error
  };

  componentDidCatch(error: Error, info: React.ErrorInfo) {
    this.setState({ 
      hasError: true,
      error
    });
  }

  render() {
    if (this.state.hasError) {
      const Component = this.props.fallbackUI.type;
      const props = {
        ...this.props.fallbackUI.props,
        error: this.state.error
      };

      return <Component {...props}/>;
    }

    return this.props.children;
  }
}

export const withErrorBoundary = (WrappedComponent, FallbackUI: any) =>
  (props): ReactElement<{}> => (
    <ErrorBoundary fallbackUI={FallbackUI}>
      <WrappedComponent {...props} />
    </ErrorBoundary>
  );
