import axios from 'axios'

export default class MailService {

    constructor() {
        this.apiHandler = axios.create({
            baseURL: process.env.REACT_APP_API_URL, /*'http://localhost:5000/api',*/
            withCredentials: true
        })
    }


    sendMail = mailInfo => this.apiHandler.post(`/mail/send-email`, mailInfo)
}