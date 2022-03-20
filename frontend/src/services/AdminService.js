import ApiService from "./base/ApiService";




const ADMIN_URL  = '/admin'
class AdminService {

    getUsers(page, size){ 
        let url = '/users?page='+page+'&size='+size;
        return ApiService.get(ADMIN_URL+url);
    }
    get(url) { 
        return ApiService.get(ADMIN_URL+url)
    }
    getByUsername(username){
        return ApiService.get(ADMIN_URL+'/'+username)
    }
    post(data) { 
        return ApiService.post(ADMIN_URL,data)
    }
    update(url,body) { 
        return ApiService.put(ADMIN_URL  +url, body)
    }

    // loadImage(username,body) { 
    //     return ApiService.put(ADMIN_URL+"/upload-image/"+username,body)
    // }
    //put(url, data) { return axios.put(API_BASE_URL + url, data); }

    //delete(url) { return axios.delete(API_BASE_URL + url); }
}

export default new AdminService();