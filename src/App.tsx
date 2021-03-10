import React from 'react';
import { Switch, Route} from 'react-router-dom';
import { GlobalProvider } from './components/GlobalState';
import { HeaderComponent } from './components/header';
import { Home } from './pages/home';
import { CountryDetails } from './pages/countryDetails';
const App = () => {
  return (
    <GlobalProvider>
      <HeaderComponent />
      <Switch> 
        <Route exact path="/">
          <Home />
        </Route>
        <Route exact path="/:countryName">
            <CountryDetails />
        </Route>
      </Switch>
    </GlobalProvider>
  );
}

export default App;
