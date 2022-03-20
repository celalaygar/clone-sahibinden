import Axios from "axios";
import { BACKEND_BASED_LINK } from "../../constant/GlobalConstant";

 const BASE_URL = 'http://localhost:8500';       // local
// const BASE_URL = 'http://192.168.9.4:8500';  // productıon
const API_BASE_URL = BACKEND_BASED_LINK+'/api';
const LOGIN_URL = '/login';
const LOGOUT_URL = '/logout';
class ApiService {

    get(url) { 
        return Axios.get(API_BASE_URL + url)
    }

    post(url, data) { return Axios.post(API_BASE_URL + url, data); }

    put(url, data) { return Axios.put(API_BASE_URL + url, data); }

    delete(url) { return Axios.delete(API_BASE_URL + url); }

    login(data) { return Axios.post(API_BASE_URL + LOGIN_URL, data); }

    logout() {   console.log(BACKEND_BASED_LINK + "/logout/user"); return Axios.get(BACKEND_BASED_LINK + "/logout/user"); }
    defaultLogout(username) {   
        console.log(BACKEND_BASED_LINK + "/logout/default"); 
        return Axios.get(BACKEND_BASED_LINK + "/logout/default/"+username); 
    }

    changeAuthToken(jwt) {
        Axios.defaults.headers["isRefreshToken"] = "false"; 
        Axios.defaults.headers["accept-language"] = "tr"; 
        if (jwt)
            Axios.defaults.headers['Authorization'] = 'Bearer ' + jwt;
        else
            Axios.defaults.headers['Authorization'] = null;
    }

    controlToken() { 
        Axios.defaults.headers['isRefreshToken'] = "true";
        return Axios.get(BACKEND_BASED_LINK + "/refresh-token")
    }

    changeLanguage(lg) { Axios.defaults.headers["accept-language"] = lg; }
}


//export default connect()(new ApiService());
export default new ApiService();