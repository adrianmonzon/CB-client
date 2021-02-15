import React, { Component } from "react"
import ServicesService from "./../../../../services/services.service"
import { Container, Row, Col, Form, Button } from "react-bootstrap"

// import Autocomplete from "./../Autocomplete-form/Autocomplete-form"

class EditService extends Component {
    constructor(props) {
        super(props)
        this.state = {
            service: {
                name: "",
                description: "",
                reward: "",
                owner: this.props.loggedUser._id,
            },
            uploadingActive: false,
        }

        this.serviceService = new ServicesService()
    }
    componentDidMount() {
        const service_id = this.props.match.params.service_id
        this.serviceService
            .getService(service_id)
            .then(res => this.setState({ service: res.data }))
            .catch(err => console.log(err))


    }
    handleSubmit = e => {
        e.preventDefault()
        this.serviceService
            .updateService(this.state.service._id, this.state.service)
            .then(res => this.props.history.push(`/mis-servicios/${res.data._id}`))
            .catch(err => console.log(err))
    }

    handleInputChange = e => this.setState({ service: { ...this.state.service, [e.target.name]: e.target.value } })

    render() {

        return (
            <>
                <Container>
                    <Row>
                        <Col md={{ span: 6, offset: 3 }}>
                             <h1>Editar servicio</h1>
                            <hr  />
                            <Form onSubmit={this.handleSubmit}>
                                <Form.Group controlId="title">
                                    <Form.Label>Nombre</Form.Label>
                                    <Form.Control required type="text" name="name" value={this.state.service.name} onChange={this.handleInputChange} />
                                </Form.Group>
                                <Form.Group controlId="description">
                                    <Form.Label>Descripción</Form.Label>
                                    <Form.Control as="textarea" required rows={3} type="text" name="description" value={this.state.service.description} onChange={this.handleInputChange} />
                                </Form.Group>
                                <Form.Group controlId="reward">
                                    <Form.Label>Recompensa</Form.Label>
                                    <Form.Control required type="text" name="reward" value={this.state.service.reward} onChange={this.handleInputChange} />
                                </Form.Group>

                                <Button className="edit-button" size="sm" variant="dark" type="submit" disabled={this.state.uploadingActive}>{this.state.uploadingActive ? 'Subiendo imagen...' : 'Guardar cambios'}</Button>
                            </Form>
                        </Col>
                    </Row>
                </Container>
            </>
        )
    }
}

export default EditService