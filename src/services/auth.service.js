import axios from 'axios'

export default class AuthService {

    constructor() {
        this.apiHandler = axios.create({
            baseURL: 'http://localhost:5000/api',
            // baseURL: process.env.REACT_APP_API_URL,
            withCredentials: true
        })
    }

    signup = credentials => this.apiHandler.post('/auth/signup', credentials)
    login = credentials => this.apiHandler.post('/auth/login', credentials)
    logout = () => this.apiHandler.post('/auth/logout')
    isLoggedIn = () => this.apiHandler.get('/auth/loggedin')
}