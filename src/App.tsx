import * as React from 'react';
import Home from './components/Home';
import * as styles from './App.scss';

interface AppProps {
  name: string;
}

export default class App extends React.Component<AppProps, {}> {
  render() {
    return <div className={styles.app}><Home /></div>;
  }
}