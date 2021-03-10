// import React, { Component } from "react";
import { Navbar, Nav, NavDropdown, /*Toast, Button*/ } from "react-bootstrap";
import { Link, useHistory } from "react-router-dom";
import blackLogo from "./caixabank.png"
import swal from 'sweetalert'
import { withRouter } from 'react-router-dom'
import whiteLogo from './logo.png'

import AuthService from "../../../services/auth.service";
// import ServiceService from "../../../services/services.service";
import UserService from '../../../services/users.service'

import "./Navbar.css";
const Navigation = (props) => {

    const authService = new AuthService();
    const userService = new UserService();
    const history = useHistory()


    const logOut = () => {
        authService
            .logout()
            .then((res) => {
                props.storeUser(undefined)
                history.push('/')
            })
            .catch((err) => console.log(err));
    }

    const redirectToCreateService = () => {
        localStorage.setItem('ruta', '/crear-servicio')
    }

    const deleteTheUser = () => {
        userService
            .deleteUser(props.loggedUser._id)
            .then((res) => {
                props.storeUser(undefined)
                history.push("/")
            })
            .catch((err) => console.log(err))
    }

    const confirmDelete = () => {
        swal({
            title: "Mensaje de confirmación",
            text: "¿Estás segur@ de que quieres eliminar tu perfil?",
            icon: "warning",
            buttons: ["No", "Sí"]
        })
            .then(answer => {

                if (answer) {
                    deleteTheUser()
                    swal({
                        text: "El usuario se ha eliminado con éxito",
                        icon: "success"
                    })
                }
            })
    }

    return (
        <Navbar variant={props.location.pathname !== "/" ? "light" : "dark"} expand="md" /*sticky="top"*/ className={props.location.pathname !== "/" ? "second-nav" : "nav-menu navbar-item"} >
            <Link to="/">
                <Navbar.Brand>
                    <img
                        alt="Logotipo"
                        src={props.location.pathname !== "/" ? whiteLogo : blackLogo}
                        className={props.location.pathname !== "/" ? 'black-img' : 'white-img'}
                    />
                </Navbar.Brand>
            </Link>
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav">
                <Nav className="ml-auto">
                    <Link style={{ textDecoration: 'none' }} to="/servicios">
                        <Nav.Link className="navbar-item" as="div" style={{ color: props.location.pathname !== "/" ? 'black' : 'white' }}>Inicio</Nav.Link>
                    </Link>
                    {/* <Link style={{ textDecoration: 'none' }} to="/servicios">
                        <Nav.Link className="navbar-item" as="div">Servicios</Nav.Link>
                    </Link> */}
                    <NavDropdown className="navbar-item" title={<span style={{ color: props.location.pathname !== "/" ? 'black' : 'white' }}>¿Qué necesita?</span>} id="collasible-nav-dropdown" >
                        <NavDropdown.Item className="navbar-button" style={{ backgroundColor: 'white', color: props.location.pathname !== "/" ? 'black': 'white' }}>
                            {props.loggedUser ?
                                <Link to="/crear-servicio" style={{ textDecoration: "none", color: "black" }}>
                                    Pedir ayuda
                                </Link>
                                :
                                <Link to="/iniciar-sesion" onClick={() => redirectToCreateService()} style={{ textDecoration: "none", color: "black" }}>
                                    Pedir ayuda
                                </Link>
                            }
                        </NavDropdown.Item>
                        <NavDropdown.Item style={{ backgroundColor: 'white' }}>
                            <Link to="/servicios" style={{ textDecoration: "none", color: "black" }}>
                                Vengo a ayudar
                                </Link>
                        </NavDropdown.Item>
                    </NavDropdown>
                    {props.loggedUser ? (
                        <NavDropdown alignRight title={<span style={{ color: props.location.pathname !== "/" ? 'black' : 'white' }}>Hola, {props.loggedUser.username}</span>} id="collasible-nav-dropdown">
                            <NavDropdown.Item style={{ backgroundColor: 'white' }} >
                                <Link to="/mis-servicios" style={{ textDecoration: "none", color: "black", outline: 'none' }}>
                                    Mis publicaciones
                                </Link>
                            </NavDropdown.Item>
                            <NavDropdown.Item style={{ backgroundColor: 'white' }} >
                                <Link to="/editar-perfil" style={{ textDecoration: "none", color: "black" }}>
                                    Editar perfil
                                </Link>
                            </NavDropdown.Item>
                            <Link className="navbar-item" to="/" style={{ textDecoration: "none" }}>
                                <NavDropdown.Item
                                    style={{ backgroundColor: 'white' }}
                                    className="nav-dropdown"
                                    onClick={logOut}
                                >
                                    Cerrar sesión
                        </NavDropdown.Item>
                            </Link>
                            <NavDropdown.Divider />
                            <NavDropdown.Item
                                className="nav-dropdown"
                                onClick={confirmDelete}
                                style={{ textDecoration: "none", backgroundColor: 'white' }}
                            >
                                Eliminar perfil
                        </NavDropdown.Item>
                        </NavDropdown>
                    ) : (
                            <>
                                <Link style={{ textDecoration: 'none' }} to="/registro">
                                    <Nav.Link className="navbar-item" as="div" style={{ color: props.location.pathname !== "/" ? 'black' : 'white' }}>Registro</Nav.Link>
                                </Link>
                                <Link style={{ textDecoration: 'none' }} className="text-nowrap" to="/iniciar-sesion">
                                    <Nav.Link className="navbar-item navbar-button" as="div" style={{ color: props.location.pathname !== "/" ? 'black' : 'white' }}>Iniciar sesión</Nav.Link>
                                </Link>

                            </>
                        )}
                </Nav>
            </Navbar.Collapse>
        </Navbar>
    );
}


export default withRouter(Navigation);

