import {BrowserRouter, Route, Switch, Redirect} from 'react-router-dom'
import Home from "./screens/Home";

import "./assets/scss/styles.scss"
import 'react-toastify/dist/ReactToastify.css';


function App() {
  return (
    <BrowserRouter>
        <Switch>
            <Route path="/" exact render={ props => <Home {...props} /> } />
            <Redirect to="/" />
        </Switch>
    </BrowserRouter>
  );
}

export default App;
