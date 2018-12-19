import * as React from 'react';
import ErrorBoundary, { withErrorBoundary } from './ErrorBoundary';
import { mount } from 'enzyme';
import { Fragment } from 'react';

describe(`${withErrorBoundary.name}`, () => {
  it(`should wrap component with ${ErrorBoundary.name}`, () => {
    const MockedComponent = () => 'test';
    const FallbackUIComponent = () => <div></div>;

    const WithErrorBoundaryComponent = withErrorBoundary(MockedComponent, FallbackUIComponent)({test: 1});

    expect(mount(WithErrorBoundaryComponent).is(ErrorBoundary)).toBeTruthy();
  });
});