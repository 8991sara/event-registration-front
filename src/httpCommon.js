import Axios from 'axios';


const axiosBaseURL = Axios.create({
    baseURL:'http://192.168.88.232:8000/'
});
export default axiosBaseURL;