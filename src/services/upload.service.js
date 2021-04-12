import axios from "axios";

export default class FilesService {
    constructor() {
        this.apiHandler = axios.create({
            // baseURL: 'http://localhost:5000/api',
            baseURL: process.env.REACT_APP_API_URL,
            withCredentials: true,
        });
    }

    uploadImage = (imageForm) => this.apiHandler.post("/files/upload", imageForm);
}
