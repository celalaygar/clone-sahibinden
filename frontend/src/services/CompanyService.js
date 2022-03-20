import ApiService from "./base/ApiService";


const COMPANY_URL  = '/company'
const FIND_BY_SEARCH_URL  = '/find-by-searching/'
class CompanyService {

    getCompanies(page, size){ 
        let url = '/company?page='+page+'&size='+size;
        return ApiService.get(url);
    }
    get(url) { 
        return ApiService.get(COMPANY_URL+url)
    }
    getAll() { 
        return ApiService.get(COMPANY_URL+"/get-all")
    }
    getByUsername(username){
        return ApiService.get('/'+username)
    }
    searchCompany(page, size, data){ 
        let url = '/page?page='+page+'&size='+size;
        return ApiService.post(COMPANY_URL+url,data)
    }
    post(data) { 
        return ApiService.post(COMPANY_URL,data)
    }
    update(companyId,body) { 
        return ApiService.put(COMPANY_URL+"/"+companyId,body)
    }
    findBySearching(companyName) { 
        let body = { companyName }
        return ApiService.post(COMPANY_URL+FIND_BY_SEARCH_URL,body)
    }
    // loadImage(username,body) { 
    //     return ApiService.put(COMPANY_URL+"/upload-image/"+username,body)
    // }
    //put(url, data) { return axios.put(API_BASE_URL + url, data); }

    //delete(url) { return axios.delete(API_BASE_URL + url); }
}

export default new CompanyService();