import Axios from 'axios';


const axiosBaseURL = Axios.create({
    baseURL:'http://192.168.88.253:8000/'
});
export default axiosBaseURL;