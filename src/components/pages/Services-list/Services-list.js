import React, { Component } from "react"
import ServicesService from "./../../../services/services.service"
// import UsersService from './../../../services/users.service'
import { Container, Row, Button, Modal, Toast, Spinner, Col } from "react-bootstrap"
import Alert from './../../shared/Alert/Alert'
import Popup from './../../shared/Popup/Popup'
import ServiceCard from './Service-card'
import ServiceForm from './Service-form'
import './Services-list.css'
import { Link } from 'react-router-dom'
import Filter from './Filter'

class ServicesList extends Component {
    constructor() {
        super();
        this.state = {
            services: [],
            showModal: false,
            showToast: false,
            toastText: '',
            isServiceLoaded: false
        };
        this.servicesService = new ServicesService();
        // this.usersService = new UsersService();
    }

    componentDidMount = () => {
        this.refreshServices()
    };

    // getAllServices = () => {
    //     this.servicesService
    //         .getServices()
    //         .then((res) => this.setState({ services: res.data }))
    //         .catch((err) => console.log(err));
    // }

    // componentDidMount = () => this.refreshServices()

    refreshServices = () => {
        this.servicesService
            .getServices()
            .then(res => this.setState({ services: res.data }))
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

    render() {
        return (
            <section className="services-list">
                <Container>
                    <Filter filterByOwnerProvince={this.filterByProvince} />
                    {!this.props.loggedUser && <Link to="/iniciar-sesion" className="btn btn-info btn-sm edit-button list-button">Crear servicio</Link>}

                    {this.props.loggedUser && <Button className="edit-button list-button" onClick={() => this.handleModal(true)} size="sm">Crear servicio</Button>}

                    {this.state.services.length > 0
                        ?
                        <Row>
                            {this.state.services.map((elm) => <ServiceCard key={elm._id} {...elm} loggedUser={this.props.loggedUser}/>)}
                        </Row>
                        :
                        <Row>
                            {this.state.services.length === 0 && this.state.isServiceLoaded ? <Col><p>No hay resultados para esta búsqueda</p></Col>
                            :
                            <Spinner animation="border" />
                            }
                        </Row>
                    }

                </Container>

                <Popup show={this.state.showModal} handleModal={this.handleModal} title="Nuevo servicio">
                    <ServiceForm handleToast={this.handleToast} closeModal={() => this.handleModal(false)} updateList={this.refreshServices} loggedUser={this.props.loggedUser} />
                </Popup>

                <Alert className="service-added" show={this.state.showToast} handleToast={this.handleToast} toastText={this.state.toastText} />
            </section>
        )
    }

}

export default ServicesList