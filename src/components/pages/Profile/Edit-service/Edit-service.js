import React, { Component } from "react"
import ServicesService from "./../../../../services/services.service"
import FilesService from "./../../../../services/upload.service"
import UsersService from "./../../../../services/users.service"
import { Container, Row, Col, Form, Button, Spinner } from "react-bootstrap"
import Alert from './../../../shared/Alert/Alert'
import './Edit-service.css'
// import Autocomplete from "./../Autocomplete-form/Autocomplete-form"

class EditService extends Component {
    constructor(props) {
        super(props)
        this.state = {
            service: {
                name: "",
                description: "",
                reward: "",
                rewardImage: "",
                situation: "",
                assistant: "",
                serviceState: "",
                owner: this.props.loggedUser._id,
            },
            selectedUser: {},
            isThereSelectedUser: false,
            users: [],
            uploadingActive: false,
            showToast: false,
            toastText: "",
            // validationDone: false,
            // serviceClosed: false
        }

        this.serviceService = new ServicesService()
        this.filesService = new FilesService()
        this.usersService = new UsersService()

    }
    componentDidMount() {
        const service_id = this.props.match.params.service_id
        this.serviceService
            .getService(service_id)
            .then(res => this.setState({ service: res.data }))
            .catch(err => console.log(err))

        this.usersService
            .getUsers()
            .then(res => this.setState({ users: res.data }))
            .catch(err => console.log(err))
    }

    handleToast = (visible, text) => this.setState({ showToast: visible, toastText: text })

    handleServiceClosed = e => this.setState({ service: { ...this.state.service, serviceState: 'closed' } })

    handleSubmit = e => {
        e.preventDefault()
        this.serviceService
            .updateService(this.state.service._id, this.state.service)
            .then(res => {
                this.handleToast(true, '¡Cambios guardados!')
                // this.props.history.push(`/mis-servicios/${res.data._id}`)
            })
            .catch(err => console.log(err))

        this.usersService
            .updateUser(this.state.selectedUser._id, this.state.selectedUser)
            .then(() => {
                console.log(`El usuario valorado ha sido ${this.state.selectedUser.username} y su nuevo rating es ${this.state.selectedUser.userRatings}`)
                // this.props.history.push("/editar-perfil");
                this.handleToast(true, '¡Cambios guardados!')
            })
            .catch((err) => console.log("Error", err));

    }

    handleInputChange = e => this.setState({ service: { ...this.state.service, [e.target.name]: e.target.value } })

    handleSelectedUserRating = e => {

        const inputValueConvertedToNumber = parseInt(e.target.value, 10)
        const updatedRatingsArray = this.state.selectedUser.userRatings.concat(inputValueConvertedToNumber);
        this.setState({ selectedUser: { ...this.state.selectedUser, [e.target.name]: updatedRatingsArray }, validationDone: true })
        console.log(`El rating que tenía ${this.state.selectedUser.username} es ${this.state.selectedUser.userRatings}`)
        console.log('La nueva valoración añadida al array userRatings es', inputValueConvertedToNumber)
        console.log('El nuevo array va a ser', updatedRatingsArray)
        this.handleServiceClosed()

    }


    handleImageUpload = (e) => {
        const uploadData = new FormData();
        uploadData.append("image", e.target.files[0]);
        console.log("ESTO ES UNA IMAGEN EN MEMORIA:", e.target.files[0]);

        this.setState({ uploadingActive: true });

        this.filesService
            .uploadImage(uploadData)
            .then((response) => {
                console.log(response)
                this.setState({
                    ...this.state.user, image: response.data.secure_url, uploadingActive: false,
                },

                );
            })
            .catch((err) => console.log("ERRORRR!", err));
    };


    handleAssistantData = e => {

        this.handleInputChange(e)

        setTimeout(() => {
            const user = this.state.users.find(elm => elm.username === this.state.service.assistant)
            this.setState({ selectedUser: user, isThereSelectedUser: true })
            // console.log('Este es el state', this.state)
            // console.log('El assistant al ejecutar la función es ', this.state.service.assistant)
        }, 0)

    }


