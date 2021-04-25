import { Col, Card, Button, Accordion, Row } from 'react-bootstrap'
import { useState } from 'react'
import './Service-card.css'
import { Link, useHistory } from 'react-router-dom'
import arrow from './proximo.png'
import swal from 'sweetalert'
import ServicesService from "./../../../services/services.service"
import UsersService from './../../../services/users.service'
import heart from './heart.png'
import redHeart from './red-heart.png'
import pencil from './lapiz.png'
import bin from './eliminar.png'
import trophy from './trophy.png'


const ServiceCard = ({ name, _id, reward, owner, situation, loggedUser, refreshPage, handleToast, classCard, assistant }) => {

    const servicesService = new ServicesService();
    const usersService = new UsersService()

    const [favs, setFavs] = useState(loggedUser && loggedUser.savedServices);





    const deleteTheService = () => {

        servicesService
            .deleteService(_id)
            .then(() => refreshPage())
            .catch(err => console.log(err))
    }

    const confirmDelete = () => {
        swal({
            title: "Mensaje de confirmación",
            text: "¿Estás segur@ de que quieres eliminar esta publicación?",
            icon: "warning",
            buttons: ["No", "Sí"]
        })
            .then(answer => {

                if (answer) {
                    deleteTheService()
                    swal({
                        text: "Publicación eliminada con éxito",
                        icon: "success"
                    })
                }
            })
    }


    const saveService = (arr, item) => {

        const user_id = loggedUser._id

        arr.push(item)

        usersService
            .saveService(_id, user_id)
            .then(res => {
                refreshPage()
                handleToast(true, '¡Añadido a favoritos!')
            })
            .catch(err => console.log(err))
    }


    const removeService = (arr, item) => {

        var i = arr.indexOf(item);

        if (i !== -1) {
            arr.splice(i, 1);
        }

        const user_id = loggedUser._id

        usersService
            .removeService(_id, user_id)
            .then(res => {
                refreshPage()
                handleToast(true, '¡Retirado de favoritos!')
            })
            .catch(err => console.log(err))
    }


    const deleteServiceWithoutOwner = () => {

        servicesService
            .deleteService(_id)
            .then(() => refreshPage())
    }


    const saveRemove = () => !loggedUser.savedServices.includes(_id) ? saveService(favs, _id) : removeService(favs, _id)


    return (
        <Col className={classCard} md={{ span: 8, offset: 2 }}>
            {/* {console.log(owner)} */}
            <Card className="service-card text-center">
                <Row className="no-gutters">
                    <Col md="4">
                        <div className="img-div">
                            <Card.Img top variant="top" src={owner ? owner.image : <></>} />
                            {/* {owner ? //esto se pone porque como tengo algunos creados del seed sin owner, para que separarlos de los que sí tienen */}
                            <>
                            </>
                            <Card.Text className="card-name">{owner ? owner.username : deleteServiceWithoutOwner()}, {owner && owner.province}</Card.Text>
                            <Card.Text className={situation === 'Pendiente de ayuda' ? "card-situation" : situation === 'En conversaciones' ? "card-situation3" : situation === 'Ayuda recibida' ? "card-situation2" : null}>{situation}</Card.Text>
                            {/* :
                            <><p>nombre</p></>
                        } */}
                        </div>
                    </Col>
                    <Col md="8">

                        <Card.Body className="card-style">
                            <Card.Title><h3>{name}
                                {
                                    loggedUser && loggedUser._id === owner._id
                                        ?
                                        <>
                                            <Link style={{ float: 'left' }} to={`/editar-servicio/${_id}`}><img
                                                alt="Icono de editar publicación"
                                                src={pencil}
                                                style={{ height: '25px', width: '25px' }}
                                                className="button-card-img"
                                            /></Link>

                                            <Link style={{ float: 'right' }} onClick={() => confirmDelete()}><img
                                                alt="Icono de eliminar publicación"
                                                src={bin}
                                                style={{ height: '25px', width: '25px' }}
                                            /></Link>
                                        </>
                                        :
                                        !loggedUser
                                            ?
                                            null
                                            :
                                            <Link className="fav-button" onClick={saveRemove} style={{ float: 'left' }} size="sm">
                                                {!loggedUser.savedServices.includes(_id) ? <img src={heart} alt="Añadir a favs" style={{ height: '25px', width: '25px' }} /> : < img src={redHeart} alt="Quitar de favs" style={{ height: '25px', width: '25px' }} />}

                                            </Link>
                                }
                            </h3>
                            </Card.Title>
                            {
                                loggedUser && loggedUser._id === owner._id
                                    ?
                                    <>
                                    </>
                                    :
                                    <div className="button-position">
                                        {
                                            loggedUser && loggedUser.username === assistant
                                                ?
                                                <Link className="btn btn-light btn-sm card-button" to={`/servicios/${_id}`}>
                                                    <img
                                                        alt="Imagen de usuario"
                                                        src={arrow}
                                                        className="arrow-button"
                                                    />
                                                </Link>
                                                :
                                                situation === "Ayuda recibida"
                                                    ?
                                                    null
                                                    :
                                                    <Link className="btn btn-light btn-sm card-button" to={`/servicios/${_id}`}>
                                                        <img
                                                            alt="Imagen de usuario"
                                                            src={arrow}
                                                            className="arrow-button"
                                                        />
                                                    </Link>
                                        }
                                    </div>
                            }
                            <hr />
                            <Card.Text><b className="rewardWord"><img
                                alt="Icono de editar publicación"
                                src={trophy}
                                style={{ height: '25px', width: '25px', marginBottom: '10px' }}
                                className="button-card-img"
                            /> Recompensa:</b> {reward}</Card.Text>
                        </Card.Body>
                    </Col>
                </Row>
            </Card>
        </Col>
    )
}

export default ServiceCard