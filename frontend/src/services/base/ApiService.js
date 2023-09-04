
import { Axios } from "axios";
import { BACKEND_BASED_LINK } from "../../constant/GlobalConstant";
import axios from 'axios'
const BASE_URL = 'http://localhost:8500';       // local
// const BASE_URL = 'http://192.168.9.4:8500';  // productıon
const API_BASE_URL = BACKEND_BASED_LINK + '/api';
const LOGIN_URL = '/login';
const LOGOUT_URL = '/logout';


let axiosConfig = {
    headers: {
        'Authorization': null,
        'Content-Type': 'application/json;charset=UTF-8',
        'isRefreshToken': 'false',
        'accept-language': 'tr'
    }
};


class ApiService {



    get(url) {
        console.log(axiosConfig)
        return axios.get(API_BASE_URL + url, axiosConfig);
    }

    post(url, data) {
        console.log(axiosConfig)
        return axios.post(API_BASE_URL + url, data, axiosConfig);
    }

    put(url, data) {
        console.log(axiosConfig)
        return axios.put(API_BASE_URL + url, data, axiosConfig);
    }

    delete(url) {
        console.log(axiosConfig)
        return axios.delete(API_BASE_URL + url, axiosConfig);
    }

    login(data) {
        console.log(axiosConfig)
        return axios.post(API_BASE_URL + LOGIN_URL, data, axiosConfig);
    }

    logout() {
        console.log(axiosConfig)
        return axios.get(BACKEND_BASED_LINK + "/logout/user", axiosConfig);
    }
    defaultLogout(username) {
        console.log(axiosConfig)
        return axios.get(BACKEND_BASED_LINK + "/logout/default/" + username, axiosConfig);
    }

    controlToken() {
        axiosConfig.headers['isRefreshToken'] = "true";
        return axios.get(BACKEND_BASED_LINK + "/refresh-token", axiosConfig);
    }


    changeAuthToken(jwt) {
        axiosConfig.headers['Content-Type'] = 'application/json;charset=UTF-8'
        axiosConfig.headers["isRefreshToken"] = "false";
        axiosConfig.headers["accept-language"] = "tr";
        if (jwt) {
            axiosConfig.headers['Authorization'] = 'Bearer ' + jwt;
        }
        else
            axiosConfig.headers['Authorization'] = null;
    }

    changeLanguage(lg) { axiosConfig.headers["accept-language"] = lg; }
}


//export default connect()(new ApiService());
export default new ApiService();