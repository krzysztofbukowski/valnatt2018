import * as React from 'react';

import { ReactElement } from 'react';

export interface ErrorBoundaryProps {
  fallbackUI: ReactElement<{}> | '';
}

export default class ErrorBoundary extends React.Component<ErrorBoundaryProps> {
  state = {
    hasError: true
  };

  componentDidCatch(error: Error, info: React.ErrorInfo) {
    this.setState({ hasError: true });
  }

  render() {
    if (this.state.hasError) {
      return this.props.fallbackUI;
    }

    return this.props.children;
  }
}

export const withErrorBoundary = (WrappedComponent, FallbackUI: React.ReactElement<{}> | '') =>
  (props): ReactElement<{}> => (
    <ErrorBoundary fallbackUI={FallbackUI}>
      <WrappedComponent {...props} />
    </ErrorBoundary>
  );
