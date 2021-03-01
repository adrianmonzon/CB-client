import React, { Component } from "react"
import ServicesService from "./../../../services/services.service"
// import UsersService from './../../../services/users.service'
import { Container, Row, Button, Spinner, Col, Accordion, AccordionCollapse } from "react-bootstrap"
import Alert from './../../shared/Alert/Alert'
import Popup from './../../shared/Popup/Popup'
import ServiceCard from './Service-card'
import ServiceForm from './Service-form'
import './Services-list.css'
import { Link } from 'react-router-dom'
import Filter from './Filter'
import SituationFilter from './SituationFilter'

class ServicesList extends Component {
    constructor() {
        super();
        this.state = {
            services: [],
            showModal: false,
            showToast: false,
            toastText: '',
            isServiceLoaded: false,
        };
        this.servicesService = new ServicesService();
        // this.usersService = new UsersService();
    }

    componentDidMount = () => {
        this.refreshServices()
    }
    refreshServices = () => {
        this.servicesService
            .getServices()
            .then(res => {
                // console.log(res)
                this.setState({ services: res.data })
            })
            .catch(err => console.log(err))
    }

    handleModal = visible => this.setState({ showModal: visible })
    handleToast = (visible, text) => this.setState({ showToast: visible, toastText: text })

    filterByProvince = (province) => {
        if (province === 'all') this.refreshServices()
        else {
            this.servicesService
                .filterByProvince(province)
                .then((res) => this.setState({ services: res.data, isServiceLoaded: true }))
                .catch((err) => console.log(err))
        }
    };

    filterBySituation = (situation) => {
        if (situation === 'all') this.refreshServices()
        else {
            this.servicesService
                .filterBySituation(situation)
                .then((res) => this.setState({ services: res.data, isServiceLoaded: true }))
                .catch((err) => console.log(err))
        }
    };

    render() {
        return (
            <section className="services-list">
                <Container className="list-container">
                    <Col className="text-center">

                        {!this.props.loggedUser && <Link to="/iniciar-sesion" className="btn btn-info btn-sm edit-button list-button">Pedir ayuda</Link>}
                        {this.props.loggedUser && <Button className="edit-button list-button" onClick={() => this.handleModal(true)} size="sm">Pedir ayuda</Button>}
                        <Accordion className="filter-button">
                            <Accordion.Toggle as={Button} className="edit-button btn-sm list-button" eventKey="0">
                                Filtro
                                </Accordion.Toggle>
                            <AccordionCollapse eventKey="0">
                                <Filter filterByOwnerProvince={this.filterByProvince} />
                            </AccordionCollapse>
                            <AccordionCollapse eventKey="0">
                                <SituationFilter filterBySituation={this.filterBySituation} />
                            </AccordionCollapse>
                        </Accordion>
                    </Col>
                    {this.state.services.length > 0
                        ?
                        <Row>
                            {this.state.services.map((elm) => <ServiceCard key={elm._id} {...elm} loggedUser={this.props.loggedUser} {...this.props} /*refreshPage={this.refreshServices}*/ />)}
                        </Row>
                        :
                        <Row>
                            <Col className="text-center">
                                {this.state.services.length === 0 && this.state.isServiceLoaded ? <Col><p style={{marginTop: '20px'}}>No hay resultados para esta búsqueda</p></Col>
                                    :
                                    <Spinner animation="border" />
                                }
                            </Col>
                        </Row>
                    }
                </Container>

                <Popup show={this.state.showModal} handleModal={this.handleModal} title="Nueva petición">
                    <ServiceForm handleToast={this.handleToast} closeModal={() => this.handleModal(false)} updateList={this.refreshServices} loggedUser={this.props.loggedUser} />
                </Popup>

                <Alert className="service-added" show={this.state.showToast} handleToast={this.handleToast} toastText={this.state.toastText} />
            </section>
        )
    }

}

export default ServicesList