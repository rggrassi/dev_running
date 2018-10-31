import React, { Component } from 'react';
import { Provider } from 'react-redux'; 
import { BrowserRouter as Router, Route } from 'react-router-dom';
import store from './redux';
import Home from './screens/Home';
import Admin from './screens/Admin';
import Restrito from './screens/Restrito';
import Login from './screens/Login';
import { Container } from 'semantic-ui-react';
import CreateAccount from './screens/CreateAccount';

class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <Router>
          <Container>
            <Route exact path='/' component={Home} />
            <Route path='/admin' component={Admin} />
            <Route path='/restrito' component={Restrito} />
            <Route path='/login' component={Login} />
            <Route path='/create-account' component={CreateAccount} />
          </Container>
        </Router>  
      </Provider>
    );
  }
}

export default App;