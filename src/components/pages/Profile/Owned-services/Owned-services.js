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
            // favs: []
        }
        this.servicesService = new ServiceService()
    }

    componentDidMount = () => {
        this.servicesService
            .getAllServicesFromUser(this.props.loggedUser._id)
            .then(res => {
                console.log(res)
                this.setState({ owned: res.data.owned/*, favs: res.data.favs*/ })
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
                <Col md={{ span: 8, offset: 2 }}>

                    <h4 className="owned-title text-center">Mis servicios creados</h4>
                    {
                        this.state.owned.length > 0
                            ?
                            <Row className="align-items-center profile-list">
                                {this.state.owned.map(elm => <ServiceCard key={elm._id} {...elm} loggedUser={this.props.loggedUser} />)} {/*<Button onClick={this.confirmDelete()}>Eliminar</Button>*/}
                            </Row>
                            :
                            <Row>
                                <p style={{ backgroundColor: 'red' }}>No has creado ningún servicio</p>
                            </Row>
                    }
                    {/* <hr />
                <h4 className="description">Mis itinerarios guardados</h4>
                <Row className="align-items-center profile-list">

                    {this.state.favs.map(elm =>
                        <ItinerariesCard key={elm._id} itinerary={elm} />
                    )}
                </Row> */}
                </Col>
            </Container>
        )
    }

}


export default OwnedServices