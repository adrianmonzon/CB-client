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
// import SituationFilter from './SituationFilter'


class ServicesList extends Component {
    constructor() {
        super();
        this.state = {
            services: [],
            showModal: false,
            showToast: false,
            toastText: '',
            isServiceLoaded: false,
            classCard: /*'hidden'*/ 'card-div'
        };
        this.servicesService = new ServicesService();
        // this.usersService = new UsersService();
    }

    componentDidMount = () => {
        this.refreshServices()
        window.onscroll = () => this.handleAnimation();
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

    handleAnimation = () => {
        if (document.documentElement.scrollTop > 50) {
            this.setState({ classCard: 'card-div' });
        };
    }

    render() {
        return (
            <section className="services-list">
                {/* <Parallax strength={300}>
                    <Background className="custom-bg">
                        <img src={bgImage} alt="fill murray" />
                    </Background>
                </Parallax> */}
                <Container className="list-container">
                    <Col className="text-center">

                        {!this.props.loggedUser && <Link to="/iniciar-sesion" className="btn main-button btn-light list-button">Pedir ayuda</Link>}
                        {this.props.loggedUser && <Button className="main-button btn-light list-button" onClick={() => this.handleModal(true)} >Pedir ayuda</Button>}
                        <Accordion className="filter-button">
                            <Accordion.Toggle as={Button} className="main-button btn-light list-button" eventKey="0">
                                Filtro
                                </Accordion.Toggle>
                            <AccordionCollapse eventKey="0">
                                <Filter filterByOwnerProvince={this.filterByProvince} />
                            </AccordionCollapse>
                            {/* <AccordionCollapse eventKey="0">
                                <SituationFilter filterBySituation={this.filterBySituation} />
                            </AccordionCollapse> */}
                        </Accordion>
                    </Col>
                    {this.state.services.length > 0
                        ?
                        <Row>
                            {this.state.services.map((elm) => <ServiceCard key={elm._id} {...elm} loggedUser={this.props.loggedUser} {...this.props} classCard={this.state.classCard}/*refreshPage={this.refreshServices}*/ />)}
                        </Row>
                        :
                        <Row>
                            <Col className="text-center">
                                {this.state.services.length === 0 && this.state.isServiceLoaded ? <Col md={{ span: 5, offset: 4 }}><p style={{ marginTop: '20px', color: 'black', border: '1px solid', backgroundColor: 'white', borderRadius: '5px' }}>No hay resultados para esta búsqueda</p></Col>
                                    :
                                    <Spinner animation="border" variant="light" style={{ marginTop: '20px' }} />
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