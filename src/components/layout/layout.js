import React, { Component } from 'react';
import { Router, Route, Switch } from 'react-router-dom';
import history from '../../history';

import Home from '../home/home';
import Header from '../headernavbar/header';
import Footer from '../footer/footer';
import Caballo from '../caballo/caballo';
import Cabecera from '../cabecera/cabecera';
import Actividad from '../actvidad/actividad';
import Editar from '../editar-crear/editar';
import Crear from '../editar-crear/crear';


class Layout extends Component {
  constructor() {
    super();

    this.state = {
      isLoggedIn: "LOGGED_IN"
    }

    this.handleSuccesfulLogin = this.handleSuccesfulLogin.bind(this);
    this.handleUnsuccesfulLogin = this.handleUnsuccesfulLogin.bind(this);
    this.handleSuccesfulLogout = this.handleSuccesfulLogout.bind(this);
  }

  handleSuccesfulLogin() {
    this.setState({
      loggedInStatus: "LOGGED_IN"
    });
  }

  handleUnsuccesfulLogin() {
    this.setState({
      loggedInStatus: "NOT_LOGGED_IN"
    });
  }

  handleSuccesfulLogout() {
    this.setState({
      loggedInStatus: "NOT_LOGGED_IN"
    });
  }

  authorizedPages() {
    return [
      <Route 
        path='/edit/:type/:id'
        key="0"
        component={Editar} 
      />,
      <Route 
        path='/create/:type'
        key="1"
        component={Crear} 
      />
    ];
  }

  render() {
    return (
        <div className="layout">
          <Router history={history}>
            <Header loggedInStatus={this.state.isLoggedIn}/> 

            <Switch>
                <Route path='/' exact component={Home} />
                <Route path='/caballos' component={Caballo} />
                <Route path='/cabeceras' component={Cabecera} />
                <Route path='/actividades' component={Actividad} />
                {this.state.isLoggedIn === "LOGGED_IN" ? this.authorizedPages() : null}
            </Switch>
          
            <Footer />  
          </Router>
        </div>
    );
  }
}

export default Layout;