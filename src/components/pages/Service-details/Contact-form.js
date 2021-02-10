import React, { Component } from 'react';
import { Form, Col, Button, Row } from 'react-bootstrap'
// import MailService from './../../../service/mail.service'
import swal from 'sweetalert'
// import { useHistory } from 'react-router-dom'

class ContactForm extends Component {

    constructor(props) {
        super(props)
        this.state = {
            contactEmail: this.props.contactUser.email,
            contactName: this.props.contactUser.name,
            name: this.props.loggedUser.name,
            subject: `${this.props.loggedUser.name} quiere contactar contigo`,
            message: ''
        }
        // this.mailService = new MailService()
    }


    // handleSubmit = e => {
    //     e.preventDefault()
    //     this.mailService.sendMail(this.state)
    //         .then((response) => {
    //             if (response.data.status === 'success') {
    //                 alert("Message Sent.");
    //                 this.resetForm()
    //             } else if (response.data.status === 'fail') {
    //                 alert("Message failed to send.")
    //             }
    //         })
    // }

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
                <Row>
                    <Col md={{ span: 6, offset: 3 }}>
                        <h3>Contacta con {this.state.contactName}</h3>
                    </Col>
                </Row>
                <Form onSubmit={this.handleSubmit}>
                    <Form.Row>
                        <Form.Group as={Col} controlId="formGridName">
                            <Form.Label>De</Form.Label>
                            <Form.Control type="text" placeholder="Enter name" name="name" readOnly value={this.state.name} />
                        </Form.Group>

                        <Form.Group as={Col} controlId="formGridEmail">
                            <Form.Label>Para</Form.Label>
                            <Form.Control type="text" placeholder="Enter email" name="contactEmail" readOnly value={this.state.contactEmail} />
                        </Form.Group>
                    </Form.Row>

                    <Form.Group controlId="formGridSubject">
                        <Form.Label>Asunto</Form.Label>
                        <Form.Control type="text" name="subject" value={this.state.subject} onChange={this.handleInputChange} />
                    </Form.Group>

                    <Form.Group controlId="formGridAddress2">
                        <Form.Label>Mensaje</Form.Label>
                        <Form.Control as="textarea" rows={3} name="message" value={this.state.message} onChange={this.handleInputChange} />
                    </Form.Group>
                    <Row>
                        <Col md={{ span: 4, offset: 5 }}>
                            <Button className="btn btn-sm btn-info details-button" type="submit" onClick={this.confirmMessage}>Contactar</Button>
                        </Col>
                    </Row>
                </Form>
            </section>
        )
    }
}

export default ContactForm