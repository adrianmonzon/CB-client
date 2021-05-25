import axios from "axios"

export default class ServiceService {
    constructor() {
        this.apiHandler = axios.create({
            // baseURL: 'http://localhost:5000/api',
            baseURL: process.env.REACT_APP_API_URL,
            withCredentials: true
        })
    }

    getServices = () => this.apiHandler.get("/services/getAllServices")
    getService = (serviceId) => this.apiHandler.get(`/services/getOneService/${serviceId}`)
    saveService = (serviceInfo) => this.apiHandler.post(`/services/newService/`, serviceInfo)
    updateService = (serviceId, serviceInfo) => this.apiHandler.put(`/services/editService/${serviceId}`, serviceInfo)
    filterByProvince = province => this.apiHandler.get(`/services/filterByProvince/${province}`)
    deleteService = (serviceId) => this.apiHandler.delete(`/services/deleteService/${serviceId}`)
    getAllServicesFromUser = userId => this.apiHandler.get(`/services/getAllServicesFromUser/${userId}`)
    filterBySituation = situation => this.apiHandler.get(`/services/filterBySituation/${situation}`)
    // filterBySituationProvince = (situation, province) => this.apiHandler.get(`/services/filterBySituationProvince/${situation}&${province}`)
}
