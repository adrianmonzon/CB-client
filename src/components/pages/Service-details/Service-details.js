import React, { Component } from 'react'
import ServicesService from './../../../services/services.service'
import UsersService from './../../../services/users.service'
import ContactForm from './Contact-form'


import './Service-details.css'

import { Container, Row, Col, Spinner, Accordion, Button } from 'react-bootstrap'

import { Link } from 'react-router-dom'

class ServiceDetails extends Component {

    constructor() {
        super()
        this.state = {
            service: undefined,
            user: undefined,
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

        const user_id = this.props.match.params.user_id

        this.usersService
            .getUser(user_id)
            .then(res => this.setState({ user: res.data }))
            .catch(err => console.log(err))
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
                                    <p><small>Por: {<Link to={`/usuarios/${this.state.service.owner._id}`}>{this.state.service.owner.name}</Link>}</small></p>
                                    <hr />
                                    <p>{this.state.service.description}</p>
                                    <p>Recompensa: {this.state.service.reward}</p>
                                    <Link to="/servicios" className="btn btn-sm btn-info edit-button">Volver</Link>
                                    {!this.props.loggedUser && <Link to="/iniciar-sesion" className="btn btn-sm btn-info details-button">Contactar con {this.state.service.owner.name}</Link>}
                                    <Button className="btn btn-sm edit-button" style={{marginLeft: '10px'}}>
                                        {
                                        this.props.loggedUser &&
                                        <>
                                                <Accordion>
                                                    <Accordion.Toggle as={Link} variant="link" eventKey="0" style={{ textDecoration: 'none', color: 'white' }}>
                                                        Contactar con {this.state.service.owner.name}
                                                </Accordion.Toggle>
                                                <Accordion.Collapse eventKey="0" style={{marginTop: '10px'}}>
                                                    <ContactForm loggedUser={this.props.loggedUser} contactUser={this.state.service.owner} serviceName={this.state.service.name} />
                                                </Accordion.Collapse>
                                            </Accordion>
                                        </>
                                    }    
                                    </Button>
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