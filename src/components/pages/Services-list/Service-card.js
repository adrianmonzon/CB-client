import { Col, Card, Button, Accordion, Row } from 'react-bootstrap'
import './Service-card.css'
import { Link } from 'react-router-dom'
import arrow from './arrow.ico'


const ServiceCard = ({ name, _id, reward, owner }) => {

    return (
        <Col className="text-center" lg={12}>
            {/* {console.log(owner)} */}
            <Card className="service-card text-center">
                <Row className="no-gutters">
                    <Col md="4">
                        <Card.Img top variant="top" src={owner ? owner.image : <></>} />
                        {owner ? //esto se pone porque como tengo algunos creados del seed sin owner, para que separarlos de los que sí tienen
                            <Card.Text className="card-name">{owner.username}, {owner.province}</Card.Text>
                            :
                            <><p>nombre</p></>
                        }
                    </Col>
                    <Col md="8">

                        <Card.Body>
                            <Card.Title>{name}</Card.Title>
                            <div className="button-position">
                                <Link className="btn btn-info btn-sm card-button" to={`/servicios/${_id}`}><img
                                    alt="Imagen de usuario"
                                    src={arrow}
                                    style={{height: '20px', textAlign: 'center', width: '15px'}}
                                    className="button-card-img"
                                /></Link>
                            </div>
                            <hr />
                            <Card.Text>Recompensa: {reward}</Card.Text>
                            {/* <Accordion>
                    <Accordion.Toggle as={Button} variant="link" eventKey="0">
                        Recompensa
                    </Accordion.Toggle>
                    <Accordion.Collapse eventKey="0">
                        <Card.Body>{reward}</Card.Body>
                    </Accordion.Collapse>
                    </Accordion> */}
                        </Card.Body>
                    </Col>
                </Row>
            </Card>
        </Col>
    )
}

export default ServiceCard

// import React from 'react';
// import { MDBBtn, MDBCard, MDBCardBody, MDBCardImage, MDBCardTitle, MDBCardText, MDBRow, MDBCol, MDBIcon } from 'mdbreact';

// const ServiceCard = ({ name, _id, reward, owner }) => {
//     return (
//         <MDBRow>
//             <MDBCol md="4">
//                 <MDBCard cascade>
//                     <div className="div-card-button">
//                     <MDBCardImage
//                         cascade
//                         className='img-fluid card-img'
//                         overlay="white-light"
//                         hover
//                         src='https://mdbootstrap.com/img/Photos/Others/food.jpg'
//                     />
//                         <Link className="btn btn-info btn-circle btn-sm card-button" to={`/servicios/${_id}`}>Go</Link>
//                     </div>
//                     <MDBCardBody cascade>
//                         <MDBCardTitle>{name}</MDBCardTitle>
//                         {owner ? <small> Por {owner.username}</small> : <p></p>}
//                         <hr />
//                         <MDBCardText>
//                             Recompensa: {reward}
//                         </MDBCardText>
//                     </MDBCardBody>
//                     <div className='rounded-bottom mdb-color lighten-3 text-center pt-3' style={{ backgroundColor: "grey" }}>
//                         <ul className='list-unstyled list-inline font-small'>
//                             <li className='list-inline-item pr-2 white-text'>
//                                 <MDBIcon far icon='clock' /> 05/10/2015
//               </li>
//                             <li className='list-inline-item pr-2'>
//                                 <a href='#!' className='white-text'>
//                                     <MDBIcon far icon='comments' className='mr-1' />
//                   12
//                 </a>
//                             </li>
//                             <li className='list-inline-item pr-2' >
//                                 <a href='#!' className='white-text'>
//                                     <MDBIcon fab icon='facebook-f' className='mr-1' />
//                   21
//                 </a>
//                             </li>
//                             <li className='list-inline-item'>
//                                 <a href='#!' className='white-text'>
//                                     <MDBIcon fab icon='twitter' className='mr-1' />5
//                 </a>
//                             </li>
//                         </ul>
//                     </div>
//                 </MDBCard>
//             </MDBCol>
//         </MDBRow>
//     )
// }

// export default ServiceCard;