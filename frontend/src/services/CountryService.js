import ApiService from "./base/ApiService";

const COUNTRY_URL  = '/country';
const GET_ALL="/get-all";
class CountryService {
    getAll() { 
        return ApiService.get( COUNTRY_URL + GET_ALL)
    } 
    get(url) { 
        return ApiService.get(url)
    } 
}
export default new CountryService();