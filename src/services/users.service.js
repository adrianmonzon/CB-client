import axios from "axios";

export default class UserService {
    constructor() {
        this.apiHandler = axios.create({
            baseURL: process.env.REACT_APP_API_URL, /*"http://localhost:5000/api",*/
            withCredentials: true,
        });
    }

    // getUsers = () => this.apiHandler.get("/users/getAllUsers");
    getUser = (userId) => this.apiHandler.get(`/users/getOneUser/${userId}`);
    saveUser = (userInfo) => this.apiHandler.post(`/users/newUser/`, userInfo);
    updateUser = (userId, userInfo) => this.apiHandler.put(`/users/editUser/${userId}`, userInfo)
    deleteUser = (userId) => this.apiHandler.delete(`/users/deleteUser/${userId}`);
    removeService = (serviceId, userId) => this.apiHandler.put(`/users/removeService/${serviceId}`, { userId })
    saveService = (serviceId, userId) => this.apiHandler.put(`/users/saveService/${serviceId}`, { userId })
}