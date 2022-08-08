import axios from 'axios';

const request = axios.create({
    baseUrl: 'http://localhost:8080/'
});

export default request;
