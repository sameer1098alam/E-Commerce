import axios from 'axios';
import urls from '../urls';
const userServices = {
    create : (obj) => {
        return axios.post(urls+'/insert' ,obj)
    },
    authenticate: (obj) => {
        return axios.post(urls+'/fetch',obj)
    }
}
export default userServices;

