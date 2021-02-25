import { Col, Card, Button, Accordion, Row } from 'react-bootstrap'
import { useState, useEffect } from 'react'
import './Service-card.css'
import { Link, useHistory } from 'react-router-dom'
import arrow from './arrow.ico'
import swal from 'sweetalert'
import ServicesService from "./../../../services/services.service"
import UsersService from './../../../services/users.service'
import heart from './heart.png'
import redHeart from './red-heart.png'


const ServiceCard = ({ name, _id, reward, owner, situation, loggedUser }) => {

    const servicesService = new ServicesService();
    const usersService = new UsersService()
    const history = useHistory()


    const deleteTheService = () => {

        servicesService
            .deleteService(_id)
            .then(() => {
                // history.push('/servicios')
                setTimeout(function () { history.go() }, 800) //history.go() refreshes the current page
            })
            .catch(err => console.log(err))
    }

    const confirmDelete = () => {
        swal({
            title: "Mensaje de confirmación",
            text: "¿Estás segur@ de que quieres eliminar este servicio?",
            icon: "warning",
            buttons: ["No", "Sí"]
        })
            .then(answer => {

                if (answer) {
                    deleteTheService()
                    swal({
                        text: "El servicio se ha eliminado con éxito",
                        icon: "success"
                    })
                }
            })
    }

    const [isAdded, setisAdded] = useState(false)

    // refreshServices = () => {
    //     this.servicesService
    //         .getServices()
    //         .then(res => {
    //             console.log(res)
    //             this.setState({ services: res.data })
    //         })
    //         .catch(err => console.log(err))
    // }

    // useEffect(() => {
    //     const isAddedState = Boolean(localStorage.getItem('isAdded') || false)
    //     setisAdded(isAddedState)
    // }, [])

    useEffect(() => {
        localStorage.setItem("isAdded", isAdded)
    }, [isAdded])

    // const keepState = () => {
    //     localStorage.setItem('isAdded', isAdded)
    // }

    // const keepTheState = localStorage.getItem('isAdded')

    // if (keepTheState) {
    //     // this.props.history.push('/crear-servicio')
    //     localStorage.removeItem('ruta')
    // } else {
    //     this.props.history.goBack()
    // }

    const saveService = () => {

        const isAddedState = Boolean(localStorage.getItem('isAdded') || true)

        const user_id = loggedUser._id

        usersService
            .saveService(_id, user_id)
            .then(() => {

                history.go()
            })
            .catch(err => console.log(err))
    }

    const removeService = () => {

        const user_id = loggedUser._id

        usersService
            .removeService(_id, user_id)
            .then(() => history.go()
)
            .catch(err => console.log(err))
    }

    // const saveRemove = () => {
    //     removeService()
    //     setisAdded(!isAdded)
    //     console.log(isAdded)
    // }

    return (
        <Col className="text-center" lg={12}>
            {/* {console.log(owner)} */}
            <Card className="service-card text-center">
                <Row className="no-gutters">
                    <Col md="4">
                        <Card.Img top variant="top" src={owner ? owner.image : <></>} />
                        {/* {owner ? //esto se pone porque como tengo algunos creados del seed sin owner, para que separarlos de los que sí tienen */}
                        <>
                            <Card.Text className="card-name">{owner.username}, {owner.province}</Card.Text>
                            <Card.Text className={situation === 'Pendiente de ayuda' ? "card-situation" : situation === 'En conversaciones' ? "card-situation3" : situation === 'Ayuda recibida' ? "card-situation2" : null}>{situation}</Card.Text>
                        </>
                        {/* :
                            <><p>nombre</p></>
                        } */}
                    </Col>
                    <Col md="8">

                        <Card.Body className="card-style">
                            <Card.Title>{name}
                                {
                                    loggedUser && loggedUser._id === owner._id
                                        ?
                                        null
                                        :
                                        !loggedUser
                                            ?
                                            null
                                            :
                                            <>
                                                <Button onClick={!loggedUser.savedServices.includes(_id) ? () => saveService() : () => removeService()}/*isAdded ? () => removeService() : () => saveService()} /*className={!loggedUser.savedServices.includes(_id)? "white-button" : "red-button"}*/ style={{ float: 'left' }} size="sm">
                                                    {!loggedUser.savedServices.includes(_id) ? "Añadir a favs" : "Quitar de favs" }{/*<img
                                                alt="Añadir a favoritos"
                                                src={heart}
                                                style={{ height: '25px', textAlign: 'center', width: '20px' }}
                                                className="button-card-img"
                                            />*/}</Button>
                                            </>
                                }

                            </Card.Title>
                            {
                                loggedUser && loggedUser._id === owner._id
                                    ?
                                    // <Link className="btn btn-dark btn-block btn-sm" to="/editar-perfil">Editar</Link>
                                    <>
                                        <div className="button-position">
                                            <Link className="btn btn-info btn-sm card-edit-button" to={`/editar-servicio/${_id}`}>{/*<img
                                            alt="Imagen de usuario"
                                            src={arrow}
                                            style={{ height: '20px', textAlign: 'center', width: '15px' }}
                                            className="button-card-img"
                                        />*/}Editar</Link>

                                            <Button className="btn btn-info btn-sm card-delete-button" onClick={() => confirmDelete()}>{/*<img
                                            alt="Imagen de usuario"
                                            src={arrow}
                                            style={{ height: '20px', textAlign: 'center', width: '15px' }}
                                            className="button-card-img"
                                            />*/}Eliminar</Button>
                                        </div>
                                    </>
                                    :
                                    <div className="button-position">
                                        {
                                            situation === "Ayuda recibida"
                                                ?
                                                null
                                                :
                                                <Link className="btn btn-info btn-sm card-button" to={`/servicios/${_id}`}>
                                                    <img
                                                        alt="Imagen de usuario"
                                                        src={arrow}
                                                        style={{ height: '25px', textAlign: 'center', width: '20px' }}
                                                        className="button-card-img"
                                                    /></Link>
                                        }
                                    </div>
                            }
                            <hr />
                            <Card.Text>Recompensa: {reward}</Card.Text>
                            {/* <Accordion>
                    <Accordion.Toggle as={Button} variant="link" eventKey="0">
                        Recompensa
                    </Accordion.Toggle>
                    <Accordion.Collapse eventKey="0">
                        <Card.Body>{reward}</Card.Body>
                    </Accordion.Collapse>
                    </Accordion> */}
                        </Card.Body>
                    </Col>
                </Row>
            </Card>
        </Col>
    )
}

export default ServiceCard