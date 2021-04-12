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

        const userServicesRatingAverage = this.state.owned.map(elm => elm.rating).reduce((a, b) => a + b, 0) / this.state.owned.length
        const userRatingsAverage = this.state.user.userRatings.reduce((a, b) => a + b, 0) / this.state.user.userRatings.length
        const finalUserRatingAverage = Math.round((userServicesRatingAverage + userRatingsAverage) / 2)
        console.log(userServicesRatingAverage, userRatingsAverage, finalUserRatingAverage)

        switch (finalUserRatingAverage) {
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
                                    <img className="user-img" src={this.state.user.image} alt={'Foto de ', this.state.user.username} />
                                </Col>
                                <Col md={4}>
                                    <h3 className="text-center">Información</h3>
                                    <hr className="hr" />
                                    <p><b className='rewardWord'>Nombre:</b> {this.state.user.name}</p>
                                    <p><b className='rewardWord'>Ubicación:</b>  {this.state.user.province}</p>
                                    <p><b className='rewardWord'>Edad:</b>  {this.state.user.age} años</p>
                                    <p><b className='rewardWord'>Email:</b>  {this.state.user.email}</p>
                                    <p><b className='rewardWord'>Valoración:</b>  {this.getUserRating()}</p>
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