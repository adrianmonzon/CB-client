import React, { Component } from 'react'
import ServicesService from './../../../services/services.service'
// import UsersService from './../../../services/users.service'
import ContactForm from './Contact-form'

import Alert from './../../../components/shared/Alert/Alert'

import './Service-details.css'

import { Container, Row, Col, Spinner, Accordion, Button, Form } from 'react-bootstrap'

import { Link } from 'react-router-dom'

class ServiceDetails extends Component {

    constructor() {
        super()
        this.state = {
            service: {
                name: "",
                description: "",
                reward: "",
                rewardImage: "",
                situation: "",
                assistant: '',
                owner: "",
                rating: ""
            },
            uploadingActive: false,
            showToast: false,
            toastText: "",
        }

        this.servicesService = new ServicesService()
    }

    componentDidMount = () => {

        const service_id = this.props.match.params.service_id

        this.servicesService
            .getService(service_id)
            .then(res => this.setState({ service: res.data }))
            .catch(err => console.log(err))
    }

    handleToast = (visible, text) => this.setState({ showToast: visible, toastText: text })

    handleSubmit = e => {

        e.preventDefault()

        this.servicesService
            .updateService(this.state.service._id, this.state.service)
            .then(res => {
                this.handleToast(true, '¡Valoración enviada!')
                // this.props.history.push(`/mis-servicios/${res.data._id}`)
            })
            .catch(err => console.log(err))
    }

    handleInputChange = e => this.setState({ service: { ...this.state.service, [e.target.name]: e.target.value } })

    // getOwner = () => setTimeout(() => {
    //     return this.state.service.owner.email
    // }, 3000);

    render() {

        return (
            <section className="details-bg">
                <Container className="service-details">
                    {this.state.service
                        ?
                        <>
                            <Row className="text-center">
                                <Col md={12}>
                                    <h1>{this.state.service.name}</h1>
                                    <p><small>Por:</small> {<Link to={`/usuarios/${this.state.service.owner._id}`}>{this.state.service.owner.name}</Link>}</p>
                                    <hr />
                                </Col>
                                <Col className="text-center" md={6}>
                                    <h3 className="details-h3">Descripción</h3>
                                    <p className="descript-box">{this.state.service.description}</p>
                                    {/* <Link to="/servicios" className="btn btn-sm btn-info edit-button">Volver</Link> */}
                                </Col>
                                <Col className="text-center" md={6}>
                                    <h3 className="details-h3">Recompensa</h3>
                                    {
                                        this.state.service.rewardImage
                                            ?
                                            <img className="detailsImage" alt="Imagen de la recompensa" src={this.state.service.rewardImage}></img>
                                            :
                                            <p>Cargando imagen... <Spinner animation="border" style={{ marginBottom: '4px', height: '25px', width: '25px' }} /></p>
                                    }
                                    <p>{this.state.service.reward}</p>
                                </Col>

                                <Col md={12}>
                                    {!this.props.loggedUser && <Link to="/iniciar-sesion" className="btn btn-sm btn-info edit-button" style={{ marginLeft: '10px' }}>Contactar con {this.state.service.owner.name}</Link>}
                                    {
                                        this.props.loggedUser && this.props.loggedUser.username !== this.state.service.assistant
                                            ?
                                            <Button className="btn btn-sm edit-button" style={{ marginTop: '30px' }}>
                                                <>
                                                    <Accordion>
                                                        <Accordion.Toggle as={Link} variant="link" eventKey="0" style={{ textDecoration: 'none', color: 'white' }}>
                                                            Contactar con {this.state.service.owner.name}
                                                        </Accordion.Toggle>
                                                        <Accordion.Collapse eventKey="0" style={{ marginTop: '10px' }}>
                                                            <ContactForm loggedUser={this.props.loggedUser} contactUser={this.state.service.owner} serviceName={this.state.service.name} />
                                                        </Accordion.Collapse>
                                                    </Accordion>
                                                </>
                                            </Button>
                                            :
                                            this.props.loggedUser && this.props.loggedUser.username === this.state.service.assistant
                                                ?
                                                <>
                                                    <h3>Valore a {this.state.service.owner.name}</h3>
                                                    <Form onSubmit={this.handleSubmit}>
                                                        <Form.Control
                                                            as="select"
                                                            name="rating"
                                                            value={this.state.service.rating}
                                                            onChange={this.handleInputChange}
                                                            size="sm"
                                                            style={{ fontSize: '20px' }}
                                                        >
                                                            <option value="">Seleccionar</option>
                                                            <option value="1">1. {this.state.service.owner.name} ha sido un mal anfitrión y su recompensa dejaba mucho que desear</option>
                                                            <option value="2">2. {this.state.service.owner.name} ha sido un anfitrión correcto, pero su recompensa dejaba que desear</option>
                                                            <option value="3">3. {this.state.service.owner.name} ha sido un anfitrión correcto y su recompensa ha sido aceptable</option>
                                                            <option value="4">4. {this.state.service.owner.name} ha sido un buen anfitrión y su recompensa ha cumplido con lo esperado</option>
                                                            <option value="5">5. {this.state.service.owner.name} ha sido un muy buen anfitrión y su recompensa estaba en perfecto estado</option>
                                                        </Form.Control>
                                                        <Button className="btn btn-sm edit-button" type="submit" disabled={this.state.uploadingActive} style={{ marginTop: '30px' }}>Enviar puntuación</Button>
                                                    </Form>
                                                </>
                                                :
                                                null
                                    }

                                </Col>
                            </Row>
                        </>
                        :
                        <Row className="text-center">
                            <Col>
                                <Spinner animation="border" style={{ marginTop: '20px' }} />
                            </Col>
                        </Row>
                    }

                </Container>
                <Alert show={this.state.showToast} handleToast={this.handleToast} toastText={this.state.toastText} />
            </section>
        )
    }
}

export default ServiceDetails