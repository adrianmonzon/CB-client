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
            contactEmail: process.env.REACT_APP_HELP_EMAIL, //a quién va dirigido el correo, en este caso a la misma cuenta de empresa ya que el correo es para nosotros mismos de parte de los usuarios que preguntan
            sender: '',
            subject: '',
            message: '',
        }
        this.mailService = new MailService()
        this.servicesService = new ServicesService()

    }

    handleSubmit = e => {
        e.preventDefault()
        this.mailService
            .sendMail(this.state)
            // .then(() => { alert('Mensaje enviado') })
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
                        <Form.Group as={Col} controlId="formGridSender">
                            <Form.Label>Email</Form.Label>
                            <Form.Control type="email" placeholder="Introduce tu email" name="sender" value={this.state.sender} onChange={this.handleInputChange}  />
                        </Form.Group>
                        {/* <Form.Group controlId="formGridName">
                            <Form.Label>Email</Form.Label>
                            <Form.Control type="text" name="name" placeholder="Introduce tu email" value={this.state.name} onChange={this.handleInputChange} />
                        </Form.Group> */}
                    </Form.Row>
                    <Form.Group controlId="formGridSubject">
                        <Form.Label>Asunto</Form.Label>
                        <Form.Control as="textarea" name="subject" rows={1} value={this.state.subject} onChange={this.handleInputChange} />
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