import * as React from 'react';

interface AppProps {
  name: string;
}

export default class App extends React.Component<AppProps, {}> {
  render() {
    return <div>Hello {this.props.name}</div>
  }
}