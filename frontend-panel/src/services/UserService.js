import ApiService from "./base/ApiService";




const ADMIN_URL = '/admin'
const USER_URL = '/user'
const YOURSELVES_URL = '/my-account'
class UserService {

    getUsers(page, size) {
        let url = '/user?page=' + page + '&size=' + size;
        return ApiService.get(USER_URL + url);
    }
    getUsersWithPagination(page, size) {
        let url = '/search?page=' + page + '&size=' + size;
        return ApiService.get(ADMIN_URL + USER_URL + url);
    }
    search(page, size, body) {
        let url = '/page?page=' + page + '&size=' + size;
        return ApiService.post(ADMIN_URL + USER_URL + url, body);
    }
    get(url) {
        return ApiService.get(url)
    }
    getByUsername(username) {
        return ApiService.get(USER_URL + '/' + username)
    }
    post(data) {
        return ApiService.post(USER_URL, data)
    }
    update(username, body) {
        return ApiService.put(USER_URL + "/" + username, body)
    }
    updateYourSelves(username, body) {
        return ApiService.put(YOURSELVES_URL + "/username/" + username, body)
    }
    updateMyPassword(data) {
        return ApiService.post("/my-account/update-my-password", data)
    }

    changePassword(userId, body) {
        return ApiService.put(ADMIN_URL + USER_URL + "/change-password/" + userId, body)
    }
    makeLogOut(username) {
        return ApiService.get(ADMIN_URL + USER_URL + "/make-logout/" + username)
    }
    // pageUserList(pageSize,pageNo,sortBy,data) { 
    //     return ApiService.post(ADMIN_URL+USER_URL+"/page/?pageSize="+pageSize+"&pageNo="+pageNo+"&sortBy="+sortBy,data)
    // }
    // searchUsers(page, size, data){ 
    //     let url = '/page?page='+page+'&size='+size;
    //     return ApiService.get(ADMIN_URL+USER_URL+url,data)
    // }
    // loadImage(username,body) { 
    //     return ApiService.put(USER_URL+"/upload-image/"+username,body)
    // }
    //put(url, data) { return axios.put(API_BASE_URL + url, data); }

    //delete(url) { return axios.delete(API_BASE_URL + url); }
}

export default new UserService();