import React, { Component } from 'react'
import AuthService from '../../../services/auth.service'
import './Login.css'

import { Container, Row, Col, Form, Button } from 'react-bootstrap'
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
                this.props.history.goBack()      // redirección a la página anterior JS
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
                                <Button className="edit-button" type="submit">Iniciar sesión</Button>
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