import * as React from 'react';
import Home from './components/Home';
import './App.scss';

interface AppProps {
  name: string;
}

export default class App extends React.Component<AppProps, {}> {
  render() {
    return <div className="App">React <Home/></div>;
  }
}