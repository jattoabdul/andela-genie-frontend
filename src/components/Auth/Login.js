import React, { Component } from 'react';
import andela_logo from '../../assets/andela-logo.png';
import google_btn from '../../assets/google-btn.svg';
import './Login.scss';

class Login extends Component {

  componentWillMount = () => {
    const { location } = window;
    window.localStorage.removeItem('jwtToken_genie');
    if (location.href.includes('token')) {
      const token  = location.search.split('=')[1];

      if (!token) {
        return this.props.history.push('/');
      }
      else {
        const token_fire = (async() => {
          await window.localStorage.setItem('jwtToken_genie', token);
          return window.localStorage.getItem('jwtToken_genie');
        })();
        token_fire.then(tokenConfirmed => {
          if (tokenConfirmed) {
            return this.props.history.push('/dashboard');
          }
        });
      }
    }
    return this.props.history.push('/');
  }

  render() {
    return (
      <div className="Auth">
        <div className="login-screen">
          <div className="left-item">
            <div className="login-panel">
              <div className="inner-login-panel">
                <div className="login-content-panel">
                  <img src={andela_logo} className="App-logo" alt="logo" />
                  <h1>Andela Genie</h1>
                  <p>Sign in to access your account.</p>
                </div>
                <a className="google-btn-panel" href="https://api-prod.andela.com/login?redirect_url=https://andela-genie-frontend.herokuapp.com/">
                  <img src={google_btn} className="Andela-App-logo" alt="andela-logo" />
                </a>
              </div>
            </div>
          </div>

          <div className="right-item">
            <div className="slider-panel">
              <div className="inner-slider-panel">
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Login;
