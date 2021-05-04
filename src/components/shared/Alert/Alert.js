import { Toast } from 'react-bootstrap'
// import logo from './white-logo.png'

const Alert = ({ show, toastText, handleToast }) => {
    return (
        <Toast show={show} onClose={() => handleToast(false)} delay={3000} autohide style={{ position: 'fixed', bottom: 30, right: 10, width: 500, color: 'white', backgroundColor: '#0B98D5' }}>
            <Toast.Header style={{ backgroundColor: '#45bff3', color: 'snow'}}>
                {/* <img src={logo} className="rounded mr-2" alt="logo" style={{ width: 20, height: 20, objectFit: 'cover' }} /> */}
                <strong className="mr-auto" style={{fontSize: '20px'}}>Mensaje del sistema</strong>
            </Toast.Header>
            <Toast.Body><p style={{fontSize: '20px'}}>{toastText}</p></Toast.Body>
        </Toast>
    )
}

export default Alert