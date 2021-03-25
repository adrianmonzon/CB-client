import { Col, Container } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import video from './../index/video-mezclado3.mp4'

import './Home.css'

const Home = () => {

    return (
        <Container>
            <section className="text-center Home">
                <Col md={{ span: 6 }}>
                    <video autoPlay muted loop id="video">
                        <source src={video} />
                    </video>
                    <article id="firstMessage">
                        <p>Pida lo que necesite...</p>
                    </article>
                    <article id="secondMessage">
                        <p>...y alguien acudirá en su ayuda</p>
                    </article>
                    <article id="thirdMessage">
                        <p>Comenzar</p>
                        <Link className="btn btn-outline-light btn-lg home-button" to={`/servicios`}>Acceder</Link>
                    </article>
                </Col >
            </section>
        </Container>
    )
}



export default Home