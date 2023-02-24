import Axios from 'axios';


const axiosBaseURL = Axios.create({
    baseURL:'http://212.33.198.15:8000/'
});
export default axiosBaseURL;