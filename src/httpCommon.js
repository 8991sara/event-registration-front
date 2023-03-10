import Axios from 'axios';


const axiosBaseURL = Axios.create({
    baseURL:'http://127.0.0.1:8000/'
});
export default axiosBaseURL;