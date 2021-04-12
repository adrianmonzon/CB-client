import React, { Component } from 'react'
import { Container, Row, Col, Button } from 'react-bootstrap'
// import "./Profile.css"
import { Link } from 'react-router-dom'
import ServiceService from '../../../../services/services.service';
import ServiceCard from '../../Services-list/Service-card'
import './Owned-services.css'


class OwnedServices extends Component {
    constructor(props) {
        super(props)
        this.state = {
            owned: [],
            favs: []
        }
        this.servicesService = new ServiceService()
    }

    componentDidMount = () => {
        this.servicesService
            .getAllServicesFromUser(this.props.loggedUser._id)
            .then(res => {
                console.log(res)
                this.setState({ owned: res.data.owned, favs: res.data.favs })
            })
            .catch(err => console.log(err))
    }


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
                                        {this.state.owned.map(elm => <ServiceCard key={elm._id} {...elm} loggedUser={this.props.loggedUser} />)}
                                    </Col>
                                </Row>
                                :
                                <Row>
                                    <Col className="text-center">
                                        <p>Ninguna petición de ayuda publicada</p>
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
                                        {this.state.favs.map(elm => <ServiceCard key={elm._id} {...elm} loggedUser={this.props.loggedUser} />)}
                                    </Col>
                                </Row>
                                :
                                <Row>
                                    <Col className="text-center">
                                        <p>Ningún elemento guardado</p>
                                    </Col>
                                </Row>
                        }
                    </Col>
                </Row>
            </Container>
        )
    }

}


export default OwnedServices