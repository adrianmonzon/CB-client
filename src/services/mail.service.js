import axios from 'axios'

export default class MailService {

    constructor() {
        this.apiHandler = axios.create({
            baseURL: 'http://localhost:5000/api',
            // baseURL: process.env.REACT_APP_API_URL,
            withCredentials: true
        });
    }


    sendMail = mailInfo => this.apiHandler.post('/mail/send-email', mailInfo)
}