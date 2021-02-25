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
            <Container className="profile">
                {/* <Row className="align-items-center">
                    <Col md={{ span: 7 }}>
                        <h1>¡Bienvenid@, {this.props.loggedUser.username} !</h1>
                        <h4 className="description">Descripción:</h4>
                        <p>{this.props.loggedUser.description} </p>
                        <Link className="btn btn-dark btn-sm" to={`/crear-itinerario`}>Crear Itinerario</Link>
                        {
                            this.props.loggedUser.role === 'ADMIN'
                                ?
                                <Link className="btn btn-dark btn-sm" to={`/listado-usuarios`}>Usuarios</Link>
                                : null
                        }
                    </Col>
                    <Col md={{ span: 5 }}>
                        <img className="profile" src={this.props.loggedUser.profileImage} alt={this.props.loggedUser.username} />
                    </Col>
                </Row>
                <hr /> */}
                <Row>
                    {/* <Col md={{ span: 8, offset: 2 }}> */}
                    <Col md={6}>

                        <h2 className="owned-title text-center">Mis publicaciones</h2>
                        <hr />
                        {
                            this.state.owned.length > 0
                                ?
                                <Row>
                                    <Col>
                                        {this.state.owned.map(elm => <ServiceCard key={elm._id} {...elm} loggedUser={this.props.loggedUser} />)} {/*<Button onClick={this.confirmDelete()}>Eliminar</Button>*/}
                                    </Col>
                                </Row>
                                :
                                <Row>
                                    <Col className="text-center">
                                        <p>Ninguna petición de ayuda publicada</p>
                                    </Col>
                                </Row>
                        }
                    </Col>

                    <Col md={6}>
                        <h2 className="owned-title text-center">Mis favoritos</h2>
                        <hr />
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