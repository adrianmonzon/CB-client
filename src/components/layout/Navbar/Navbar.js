// import React, { Component } from "react";
import { Navbar, Nav, NavDropdown, /*Toast, Button*/ } from "react-bootstrap";
import { Link, useHistory } from "react-router-dom";
import blackLogo from "./caixabank.png"
import swal from 'sweetalert'
import { withRouter } from 'react-router-dom'
import { useState } from 'react'
import whiteLogo from './logo.png'

import AuthService from "../../../services/auth.service";
// import ServiceService from "../../../services/services.service";
import UserService from '../../../services/users.service'

import "./Navbar.css";
const Navigation = (props) => {

    const authService = new AuthService();
    const userService = new UserService();
    const history = useHistory()

    const [show1, setShow1] = useState(false);
    const [show2, setShow2] = useState(false);

    const showDropdown1 = (e) => {
        setShow1(!show1);
    }
    const showDropdown2 = (e) => {
        setShow2(!show2);
    }
    const hideDropdown1 = e => {
        setShow1(false);
    }
    const hideDropdown2 = e => {
        setShow2(false);
    }

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
        <Navbar variant={props.location.pathname !== "/" ? "light" : "dark"} expand="md" /*sticky="top"*/ className={props.location.pathname !== "/" ? "second-nav" : "nav-menu"} >
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
            <Navbar.Collapse id="basic-navbar-nav" >
                <Nav className="ml-auto" >
                    <Link to="/servicios" className="navbar-button">
                        <Nav.Link as="a" style={{ color: props.location.pathname !== "/" ? 'black' : 'white' }}>Inicio</Nav.Link>
                    </Link>
                    <NavDropdown show={show1} onMouseEnter={showDropdown1} onMouseLeave={hideDropdown1} title={<span style={{ color: props.location.pathname !== "/" ? 'black' : 'white' }}>¿Qué necesita?</span>} id="collasible-nav-dropdown" >
                        <NavDropdown.Item className={props.location.pathname !== '/' && 'white-item'} style={{ color: props.location.pathname !== "/" ? 'white' : 'black' }}>
                            {props.loggedUser ?
                                <Link to="/crear-servicio" style={{ color: props.location.pathname !== '/' ? "black" : 'white' }}>
                                    Pedir ayuda
                                </Link>
                                :
                                <Link to="/iniciar-sesion" onClick={() => redirectToCreateService()} style={{ color: props.location.pathname === '/' ? "white" : 'black' }}>
                                    Pedir ayuda
                                </Link>
                            }
                        </NavDropdown.Item>
                        <NavDropdown.Item className={props.location.pathname !== '/' && 'white-item'}>
                            <Link to="/servicios" style={{ color: props.location.pathname === '/' ? "white" : 'black' }} className="item-dropdown">
                                Vengo a ayudar
                                </Link>
                        </NavDropdown.Item>
                    </NavDropdown>
                    {props.loggedUser ? (
                        <NavDropdown alignRight show={show2} onMouseEnter={showDropdown2} onMouseLeave={hideDropdown2} title={<span style={{ color: props.location.pathname !== "/" ? 'black' : 'white' }}>Hola, {props.loggedUser.username}</span>} id="collasible-nav-dropdown">
                            <NavDropdown.Item className={props.location.pathname !== '/' && 'white-item'} >
                                <Link to="/mis-servicios" style={{ color: props.location.pathname === '/' ? "white" : 'black' }}/*style={{ color: "black", outline: 'none' }}*/>
                                    Mis publicaciones
                                </Link>
                            </NavDropdown.Item>
                            <NavDropdown.Item className={props.location.pathname !== '/' && 'white-item'}  /* style={{ backgroundColor: 'white' }}para que al pulsar se quede el color de fondo blanco, no azul*/ >
                                <Link to="/editar-perfil" style={{ color: props.location.pathname === '/' ? "white" : 'black' }}>
                                    Editar perfil
                                </Link>
                            </NavDropdown.Item>
                            <NavDropdown.Item className={props.location.pathname !== '/' && 'white-item'}  onClick={logOut} style={{ color: props.location.pathname === '/' ? "white" : 'black' }}>
                                <Link to="/" style={{ color: props.location.pathname === '/' ? "white" : 'black' }}>
                                    Cerrar sesión
                                </Link>
                            </NavDropdown.Item>
                            {/* <NavDropdown.Divider /> */}
                            <NavDropdown.Item
                                className={props.location.pathname !== '/' && 'white-item'}
                                onClick={confirmDelete}
                                style={{ color: props.location.pathname === '/' ? "white" : 'black' }}
                            >
                                <Link style={{ color: props.location.pathname === '/' ? "white" : 'black' }}>
                                    Eliminar perfil
                                </Link>
                            </NavDropdown.Item>
                        </NavDropdown>
                    ) : (
                        <>
                            <Link to="/registro" className="navbar-button">
                                <Nav.Link as="a" style={{ color: props.location.pathname !== "/" ? 'black' : 'white' }}>Registro</Nav.Link>
                            </Link>
                            <Link className="navbar-button" to="/iniciar-sesion">
                                <Nav.Link as="a" style={{ color: props.location.pathname !== "/" ? 'black' : 'white' }}>Iniciar sesión</Nav.Link>
                            </Link>

                        </>
                    )}
                </Nav>
            </Navbar.Collapse>
        </Navbar>
    );
}


export default withRouter(Navigation);

