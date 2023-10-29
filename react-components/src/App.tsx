import { Component, ReactNode } from 'react';
import './App.css';
import { Header } from './components/Header';

class App extends Component {
  render(): ReactNode {
    return (
      <>
        <Header />
      </>
    );
  }
}

export default App;
