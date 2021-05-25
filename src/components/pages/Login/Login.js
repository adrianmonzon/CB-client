import React, { Component } from 'react'
import AuthService from '../../../services/auth.service'
import './Login.css'
import hello from './hello.jpg'
import { Container, Row, Col, Form, Button, Spinner } from 'react-bootstrap'
import { Link } from 'react-router-dom'

class Login extends Component {

    constructor() {
        super()
        this.state = {
            username: '',
            password: '',
            credentialsError: '',
            isLoggingIn: false
        }
        this.authService = new AuthService()
    }

    handleInputChange = e => this.setState({ [e.target.name]: e.target.value })

    handleSubmit = e => {
        e.preventDefault()

        this.authService
            .login(this.state)
            .then(theLoggedInUser => {
                this.setState({ isLoggingIn: true })
                // console.log(this.state.isLoggingIn)
                // debugger
                this.props.storeUser(theLoggedInUser.data)
                const accessToCreateService = localStorage.getItem('ruta')

                if (accessToCreateService) {
                    this.props.history.push('/crear-servicio')
                    localStorage.removeItem('ruta')
                } else {
                    this.props.history.goBack()
                }

            })
            // .catch(err => this.setState({ credentialsError: err.response.data.message === 'Missing credentials' ? 'Rellene todos los campos' : err.response.data.message }))
            .catch(err => this.setState({ credentialsError: err.response.data.message === 'Missing credentials' ? 'Rellene todos los campos' : err.response.data.message }))

    }

    render() {

        return (

            <section className="login">
                <Container className="login-container">

                    <Row>
                        <Col md={4}></Col>
                        <Col md={4} >
                            <h1>Iniciar sesión</h1>
                            <hr className="login-hr" />
                            <Form onSubmit={this.handleSubmit}>
                                <Form.Group controlId="username" /*className="w-50"*/>
                                    {/* <Form.Label>Nombre de usuario</Form.Label> */}
                                    <Form.Control type="text" placeholder="Nombre de usuario" name="username" value={this.state.username} onChange={this.handleInputChange} />
                                </Form.Group>
                                <Form.Group controlId="password">
                                    {/* <Form.Label>Contraseña</Form.Label> */}
                                    <Form.Control type="password" placeholder="Contraseña" name="password" value={this.state.password} onChange={this.handleInputChange} />
                                </Form.Group>
                                {
                                    this.state.credentialsError
                                        ?
                                        <div className='error-message'>{this.state.credentialsError}</div>
                                        :
                                        null
                                }
                                <Button className="edit-button" type="submit">{!this.state.isLoggingIn ? 'Iniciar sesión' : <><p style={{ margin: '0 auto' }}>Iniciando sesión...  <Spinner variant="light" size="sm" animation="border" style={{ marginBottom: '4px' }} /></p> </>}</Button>
                            </Form>
                            <small>¿No registrad@? Hágalo <Link to="/registro" className="login-link">AQUÍ</Link></small>
                        </Col>
                    </Row>
                    <Row className="text-center">
                        {/* <Col md={4}></Col> */}
                        <Col md={{ span: 8, offset: 2 }}>
                            <img src={hello} alt="Saludo" className="login-img" />
                        </Col>
                        {/* <Col md={4}></Col> */}

                    </Row>
                </Container>
            </section>
        )
    }
}

export default Login