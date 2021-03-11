import React, { Component } from 'react'
import ServicesService from './../../../services/services.service'
import FilesService from './../../../services/upload.service'
// import Dictaphone from './../../shared/Dictaphone/Dictaphone'
import unknownReward from './../Service-form/unknown-reward.png'
import { Form, Button, Spinner } from 'react-bootstrap'

class ServiceForm extends Component {

    constructor(props) {
        super(props)
        this.state = {
            service: {
                name: '',
                description: '',
                reward: '',
                rewardImage: unknownReward,
                province: this.props.loggedUser.province,
                owner: this.props.loggedUser ? this.props.loggedUser._id : ''
            },
            uploadingActive: false
        }
        this.servicesService = new ServicesService()
        this.filesService = new FilesService()
    }

    handleInputChange = e => this.setState({ service: { ...this.state.service, [e.target.name]: e.target.value } })

    handleSubmit = e => {
        e.preventDefault()
        this.servicesService
            .saveService(this.state.service)
            .then(res => {
                this.props.updateList()
                this.props.closeModal()
                this.props.handleToast(true, '¡Petición de ayuda creada!')
            })
            .catch(err => console.log(err))
    }


    handleImageUpload = e => {

        const uploadData = new FormData()
        uploadData.append('image', e.target.files[0])
        console.log('ESTO ES UNA IMAGEN EN MEMORIA:', e.target.files[0])

        this.setState({ uploadingActive: true })

        this.filesService
            .uploadImage(uploadData)
            .then(response => {
                this.setState({
                    service: { ...this.state.service, rewardImage: response.data.secure_url },
                    uploadingActive: false
                })
            })
            .catch(err => console.log('ERRORRR!', err))
    }


    render() {

        return (
            <>
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
                    <Form.Group>
                        <Form.Label>Imagen de la recompensa {this.state.uploadingActive && <Spinner />}</Form.Label>
                        <Form.Control type="file" onChange={this.handleImageUpload} />
                    </Form.Group>
                    <Button className="edit-button" size="sm" type="submit" disabled={this.state.uploadingActive}>{this.state.uploadingActive ? <><p style={{ margin: '0 auto' }}>Subiendo imagen <Spinner variant="light" size="sm" animation="border" style={{ marginBottom: '2px' }} /></p> </> : 'Publicar'}</Button>
                </Form>
            </>
        )
    }
}

export default ServiceForm