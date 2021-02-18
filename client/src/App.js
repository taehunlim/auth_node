import {BrowserRouter, Route, Switch, Redirect} from 'react-router-dom'

import Home from "./screens/Home";
import Writing from "./screens/Writing";

import "./assets/scss/styles.scss";
import 'react-toastify/dist/ReactToastify.css';

import {Provider} from 'react-redux';
import store from './store';
import {persistStore} from 'redux-persist';
import {PersistGate} from 'redux-persist/integration/react';

const persist = persistStore(store)

function App() {
  return (
      <Provider store={store}>
          <PersistGate loading={null} persistor={persist}>
              <BrowserRouter>
                  <Switch>
                      <Route path="/" exact render={ props => <Home {...props} /> } />
                      <Route path="/write" render={ props => <Writing {...props} /> } />
                      <Redirect to="/" />
                  </Switch>
              </BrowserRouter>
          </PersistGate>
      </Provider>
  );
}

export default App;
