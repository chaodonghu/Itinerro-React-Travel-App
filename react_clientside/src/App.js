import React, { Component } from 'react';
import {AppContainer} from 'react-hot-loader';
import {composeWithDevTools} from 'redux-devtools-extension';
import { BrowserRouter as Router, Route, Link, Switch, Redirect } from 'react-router-dom';
import {createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import { Provider } from 'react-redux';
import logger from 'redux-logger'
import rootReducer from './reducers/rootReducer';
import { IndexRoute, browserhistory } from 'react-router';
import setAuthorizationToken from '../utils/setAuthorizationToken';
import jwtDecode from 'jwt-decode';
import { setCurrentUser } from './actions/authActions';
import requireAuth from '../utils/requireAuth';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';

// Import Components
import Home from './components/Home';
import Nav from './components/Nav';
import CreateTrip from './components/CreateTrip';
import SignupPage from './components/SignupPage';
import LoginPage from './components/LoginPage';
import RealDashboard from './components/real_dashboard';
import FlashMessagesList from './components/flash/FlashMessagesList';
import Single from './components/Single';


const store = createStore(
  rootReducer,
  compose(
    applyMiddleware(thunk),
    applyMiddleware(logger),
    window.devToolsExtension ? window.devToolsExtension() : f => f
  )
);

if (localStorage.jwtToken) {
  setAuthorizationToken(localStorage.jwtToken);
  store.dispatch(setCurrentUser(jwtDecode(localStorage.jwtToken)));
}


export default class App extends React.Component {
  render() {
    return (
      <AppContainer>
        <Provider store={store} >
          <Router history={history}>
            <MuiThemeProvider>
            <div>

            <FlashMessagesList />
            <Nav />
              <Route exact path='/' component={Home}/>
              <Route path="/view/:postId" component={Single}/>
              <Route path='/signup' component={SignupPage} />
              <Route path='/login' component={LoginPage} />
              <Route path='/create-trip' component={requireAuth(CreateTrip)}/>
              <Route path='/real-dashboard' component={requireAuth(RealDashboard)} />

            </div>
            </MuiThemeProvider>
          </Router>
        </Provider>
      </AppContainer>

    );
  }
}
