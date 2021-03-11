import React, { Component } from "react";
import AuthService from "./../../../services/auth.service";
import FilesService from "./../../../services/upload.service"
import Alert from './../../shared/Alert/Alert'

// import "./Signup.css";

import { Container, Row, Col, Form, Button, Spinner } from "react-bootstrap";
import LocationSearchInput from "./Autocomplete";

class Signup extends Component {
    constructor(props) {
        super(props);
        this.state = {
            user: {
                username: "",
                name: "",
                password: "",
                rating: "",
                age: "",
                image: "https://upload.wikimedia.org/wikipedia/commons/thumb/b/bc/Unknown_person.jpg/925px-Unknown_person.jpg",
                email: "",
                province: "",
                location: { type: "Point", coordinates: [] }
            },
            uploadingActive: false,
            showToast: false,
            toastText: ''
        };
        this.authService = new AuthService();
        this.filesService = new FilesService();
    }

    handleInputChange = (e) =>
        this.setState({
            user: { ...this.state.user, [e.target.name]: e.target.value },
        });

    handleSubmit = (e) => {
        e.preventDefault();

        this.authService
            .signup(this.state.user)
            .then((theLoggedInUser) => {
                this.props.storeUser(theLoggedInUser.data);
                this.props.history.push("/servicios");
            })
            .catch((err) => this.setState({ showToast: true, toastText: err.response.data.message }))
    };

    handleToast = (visible, text) => this.setState({ showToast: visible, toastText: text })

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
                    user: { ...this.state.user, image: response.data.secure_url },
                    uploadingActive: false,
                });
            })
            .catch((err) => console.log("ERRORRR!", err));
    };

    setLocation = (newCoordinates) => {
        const newLocation = { type: "Point", coordinates: newCoordinates }
        this.setState({ user: { ...this.state.user, location: newLocation } })
    }

    render() {
        return (
            <section className="signup">
                <Container>
                    <Row>
                        <Col md={{ span: 6, offset: 3 }}>
                            <h1>Registro de usuario</h1>
                            <hr />
                            <Form onSubmit={this.handleSubmit}>
                                <Form.Group controlId="username">
                                    <Form.Label>Nombre de usuario</Form.Label>
                                    <Form.Control
                                        type="text"
                                        placeholder="Ej. usuario2021"
                                        name="username"
                                        value={this.state.username}
                                        onChange={this.handleInputChange}
                                        required
                                    />
                                </Form.Group>
                                <Form.Group controlId="name">
                                    <Form.Label>Nombre y apellidos</Form.Label>
                                    <Form.Control
                                        type="text"
                                        name="name"
                                        value={this.state.name}
                                        onChange={this.handleInputChange}
                                        required
                                    />
                                </Form.Group>
                                <Form.Group controlId="email">
                                    <Form.Label>Email</Form.Label>
                                    <Form.Control
                                        type="email"
                                        name="email"
                                        value={this.state.email}
                                        onChange={this.handleInputChange}
                                        required
                                    />
                                </Form.Group>
                                <Form.Group controlId="password">
                                    <Form.Label>Contraseña</Form.Label>
                                    <Form.Control
                                        type="password"
                                        name="password"
                                        value={this.state.password}
                                        onChange={this.handleInputChange}
                                        required
                                    />
                                    <small>Debe contener al menos 5 caracteres</small>
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
                                        required
                                    />
                                </Form.Group> */}
                                <Form.Group controlId="age">
                                    <Form.Label>Edad</Form.Label>
                                    <Form.Control
                                        type="number"
                                        name="age"
                                        value={this.state.age}
                                        onChange={this.handleInputChange}
                                        required
                                    />
                                    <small>Mínimo 18 años</small>
                                </Form.Group>
                                <Form.Group controlId="province">
                                    <Form.Label>Provincia</Form.Label>
                                    <Form.Control
                                        required
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
                                <Form.Group>
                                    <Form.Label>Localidad</Form.Label>
                                    <LocationSearchInput setLocation={this.setLocation} />
                                </Form.Group>
                                <Form.Group>
                                    <Form.Label>
                                        Imagen {this.state.uploadingActive && <Spinner />}
                                    </Form.Label>
                                    <Form.Control type="file" onChange={this.handleImageUpload} />
                                </Form.Group>
                                <Button className="edit-button" type="submit" disabled={this.state.uploadingActive}> {this.state.uploadingActive ? <><p style={{ margin: '0 auto' }}>Subiendo imagen <Spinner variant="light" size="sm" animation="border" style={{ marginBottom: '2px' }} /></p> </> : "Registrarme"}</Button>
                            </Form>
                        </Col>
                    </Row>
                </Container>
                <Alert show={this.state.showToast} handleToast={this.handleToast} toastText={this.state.toastText} />
            </section>
        );
    }
}

export default Signup;