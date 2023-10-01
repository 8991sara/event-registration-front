import Axios from 'axios';


const axiosBaseURL = Axios.create({
    baseURL:'http://192.168.15.26:8000/'
});
export default axiosBaseURL;
