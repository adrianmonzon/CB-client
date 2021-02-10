import { Col, Container, Row } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import video from './../index/video-mezclado-2.mp4'

import './Home.css'

const Home = () => {

    return (
        <Container>
            {/* <Row> */}
            <section className="text-center Home">
                <Col md={{ span: 6 }}>
                    <video autoPlay muted loop id="video">
                        <source src={video} />
                    </video>
                    <article id="firstMessage">
                        <p>Pida el servicio que necesite...</p>
                    </article>
                    <article id="secondMessage">
                        <p>...y alguien acudirá en su ayuda</p>
                    </article>
                    <article id="thirdMessage">
                        <p>Comenzar</p>
                        <Link className="btn btn-outline-light btn-sm home-button" to={`/servicios`}>Ver servicios</Link>
                    </article>
                </Col >
            </section>
            {/* </Row> */}
        </Container>
    )
}



export default Home