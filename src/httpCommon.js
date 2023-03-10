import Axios from 'axios';


const axiosBaseURL = Axios.create({
    baseURL:'http://192.168.1.12:8000/'
});
export default axiosBaseURL;