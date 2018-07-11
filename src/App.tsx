import * as React from 'react';
import Home from './components/Home';

interface AppProps {
  name: string;
}

export default class App extends React.Component<AppProps, {}> {
  render() {
    return <div>Hello <Home/></div>;
  }
}