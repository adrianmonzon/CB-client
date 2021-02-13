import React, { Component } from "react"
import UsersService from "../../../../services/users.service"


import "./Edit-profile.css";

import { Container, Row, Col, Form, Button, Spinner } from "react-bootstrap";

class EditForm extends Component {
    constructor(props) {
        super(props);
        this.state = {
            username: this.props.user.username,
            name: this.props.user.name,
            // description: this.props.user.description,
            province: this.props.user.province,
            age: this.props.user.age,
            email: this.props.user.email,
        };
        this.usersService = new UsersService();
    }

    handleInputChange = (e) => this.setState({ [e.target.name]: e.target.value });

    handleSubmit = (e) => {
        e.preventDefault();

        this.usersService
            .updateUser(this.props.user._id, this.state)
            .then((theLoggedInUser) => {
                this.props.storeUser(theLoggedInUser.data);
                this.props.history.push("/editar-perfil");
            })
            .catch((err) => console.log("Error", err));
    };



    render() {
        return (
            <section className="edit">
                <Container>
                    <Row>
                        <Col md={{ span: 6, offset: 3 }}>
                            <h1>Editar perfil</h1>
                            <hr className="hr" />
                            <Form onSubmit={this.handleSubmit}>
                                <Form.Group controlId="username">
                                    <Form.Label>Nombre de usuario</Form.Label>
                                    <Form.Control
                                        type="text"
                                        placeholder="Ej. amadeus1756"
                                        name="username"
                                        value={this.state.username}
                                        onChange={this.handleInputChange}
                                    />
                                </Form.Group>
                                <Form.Group controlId="name">
                                    <Form.Label>Nombre y apellidos</Form.Label>
                                    <Form.Control
                                        type="text"
                                        placeholder="Ej. Wolfgang Amadeus Mozart"
                                        name="name"
                                        value={this.state.name}
                                        onChange={this.handleInputChange}
                                    />
                                </Form.Group>
                                <Form.Group controlId="email">
                                    <Form.Label>Email</Form.Label>
                                    <Form.Control
                                        type="email"
                                        name="email"
                                        value={this.state.email}
                                        onChange={this.handleInputChange}
                                    />
                                </Form.Group>

                                {/* <Form.Group controlId="description">
                                    <Form.Label>Descripción</Form.Label>
                                    <Form.Control
                                        as="textarea"
                                        rows={3}
                                        type="text"
                                        name="description"
                                        value={this.state.description}
                                        onChange={this.handleInputChange}
                                    />
                                </Form.Group> */}
                                <Form.Group controlId="province">
                                    <Form.Label>Provincia</Form.Label>
                                    <Form.Control
                                        as="select"
                                        name="province"
                                        value={this.state.province}
                                        onChange={this.handleInputChange}
                                    >
                                        <option value="">Seleccionar</option>
                                        <option value="Álava">Álava</option>
                                        <option value="Albacete">Albacete</option>
                                        <option value="Alicante">Alicante</option>
                                        <option value="Almería">Almería</option>
                                        <option value="Asturias">Asturias</option>
                                        <option value="Ávila">Ávila</option>
                                        <option value="Badajoz">Badajoz</option>
                                        <option value="Baleares">Baleares</option>
                                        <option value="Barcelona">Barcelona</option>
                                        <option value="Burgos">Burgos</option>
                                        <option value="Cáceres">Cáceres</option>
                                        <option value="Cádiz">Cádiz</option>
                                        <option value="Cantabria">Cantabria</option>
                                        <option value="Castellón">Castellón</option>
                                        <option value="Ceuta">Ceuta</option>
                                        <option value="Ciudad Real">Ciudad Real</option>
                                        <option value="Córdoba">Córdoba</option>
                                        <option value="Cuenca">Cuenca</option>
                                        <option value="Gerona/Girona">Gerona/Girona</option>
                                        <option value="Granada">Granada</option>
                                        <option value="Guadalajara">Guadalajara</option>
                                        <option value="Guipúzcoa">Guipúzcoa</option>
                                        <option value="Huelva">Huelva</option>
                                        <option value="Huesca">Huesca</option>
                                        <option value="Jaén">Jaén</option>
                                        <option value="La Coruña">La Coruña</option>
                                        <option value="La Rioja">La Rioja</option>
                                        <option value="Las Palmas">Las Palmas</option>
                                        <option value="León">León</option>
                                        <option value="Lérida">Lérida/Lleida</option>
                                        <option value="Lugo">Lugo</option>
                                        <option value="Madrid">Madrid</option>
                                        <option value="Málaga">Málaga</option>
                                        <option value="Melilla">Melilla</option>
                                        <option value="Murcia">Murcia</option>
                                        <option value="Navarra">Navarra</option>
                                        <option value="Orense">Orense/Ourense</option>
                                        <option value="Palencia">Palencia</option>
                                        <option value="Pontevedra">Pontevedra</option>
                                        <option value="Salamanca">Salamanca</option>
                                        <option value="Segovia">Segovia</option>
                                        <option value="Sevilla">Sevilla</option>
                                        <option value="Soria">Soria</option>
                                        <option value="Tarragona">Tarragona</option>
                                        <option value="Tenerife">Tenerife</option>
                                        <option value="Teruel">Teruel</option>
                                        <option value="Toledo">Toledo</option>
                                        <option value="Valencia">Valencia</option>
                                        <option value="Valladolid">Valladolid</option>
                                        <option value="Vizcaya">Vizcaya/Bizkaia</option>
                                        <option value="Zamora">Zamora</option>
                                        <option value="Zaragoza">Zaragoza</option>
                                    </Form.Control>
                                </Form.Group>
                                <Form.Group controlId="age">
                                    <Form.Label>Edad</Form.Label> <small>(Mínimo 16 años)</small>
                                    <Form.Control
                                        type="number"
                                        name="age"
                                        value={this.state.age}
                                        onChange={this.handleInputChange}
                                    />
                                </Form.Group>
                                <Button type="submit" className="btn-sm edit-button">
                                    Guardar
                                </Button>
                            </Form>
                        </Col>
                    </Row>
                </Container>
            </section>
        );
    }
}

export default EditForm;
