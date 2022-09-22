import React from 'react';
import Welcome from './pages/Welcome';
import Login from './pages/Login';
import Authorize from './src/Authorize';
import Home from './src/Home';
import parseRoute from './lib/parse-route';

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isAuthorizing: true,
      route: parseRoute(window.location.hash),
      credentials: null
    };
    this.setAuth = this.setAuth.bind(this);
  }

  setAuth(credentials) {
    this.setState({ credentials, isAuthorizing: false });
    if (this.state.route.path === 'auth') {
      window.location.hash = '';
    }
  }

  componentDidMount() {
    window.addEventListener('hashchange', () => {
      this.setState({
        route: parseRoute(window.location.hash)
      });
    });

  }

  renderPage() {
    const { route } = this.state;
    if (route.path === '') {
      return <Welcome credentials={this.state.credentials}/>;
    }
    if (route.path === 'login') {
      return <Login credentials={this.state.credentials}/>;
    }
    if (route.path === 'home') {
      return <Home credentials={this.state.credentials}/>;
    }
  }

  render() {
    if (this.state.isAuthorizing) {
      return <Authorize params={this.state.route.params} onAuthorized={this.setAuth} />;
    }

    return this.renderPage();
  }
}
