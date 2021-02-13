import 'bootstrap/dist/css/bootstrap.min.css'
import React, { Component } from 'react'
import ServicesList from './pages/Services-list/Services-list'
import ServiceDetails from './pages/Service-details/Service-details'
import Home from './pages/index/Home'
import Signup from './pages/Signup/Signup'
import Login from './pages/Login/Login'
import Navigation from './layout/Navbar/Navbar'
import UserDetails from './pages/User-details/User-details'
import EditForm from './pages/Profile/Edit-user/Edit-profile'
import OwnedServices from './pages/Profile/Owned-services/Owned-services'
import { Switch, Route, Redirect } from 'react-router-dom'
import AuthServices from './../services/auth.service'

import './App.css'

class App extends Component {

  constructor(props) {
    super(props)
    this.state = { loggedInUser: undefined }
    this.authServices = new AuthServices()
  }

  componentDidMount = () => {

    this.authServices   // comprobar si el usuario tenia sesion iniciada de antes
      .isLoggedIn()
      .then(response => this.setTheUser(response.data))
      .catch(err => this.setTheUser(undefined))
  }


  setTheUser = user => this.setState({ loggedInUser: user }, () => console.log('El nuevo estado de App es:', this.state))

  render() {
    return (
      <>
        {this.state.loggedInUser ? <Navigation {...this.props} loggedUser={this.state.loggedInUser} storeUser={this.setTheUser} location={this.pathname}/> : <Navigation />}

        <Switch>

          <Route path="/" exact render={() => <Home />} />
          <Route path="/servicios" exact render={() => <ServicesList loggedUser={this.state.loggedInUser} />} />
          <Route path="/servicios/:service_id" render={props => <ServiceDetails {...props} loggedUser={this.state.loggedInUser} />} />
          <Route path="/registro" render={props => <Signup storeUser={this.setTheUser} {...props} />} />
          <Route path="/iniciar-sesion" render={props => <Login storeUser={this.setTheUser} {...props} />} />
          <Route path="/usuarios/:user_id" render={props => <UserDetails {...props} loggedUser={this.state.loggedInUser} />} />
          <Route path="/editar-perfil" render={props => this.state.loggedInUser ? <EditForm {...props} storeUser={this.setTheUser} user={this.state.loggedInUser} /> : <Redirect to="/iniciar-sesion" />} />
          <Route path="/mis-servicios" render={props => this.state.loggedInUser ? <OwnedServices loggedUser={this.state.loggedInUser} {...props} /> : <Redirect to="/inicio-sesion" />} />
        </Switch>
      </>
    )
  }
}

export default App;