    render() {

        return (
            <>
                <Container className="edit-service-bg">
                    <Row>
                        <Col md={{ span: 6, offset: 3 }}>
                            <h1>Editar publicación</h1>
                            <hr />
                            <Form onSubmit={this.handleSubmit}>
                                <Form.Group controlId="title">
                                    <Form.Label>Nombre</Form.Label>
                                    <Form.Control required type="text" /*size="lg"*/ name="name" value={this.state.service.name} onChange={this.handleInputChange} />
                                </Form.Group>
                                <Form.Group controlId="description">
                                    <Form.Label>Descripción</Form.Label>
                                    <Form.Control as="textarea" required rows={3} type="text" name="description" value={this.state.service.description} onChange={this.handleInputChange} />
                                </Form.Group>
                                <Form.Group controlId="situation">
                                    <Form.Label>Estado</Form.Label>
                                    <Form.Control
                                        as="select"
                                        name="situation"
                                        value={this.state.service.situation}
                                        onChange={this.handleInputChange}
                                    >
                                        <option value="">Seleccionar</option>
                                        <option value="Pendiente de ayuda">Pendiente de ayuda</option>
                                        <option value="En conversaciones">En conversaciones</option>
                                        <option value="Ayuda recibida">Ayuda recibida</option>
                                    </Form.Control>
                                </Form.Group>
                                {
                                    this.state.service.situation === 'Ayuda recibida' &&
                                    <>
                                        <Form.Group controlId="assistant">
                                            <Form.Label>Ayuda recibida por:</Form.Label>
                                            {this.state.service.assistant === this.props.loggedUser.username && <p className="username-message">El nombre de usuario introducido no puede ser el propio</p>}
                                            <Form.Control required type="text" placeholder='Introduzca el nombre del usuario que le ha ayudado' name="assistant" value={this.state.service.assistant} onChange={/*e => { this.handleInputChange(e); this.getSelectedUser(e)*/this.handleAssistantData} />
                                        </Form.Group>

                                        {
                                            this.state.service.assistant && this.state.service.serviceState === 'closed'
                                                ?
                                                <div className='validation-message'><span>Valoración registrada, haga click en 'Guardar cambios' para finalizar</span></div>
                                                :
                                                this.state.users.map((elm) => elm.username).includes(this.state.service.assistant) && this.state.selectedUser !== undefined && this.state.service.assistant !== this.props.loggedUser.username
                                                    ?
                                                    <>
                                                        <Form.Group controlId="userRating">
                                                            <Form.Label>Valore la ayuda recibida por el usuario</Form.Label>
                                                            <Form.Control
                                                                as="select"
                                                                name="userRatings"
                                                                value={this.state.selectedUser.userRatings}
                                                                onChange={this.handleSelectedUserRating}
                                                            >
                                                                <option value="">Seleccionar</option>
                                                                <option value="1">1</option>
                                                                <option value="2">2</option>
                                                                <option value="3">3</option>
                                                                <option value="4">4</option>
                                                                <option value="5">5</option>
                                                            </Form.Control>
                                                        </Form.Group>
                                                        {/* <div className={this.state.validationDone ? 'validation-message' : 'hide-validation'}><span>Valoración registrada, guarde cambios para finalizar</span></div> */}

                                                    </>
                                                    :
                                                    <div className="username-message"><span>Asegúrese de que el nombre de usuario introducido sea correcto</span></div>
                                        }
                                    </>
                                }
                                <Form.Group controlId="reward">
                                    <Form.Label>Recompensa</Form.Label>
                                    <Form.Control required type="text" name="reward" value={this.state.service.reward} onChange={this.handleInputChange} />
                                </Form.Group>
                                <Form.Group>
                                    <Form.Label>
                                        Imagen de la recompensa {this.state.uploadingActive && <Spinner />} <br />
                                        <img src={this.state.service.rewardImage} alt="Imagen de la recompensa" className="edit-img" />
                                    </Form.Label>
                                    {/* <div>
                                        <p>Posición de la imagen</p>
                                        <Button className="edit-button" size="sm">Centrar</Button>
                                        <Button className="edit-button" size="sm">Enfoque izquierda</Button>
                                        <Button className="edit-button" size="sm">Enfoque derecha</Button>
                                        <Button className="edit-button" size="sm">Abajo</Button>
                                    </div> */}
                                    <Form.Control type="file" onChange={this.handleImageUpload} />
                                </Form.Group>
                                <Button className="edit-button" size="sm" type="submit" disabled={this.state.service.assistant === this.props.loggedUser.username || this.state.uploadingActive}>{this.state.uploadingActive ? <><p style={{ margin: '0 auto' }}>Subiendo imagen <Spinner variant="light" size="sm" animation="border" style={{ marginBottom: '2px' }} /></p> </> : 'Guardar cambios'}</Button>
                            </Form>
                        </Col>
                    </Row>
                </Container>
                <Alert show={this.state.showToast} handleToast={this.handleToast} toastText={this.state.toastText} />
            </>
        )
    }
}

export default EditService