import React from 'react';
import {BrowserRouter as Router, Switch} from 'react-router-dom';
import { GlobalProvider } from './components/GlobalState';
import { Home } from './pages/home';
 
const App = () => {
  return (
    <GlobalProvider>
      <div className="App">
        <Home />
      </div>
    </GlobalProvider>
  );
}

export default App;
