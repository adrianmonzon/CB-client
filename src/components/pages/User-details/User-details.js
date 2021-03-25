import React, { Component } from 'react'
import UsersService from './../../../services/users.service'
import ServicesService from './../../../services/services.service'
import ServiceCard from './../Services-list/Service-card'
// import Rating from 'react-rating'
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
        const userRatingAverage = Math.round(this.state.owned.map(elm => elm.rating).reduce((a, b) => a + b, 0) / this.state.owned.length)
        //aquí iría un switch/if con las estrellitas según la nota
        return userRatingAverage
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
                                    {/* <p>Valoración: {
                                        this.state.user.assistant
                                        ?
                                        <Form inline>
                                            <Form.Control
                                                as="select"
                                                className="my-1 mr-sm-2"
                                                id="inlineFormCustomSelectPref"
                                                custom
                                                size="sm"
                                                style={{ fontSize: '20px' }}
                                            >
                                                <option value="1">1</option>
                                                <option value="2">2</option>
                                                <option value="3">3</option>
                                                <option value="4">4</option>
                                                <option value="5">5</option>
                                            </Form.Control>
                                        </Form>
                                        :
                                        this.state.user.rating
                                        }</p> */}
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