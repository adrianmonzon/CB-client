import React, { Component } from 'react'
import UsersService from './../../../services/users.service'
import ServicesService from './../../../services/services.service'
import oneStar from './one-star.png'
import twoStars from './two-stars.png'
import threeStars from './three-stars.png'
import fourStars from './four-stars.png'
import fiveStars from './five-stars.png'
import UserMap from './User-Map'

import './User-details.css'

import { Container, Row, Col, Spinner, Form } from 'react-bootstrap'


class UserDetails extends Component {

    constructor() {
        super()
        this.state = {
            user: undefined, //[]
            owned: []
        }
        this.usersService = new UsersService()
        this.servicesService = new ServicesService()
    }

    componentDidMount = () => {

        const user_id = this.props.match.params.user_id

        this.usersService
            .getUser(user_id)
            .then(res => this.setState({ user: res.data }))
            .catch(err => console.log(err))

        this.servicesService
            .getAllServicesFromUser(user_id)
            .then(res => {
                console.log(res)
                this.setState({ owned: res.data.owned })
            })
            .catch(err => console.log(err))

    }

    getUserRating = () => {

        //media como anfitrión (media del rating de sus servicios creados)
        const userServicesRatingAverage = Math.round(this.state.owned.map(elm => elm.rating).reduce((a, b) => a + b, 0) / this.state.owned.length)

        //aquí iría la media como asistente (media del rating del propio usuario como ayudante)

        //aquí iría la media final, la suma de ambas entre 2, que es la que se usaría en el switch

        switch (userServicesRatingAverage) {
            case 1:
                return <span>1/5  <img src={oneStar} alt='1/5' className="stars-img" /></span>;
            case 2:
                return <span>2/5  <img src={twoStars} alt='2/5' className="stars-img" /></span>;
            case 3:
                return <span>3/5  <img src={threeStars} alt='3/5' className="stars-img" /></span>;
            case 4:
                return <span>4/5  <img src={fourStars} alt='4/5' className="stars-img" /></span>;
            case 5:
                return <span>5/5  <img src={fiveStars} alt='5/5' className="stars-img" /></span>;
            default:
                return <span>Sin valorar</span>
        }
    }


    render() {

        return (
            <section className="details-bg">
                <Container className="user-details">
                    {this.state.user
                        ?
                        <>
                            <Row>
                                <Col md={{ span: 6, offset: 3 }} >
                                    <img className="user-img" src={this.state.user.image} alt={this.state.user.username} />
                                </Col>
                                <Col md={4}>
                                    <h3 className="text-center">Información</h3>
                                    <hr className="hr" />
                                    <p>Nombre: {this.state.user.name}</p>
                                    <p>Ubicación: {this.state.user.province}</p>
                                    <p>Edad: {this.state.user.age} años</p>
                                    <p>Valoración: {this.getUserRating()}</p>
                                </Col>

                                <Col md={8}>
                                    <h3 className="text-center">Mapa</h3>
                                    <hr className="hr" />
                                    <UserMap user={this.state.user} />
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
            </section>
        )
    }
}

export default UserDetails