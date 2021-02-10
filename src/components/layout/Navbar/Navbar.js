// import React, { Component } from "react";
import { Navbar, Nav, NavDropdown, /*Toast, Button*/ } from "react-bootstrap";
import { Link, useHistory } from "react-router-dom";
import logo from "./caixabank.png"
import swal from 'sweetalert'
import { withRouter } from 'react-router-dom'

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
        <Navbar variant="dark" expand="md" /*sticky="top"*/ className={props.location.pathname !== "/" ? "second-nav" : "nav-menu"} >
            <Link to="/">
                <Navbar.Brand>
                    <img
                        alt="Logotipo"
                        src={logo}
                        className="d-inline-block align-top nav-img"
                    />{" "}
                </Navbar.Brand>
            </Link>
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav">
                <Nav className="ml-auto">
                    <Link style={{ textDecoration: 'none' }} to="/">
                        <Nav.Link className="navbar-item" as="div">Inicio</Nav.Link>
                    </Link>
                    <Link style={{ textDecoration: 'none' }} to="/servicios">
                        <Nav.Link className="navbar-item" as="div">Servicios</Nav.Link>
                    </Link>
                    {props.loggedUser ? (
                        <NavDropdown title={`Hola, ${props.loggedUser.username}`} id="collasible-nav-dropdown">
                            <NavDropdown.Item>
                                <Link to="/editar-perfil" style={{ textDecoration: "none", color: "black" }}>
                                    Editar perfil
                    </Link>
                            </NavDropdown.Item>
                            <Link className="navbar-item" to="/" style={{ textDecoration: "none" }}>
                                <NavDropdown.Item
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
                                style={{ textDecoration: "none" }}
                            >
                                Eliminar perfil
                </NavDropdown.Item>
                        </NavDropdown>
                    ) : (
                            <>
                                <Link style={{ textDecoration: 'none' }} to="/registro">
                                    <Nav.Link className="navbar-item" as="div">Registro</Nav.Link>
                                </Link>
                                <Link style={{ textDecoration: 'none' }} className="text-nowrap" to="/iniciar-sesion">
                                    <Nav.Link className="navbar-item" as="div">Iniciar sesión</Nav.Link>
                                </Link>

                            </>
                        )}
                </Nav>
            </Navbar.Collapse>
        </Navbar>
    );
}


export default withRouter(Navigation);

