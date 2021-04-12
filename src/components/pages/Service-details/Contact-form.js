import React, { Component } from 'react';
import { Form, Col, Button } from 'react-bootstrap'
import MailService from './../../../services/mail.service'
import ServicesService from './../../../services/services.service'
import swal from 'sweetalert'
// import { useHistory } from 'react-router-dom'

class ContactForm extends Component {

    constructor(props) {
        super(props);
        this.state = {
            contactEmail: console.log('El contactEmail es', this.props.contactUser.email),
            // contactName: this.props.contactUser.name,
            name: this.props.loggedUser.name,
            subject: `${this.props.loggedUser.name} (${this.props.loggedUser.email}) quiere ayudarle con: ${this.props.serviceName}`,
            message: '',
            // service: this.props.service
        }
        this.mailService = new MailService()
        this.servicesService = new ServicesService()

    }

    // componentDidMount = () => {

    //     const service_id = this.props.serviceId

    //     this.servicesService
    //         .getService(service_id)
    //         .then(res => {
    //             this.setState( { ...this.state.service, service: res.data })
    //             console.log(res.data)
    //             console.log('El correo del owner es', this.props.service.owner.email)
    //         })
    //         .catch(err => console.log(err))
    // }


    handleSubmit = e => {
        e.preventDefault()
        this.mailService
            .sendMail(this.state)
            .then((response) => { alert('Mensaje enviado') })
            .catch(err => console.log(`Email no enviado`, err))

    }

    resetForm() {
        this.setState({ name: '', contactEmail: '', message: '' })
    }

    confirmMessage = () => {
        swal({
            title: "Mensaje enviado con éxito",
            icon: "success",
        })
        // .then(() => {
        //   const history = useHistory()
        //   history.push('/')
        // })
    }

    handleInputChange = e => this.setState({ [e.target.name]: e.target.value })


    render() {
        return (
            <section>
                {/* <Row>
                    <Col md={{ span: 6, offset: 3 }}>
                        <h3>Contacta con {this.state.contactName}</h3>
                    </Col>
                </Row> */}
                <Form onSubmit={this.handleSubmit}>
                    <Form.Row>
                        <Form.Group as={Col} controlId="formGridName">
                            <Form.Label>De</Form.Label>
                            <Form.Control type="text" placeholder="Introduce tu nombre" name="name" readOnly value={this.state.name} />
                        </Form.Group>

                        <Form.Group as={Col} controlId="formGridEmail">
                            <Form.Label>Para</Form.Label>
                            <Form.Control type="text" placeholder="Introducir email de destino" name="contactEmail" readOnly={this.state.contactEmail !== undefined ? true : false} value={this.state.contactEmail} />
                        </Form.Group>
                    </Form.Row>

                    <Form.Group controlId="formGridSubject">
                        <Form.Label>Asunto</Form.Label>
                        <Form.Control as="textarea" name="subject" rows={2} value={this.state.subject} onChange={this.handleInputChange} />
                    </Form.Group>

                    <Form.Group controlId="formGridAddress2">
                        <Form.Label>Mensaje</Form.Label>
                        <Form.Control as="textarea" rows={3} name="message" value={this.state.message} onChange={this.handleInputChange} />
                    </Form.Group>
                    <Button className="main-button btn-light" type="submit" onClick={this.confirmMessage}>Contactar</Button>
                </Form>
            </section>
        )
    }
}

export default ContactForm