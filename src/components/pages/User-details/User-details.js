import React, { Component } from 'react'
import UsersService from './../../../services/users.service'
// import UserMap from './User-Map'


import './User-details.css'

import { Container, Row, Col, Spinner } from 'react-bootstrap'

import { Link } from 'react-router-dom'
// import ContactForm from './ContactForm'

class UserDetails extends Component {

    constructor() {
        super()
        this.state = {
            user: undefined //[]
        }
        this.usersService = new UsersService()
    }

    componentDidMount = () => {

        const user_id = this.props.match.params.user_id

        this.usersService
            .getUser(user_id)
            .then(res => this.setState({ user: res.data }))
            .catch(err => console.log(err))
    }

    render() {

        return (
            <section className="details-bg">
                <Container className="user-details">
                    {this.state.user
                        ?
                        <>
                            <Row>
                                <Col md={4} >
                                    <img src={this.state.user.image} alt={this.state.user.username} />
                                </Col>
                                <Col md={4}>
                                    <h3>{this.state.user.name}</h3>
                                    {/* <p>{this.state.user.description}</p> */}
                                    <hr className="hr" />
                                    {/* <p>Instrumento: {this.state.user.instrument}</p> */}
                                    <p>Ubicación: {this.state.user.province}</p>
                                    <p>Edad: {this.state.user.age} años</p>
                                    {/* <Link to={`servicios/${_id}`} className="btn btn-sm btn-info edit-button">Volver</Link> */}
                                    {/* {!this.props.loggedUser && <Link to="/iniciar-sesion" className="btn btn-md btn-light details-button">Contactar</Link>} */}
                                </Col>
                            </Row>
                            {/* <Row className="contact-row">
                                <Col md={{ span: 6, offset: 3 }}>
                                    {this.props.loggedUser && <ContactForm loggedUser={this.props.loggedUser} contactUser={this.state.user} />}
                                </Col>
                            </Row>
                            <Row className="map-row">
                                <Col md={{ span: 6, offset: 3 }}>
                                    <UserMap user={this.state.user} />
                                </Col>
                            </Row> */}
                        </>
                        :
                        <Spinner animation="border" />
                    }

                </Container>
            </section>
        )
    }
}

export default UserDetails