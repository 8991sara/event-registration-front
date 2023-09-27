import Axios from 'axios';


const axiosBaseURL = Axios.create({
    baseURL:'http://192.168.12.59:8000/'
});
export default axiosBaseURL;
