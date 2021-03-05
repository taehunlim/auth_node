import {BrowserRouter, Route, Switch, Redirect} from 'react-router-dom'

import Home from "./screens/Home";
import Verification from "./screens/Verification";
import Writing from "./screens/Writing";
import PostDetail from "./screens/PostDetail";
import Editing from "./screens/Editing";

import "./assets/scss/styles.scss";
import 'react-toastify/dist/ReactToastify.css';

import jwt_decoded from 'jwt-decode';
import {setCurrentUser, loginUser} from "./actions/authActions";

import {Provider} from 'react-redux';
import store from './store';
import {persistStore} from 'redux-persist';
import {PersistGate} from 'redux-persist/integration/react';

const persist = persistStore(store)

if(localStorage.jwtToken) {

    const decoded = jwt_decoded(localStorage.jwtToken)
    store.dispatch(setCurrentUser(decoded))

    const currentTime = Date.now() / 1000;
    if(decoded.exp < currentTime) {
        store.dispatch(loginUser());
        localStorage.jwtToken = ""
    }
}

function App() {
  return (
      <Provider store={store}>
          <PersistGate loading={null} persistor={persist}>
              <BrowserRouter>
                  <Switch>
                      <Route path="/" exact render={ props => <Home {...props} /> } />
                      <Route path="/account/verify-email/:token" render={ props => <Verification {...props} /> } />
                      <Route path="/write" render={ props => <Writing {...props} /> } />
                      <Route path="/post/:id" render={ props => <PostDetail {...props} /> } />
                      <Route path="/edit/:id" exact render={ props => <Editing {...props} /> } />
                      <Redirect to="/" />
                  </Switch>
              </BrowserRouter>
          </PersistGate>
      </Provider>
  );
}

export default App;
