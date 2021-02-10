import React, { Component } from 'react'
import ServicesService from './../../../services/services.service'
import UsersService from './../../../services/users.service'
import ContactForm from './Contact-form'


import './Service-details.css'

import { Container, Row, Col, Spinner } from 'react-bootstrap'

import { Link } from 'react-router-dom'

class ServiceDetails extends Component {

    constructor() {
        super()
        this.state = {
            service: undefined,
            // user: undefined,
        }
        this.servicesService = new ServicesService()
        this.usersService = new UsersService()
    }

    componentDidMount = () => {

        const service_id = this.props.match.params.service_id

        this.servicesService
            .getService(service_id)
            .then(res => this.setState({ service: res.data }))
            .catch(err => console.log(err))
        
        // const user_id = this.props.match.params.user_id

        // this.usersService
        //     .getUser(user_id)
        //     .then(res => this.setState({ user: res.data }))
        //     .catch(err => console.log(err))
    }

    render() {

        return (
            <section className="details-bg">
                <Container className="service-details">
                    {this.state.service
                        ?
                        <>
                            <Row>
                                {/* <Col md={6} >
                                    <img src={this.state.service.image} alt={this.state.service.username} />
                                </Col> */}
                                <Col md={6}>
                                    <h3>{this.state.service.name}</h3>
                                    <p>Por: {this.state.service.owner.name}</p>
                                    <hr className="hr" />
                                    <p>{this.state.service.description}</p>
                                    <p>Recompensa: {this.state.service.reward}</p>
                                    <Link to="/servicios" className="btn btn-sm btn-info details-button">Volver</Link>
                                    {!this.props.loggedUser && <Link to="/iniciar-sesion" className="btn btn-sm btn-info details-button">Contactar</Link>}
                                </Col>
                            </Row>
                            <Row>
                            </Row>
                            <Row className="contact-row">
                                <Col md={{ span: 6, offset: 3 }}>
                                    {this.props.loggedUser && <ContactForm loggedUser={this.props.loggedUser} contactUser={this.state.service} />}
                                </Col>
                            </Row>
                            {/* <Row className="map-row">
                                <Col md={{ span: 6, offset: 3 }}>
                                    <UserMap user={this.state.service} />
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

export default ServiceDetails