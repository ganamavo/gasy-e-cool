import React from 'react';
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
