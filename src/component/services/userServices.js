import axios from 'axios';
import urls from '../urls';
const userServices = {
    create : (obj) => {
        return axios.post(urls+'/insert/createUser',obj)
    },
    authenticate: (obj) => {
        return axios.post(urls+'/fetch/auth',obj)
    }
}

export default userServices;