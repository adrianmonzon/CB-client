import React, { Component } from "react"
import ServicesService from "./../../../../services/services.service"
import FilesService from "./../../../../services/upload.service"
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
                owner: this.props.loggedUser._id,
            },
            uploadingActive: false,
            showToast: false,
            toastText: "",
        }

        this.serviceService = new ServicesService()
        this.filesService = new FilesService()

    }
    componentDidMount() {
        const service_id = this.props.match.params.service_id
        this.serviceService
            .getService(service_id)
            .then(res => this.setState({ service: res.data }))
            .catch(err => console.log(err))
    }

    handleToast = (visible, text) => this.setState({ showToast: visible, toastText: text })

    handleSubmit = e => {
        e.preventDefault()
        this.serviceService
            .updateService(this.state.service._id, this.state.service)
            .then(res => {
                this.handleToast(true, '¡Cambios guardados!')
                // this.props.history.push(`/mis-servicios/${res.data._id}`)
            })
            .catch(err => console.log(err))
    }

    handleInputChange = e => this.setState({ service: { ...this.state.service, [e.target.name]: e.target.value } })

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

    // handleImagePosition = () => {
    //     <p></p>
    // }

    render() {

        return (
            <>
                <Container>
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
                                <Form.Group controlId="reward">
                                    <Form.Label>Recompensa</Form.Label>
                                    <Form.Control required type="text" name="reward" value={this.state.service.reward} onChange={this.handleInputChange} />
                                </Form.Group>
                                <Form.Group>
                                    <Form.Label>
                                        Imagen de la recompensa {this.state.uploadingActive && <Spinner />} <br />
                                        <img src={this.state.service.rewardImage} alt="Imagen de la recompensa" className="edit-img"/>
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
                                <Button className="edit-button" size="sm" type="submit" disabled={this.state.uploadingActive}>{this.state.uploadingActive ? <><p style={{ margin: '0 auto' }}>Subiendo imagen <Spinner variant="light" size="sm" animation="border" style={{ marginBottom: '2px' }} /></p> </> : 'Guardar cambios'}</Button>
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