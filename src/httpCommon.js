import Axios from 'axios';


const axiosBaseURL = Axios.create({
    baseURL:'http://10.4.4.107:8000/'
});
export default axiosBaseURL;