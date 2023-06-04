import axios from 'axios';

const data = JSON.parse(localStorage.getItem('user'));
let token = null;
if(data) {
    token = data.token;
}
const request = axios.create({
    baseURL: 'http://localhost:8080/api/',
    headers : {
        'Authorization' : 'Bearer ' + token.trim(),
    }
});

export default request;
