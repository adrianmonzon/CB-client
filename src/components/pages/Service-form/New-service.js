import React, { Component } from 'react'
import ServicesService from '../../../services/services.service'
// import FilesService from './../../../service/upload.service'
// import Dictaphone from './../../shared/Dictaphone/Dictaphone'
import { useHistory } from 'react-router-dom'
import { Form, Button, Spinner, Container } from 'react-bootstrap'
import Alert from './../../shared/Alert/Alert'

class CreateService extends Component {

    constructor(props) {
        super(props)
        this.state = {
            service: {
                name: '',
                description: '',
                reward: '',
                owner: this.props.loggedUser ? this.props.loggedUser._id : ''
            },
            uploadingActive: false,
            showToast: false,
            toastText: ""
        }
        this.servicesService = new ServicesService()
        // this.filesService = new FilesService()
    }

    handleInputChange = e => this.setState({ service: { ...this.state.service, [e.target.name]: e.target.value } })

    handleToast = (visible, text) => this.setState({ showToast: visible, toastText: text })

    redirectToServices = () => {
        {this.props.history.push('/servicios')}
    }

    handleSubmit = e => {
        e.preventDefault()
        this.servicesService
            .saveService(this.state.service)
            .then(res => {
                this.handleToast(true, '¡Servicio creado!')
                // this.props.history.push('/servicios')
                setTimeout(() => this.redirectToServices() , 800)
            })
            .catch(err => console.log(err))
    }


    // handleImageUpload = e => {

    //     const uploadData = new FormData()
    //     uploadData.append('imageUrl', e.target.files[0])
    //     console.log('ESTO ES UNA IMAGEN EN MEMORIA:', e.target.files[0])

    //     this.setState({ uploadingActive: true })

    //     this.filesService
    //         .uploadImage(uploadData)
    //         .then(response => {
    //             this.setState({
    //                 service: { ...this.state.service, imageUrl: response.data.secure_url },
    //                 uploadingActive: false
    //             })
    //         })
    //         .catch(err => console.log('ERRORRR!', err))
    // }


    render() {

        return (
            <>
                <Container>
                    <h1>Pedir ayuda</h1>
                    <hr />
                    <Form onSubmit={this.handleSubmit}>
                        <Form.Group controlId="title">
                            <Form.Label>¿Qué necesita?</Form.Label>
                            <Form.Control required type="text" placeholder="Ej.: Necesito que me traigan la compra a casa, gracias." name="name" value={this.state.service.name} onChange={this.handleInputChange} />
                        </Form.Group>
                        <Form.Group controlId="description">
                            <Form.Label>Descripción</Form.Label>
                            <Form.Control as="textarea" required rows={3} type="text" placeholder="Ej.: No puedo cargar peso y las bolsas pesan demasiado para mí." name="description" value={this.state.service.description} onChange={this.handleInputChange} />
                        </Form.Group>
                        <Form.Group controlId="reward">
                            <Form.Label>Recompensa</Form.Label>
                            <Form.Control required type="text" placeholder="Ej.: Pastel casero." name="reward" value={this.state.service.reward} onChange={this.handleInputChange} />
                        </Form.Group>

                        <Button className="edit-button" size="sm" variant="dark" type="submit" disabled={this.state.uploadingActive}>{this.state.uploadingActive ? 'Subiendo imagen...' : 'Publicar'}</Button>
                    </Form>
                    <Alert className="service-added" show={this.state.showToast} handleToast={this.handleToast} toastText={this.state.toastText} />
                </Container>


            </>
        )
    }
}

export default CreateService