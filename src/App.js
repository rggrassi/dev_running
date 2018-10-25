import React, { Component } from 'react';
import { Provider } from 'react-redux'; 
import { BrowserRouter as Router, Route } from 'react-router-dom';
import store from './redux';
import Header from './Header';
import Home from './screens/Home';
import Admin from './screens/Admin';
import Restrito from './screens/Restrito';
import Login from './screens/Login';

class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <Router>
          <div>
            <Route exact path='/' component={Home} />
            <Route path='/admin' component={Admin} />
            <Route path='/restrito' component={Restrito} />
            <Route path='/login' component={Login} />
            <Header />
          </div>
        </Router>  
      </Provider>
    );
  }
}

export default App;