import axios from "axios";

export default class ServiceService {
    constructor() {
        this.apiHandler = axios.create({
            baseURL: /*process.env.REACT_APP_API_URL,*/ "http://localhost:5000/api/services",
            withCredentials: true,
        });
    }

    getServices = () => this.apiHandler.get("/getAllServices");
    getService = (serviceId) => this.apiHandler.get(`/getOneService/${serviceId}`);
    saveService = (serviceInfo) => this.apiHandler.post(`/newService/`, serviceInfo);
    // updateService = (serviceId, serviceInfo) => this.apiHandler.put(`/editService/${serviceId}`, serviceInfo)
    filterByProvince = province => this.apiHandler.get(`/filterByProvince/${province}`);
    // deleteService = (serviceId) => this.apiHandler.delete(`/deleteService/${serviceId}`);
    getAllServicesFromUser = userId => this.apiHandler.get(`/getAllServicesFromUser/${userId}`)
}
