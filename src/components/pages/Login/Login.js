import React, { Component } from 'react'
import AuthService from '../../../services/auth.service'
import './Login.css'

import { Container, Row, Col, Form, Button, Spinner } from 'react-bootstrap'
import { Link } from 'react-router-dom'

class Login extends Component {

    constructor() {
        super()
        this.state = {
            username: '',
            password: '',
            credentialsError: ''
        }
        this.authService = new AuthService()
    }

    handleInputChange = e => this.setState({ [e.target.name]: e.target.value })

    handleSubmit = e => {
        e.preventDefault()

        this.authService
            .login(this.state)
            .then(theLoggedInUser => {
                this.props.storeUser(theLoggedInUser.data)
                const accessToCreateService = localStorage.getItem('ruta')

                if (accessToCreateService) {
                    this.props.history.push('/crear-servicio')
                    localStorage.removeItem('ruta')
                } else {
                    this.props.history.goBack()
                }

            })
            .catch(err => this.setState({ credentialsError: err.response.data.message }))
    }

    render() {

        return (

            <section className="login">
                <Container className="login-container">

                    <Row>
                        <Col md={{ span: 6, offset: 3 }}>
                            <h1>Iniciar sesión</h1>
                            <hr className="login-hr" />
                            <Form onSubmit={this.handleSubmit}>
                                <Form.Group className="w-50" controlId="username">
                                    <Form.Label>Nombre de usuario</Form.Label>
                                    <Form.Control type="text" name="username" value={this.state.username} onChange={this.handleInputChange} />
                                </Form.Group>
                                <Form.Group className="w-50" controlId="password">
                                    <Form.Label>Contraseña</Form.Label>
                                    <Form.Control type="password" name="password" value={this.state.password} onChange={this.handleInputChange} />
                                </Form.Group>
                                {
                                    this.state.credentialsError
                                        ?
                                        <div className='error-message'>{this.state.credentialsError}</div>
                                        :
                                        null
                                }
                                <Button className="edit-button" type="submit">{!this.props.loggedUser ? 'Iniciar sesión' : <><p style={{ margin: '0 auto' }}>Iniciando sesión  <Spinner variant="light" size="sm" animation="border" style={{marginBottom: '2px'}}/></p> </>}</Button>
                            </Form>
                            <small>¿No registrad@? Hazlo <Link to="/registro" className="login-link">aquí</Link></small>
                        </Col>
                    </Row>
                </Container>
            </section>
        )
    }
}

export default Login