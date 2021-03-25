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
import CreateService from './pages/Service-form/New-service'
import OwnedServices from './pages/Profile/Owned-services/Owned-services'
import EditService from './pages/Profile/Edit-service/Edit-service'
import { Switch, Route, Redirect } from 'react-router-dom'
import AuthServices from './../services/auth.service'
import FooterPagePro from './layout/Footer/Footer';


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
          <Route path="/crear-servicio" render={props => <CreateService {...props} loggedUser={this.state.loggedInUser} />} />
          <Route path="/registro" render={props => <Signup storeUser={this.setTheUser} {...props} />} />
          <Route path="/iniciar-sesion" render={props => <Login storeUser={this.setTheUser} {...props} loggedUser={this.state.loggedInUser}/>} />
          <Route path="/usuarios/:user_id" render={props => <UserDetails {...props} loggedUser={this.state.loggedInUser} />} />
          <Route path="/editar-perfil" render={props => this.state.loggedInUser ? <EditForm {...props} storeUser={this.setTheUser} user={this.state.loggedInUser} /> : <Redirect to="/editar-perfil" />} />
          <Route path="/mis-servicios" render={props => this.state.loggedInUser ? <OwnedServices loggedUser={this.state.loggedInUser} {...props} /> : <Redirect to="/mis-servicios" />} />
          <Route path="/editar-servicio/:service_id" render={props => this.state.loggedInUser ? <EditService loggedUser={this.state.loggedInUser} {...props} /> : <Redirect to="/editar-servicio/:service_id" />} />
        
        </Switch>
        <FooterPagePro location={this.pathname}/>
      </>
    )
  }
}

export default App;
