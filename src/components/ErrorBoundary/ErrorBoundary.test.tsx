import ErrorBoundary, { withErrorBoundary } from './ErrorBoundary';
import { mount } from 'enzyme';

describe(`${withErrorBoundary.name}`, () => {
  it(`should wrap component with ${ErrorBoundary.name}`, () => {
    const MockedComponent = () => 'test';

    const WithErrorBoundaryComponent = withErrorBoundary(MockedComponent, '')({test: 1});

    expect(mount(WithErrorBoundaryComponent).is(ErrorBoundary)).toBeTruthy();
  });
});