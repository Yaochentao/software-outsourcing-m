import axios from 'axios'
const host = 'http://127.0.0.1'
// axios.defaults.baseURL = 'http://192.168.43.108';
axios.defaults.baseURL = 'http://127.0.0.1';

export const requseLogin = params => {
    return axios.post('/api/login.php', params);
}
