import React from "react";
import { MDBContainer, MDBFooter } from "mdbreact";
import './Footer.css'
import { withRouter } from 'react-router-dom'

const FooterPagePro = (props) => {
    return (
        <MDBFooter className={props.location.pathname === "/" ? "index-footer" : "footer"}>
            <div className="footer-copyright text-center py-1">
                <MDBContainer fluid>
                    &copy; {new Date().getFullYear()} Copyright: Adrián Monzón
                </MDBContainer>
            </div>
        </MDBFooter>
    );
}

export default withRouter(FooterPagePro);
