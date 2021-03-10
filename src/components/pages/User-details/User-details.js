import React, { Component } from 'react'
import UsersService from './../../../services/users.service'
// import Rating from 'react-rating'
import UserMap from './User-Map'

import './User-details.css'

import { Container, Row, Col, Spinner } from 'react-bootstrap'


class UserDetails extends Component {

    constructor() {
        super()
        this.state = {
            user: undefined //[]
        }
        this.usersService = new UsersService()
    }

    componentDidMount = () => {

        const user_id = this.props.match.params.user_id

        this.usersService
            .getUser(user_id)
            .then(res => this.setState({ user: res.data }))
            .catch(err => console.log(err))
    }

    render() {

        return (
            <section className="details-bg">
                <Container className="user-details">
                    {this.state.user
                        ?
                        <>
                            <Row>
                                <Col md={{span: 6, offset: 3}} >
                                    <img src={this.state.user.image} alt={this.state.user.username} />
                                </Col>
                                <Col md={4}>
                                    <h3 className="text-center">Información</h3>
                                    <hr className="hr" />
                                    <p>Nombre: {this.state.user.name}</p>
                                    <p>Ubicación: {this.state.user.province}</p>
                                    <p>Edad: {this.state.user.age} años</p>
                                    <p>Valoración: </p>
                                </Col>
                               
                                <Col md={8}>
                                    <h3 className="text-center">Mapa</h3>
                                    <hr className="hr" />
                                    <UserMap user={this.state.user} />
                                </Col>
                            </Row>
                        </>
                        :
                        <Spinner animation="border" />
                    }

                </Container>
            </section>
        )
    }
}

export default UserDetails