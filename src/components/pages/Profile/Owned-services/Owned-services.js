import React, { Component } from 'react'
import { Container, Row, Col, Button, Spinner } from 'react-bootstrap'
// import "./Profile.css"
import Alert from '../../../shared/Alert/Alert'
import ServiceService from '../../../../services/services.service';
import ServiceCard from '../../Services-list/Service-card'
import './Owned-services.css'


class OwnedServices extends Component {
    constructor(props) {
        super(props)
        this.state = {
            owned: [],
            favs: [],
            showToast: false,
            toastText: '',
            isServiceLoaded: false
        }
        this.servicesService = new ServiceService()
    }

    componentDidMount = () => {
        this.servicesService
            .getAllServicesFromUser(this.props.loggedUser._id)
            .then(res => {
                // console.log('Console.log en owned services', res)
                this.setState({ owned: res.data.owned, favs: res.data.favs, isServiceLoaded: true })
                console.log('Los favs son estos', this.state.favs)
            })
            .catch(err => console.log(err))
    }

    handleToast = (visible, text) => this.setState({ showToast: visible, toastText: text })

    render() {
        return (
            <Container className="owned-bg owned-container">
                <Row>
                    {/* <Col md={{ span: 8, offset: 2 }}> */}
                    <Col md={6}>

                        <h1 className="owned-title text-center">Mis publicaciones creadas</h1>
                        {
                            this.state.owned.length > 0
                                ?
                                <Row>
                                    <Col>
                                        {this.state.owned.map(elm => <ServiceCard key={elm._id} {...elm} loggedUser={this.props.loggedUser} refreshPage={this.componentDidMount} handleToast={this.handleToast} />)}
                                    </Col>
                                </Row>
                                :
                                <Row>
                                    <Col className="text-center">
                                        {
                                            this.state.owned.length === 0 && this.state.isServiceLoaded ? <p>Ningún elemento guardado</p>
                                                :
                                                <p>Cargando publicaciones... <Spinner animation="border" variant="dark" style={{ marginTop: '20px', marginBottom: '4px', height: '25px', width: '25px' }} /></p>
                                        }
                                    </Col>
                                </Row>

                        }
                        <hr />
                    </Col>

                    <Col md={6}>
                        <h1 className="owned-title text-center">Publicaciones favoritas</h1>
                        {
                            this.state.favs.length > 0
                                ?
                                <Row>
                                    <Col>
                                        {this.state.favs.map(elm => <ServiceCard key={elm._id} {...elm} loggedUser={this.props.loggedUser} refreshPage={this.componentDidMount} handleToast={this.handleToast} />)}
                                    </Col>
                                </Row>
                                :
                                <Row>
                                    <Col className="text-center">
                                        {
                                            this.state.favs.length === 0 && this.state.isServiceLoaded ? <p>Ningún elemento guardado</p>
                                                :
                                                <p>Cargando publicaciones... <Spinner animation="border" variant="dark" style={{ marginTop: '20px', marginBottom: '4px', height: '25px', width: '25px' }} /></p>
                                        }
                                    </Col>
                                </Row>

                        }
                    </Col>
                </Row>
                <Alert className="service-added" show={this.state.showToast} handleToast={this.handleToast} toastText={this.state.toastText} />
            </Container>
        )
    }

}


export default OwnedServices