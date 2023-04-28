import axios from "axios";
const { DOMAIN, ACCESS_TOKEN } = require("util/constants/settingSystem");

export default class BaseService {
    post(url, model) {
        return axios({
            url: `${DOMAIN}/${url}`,
            method: 'POST',
            data: model,
            headers: { 'Authorization': 'Bearer ' + localStorage.getItem(ACCESS_TOKEN) }
        });
    }

    get(url) {
        return axios({
            url: `${DOMAIN}/${url}`,
            method: 'GET',
            headers: { 'Authorization': 'Bearer ' + localStorage.getItem(ACCESS_TOKEN) }
        });
    }

    put(url, model) {
        return axios({
            url: `${DOMAIN}/${url}`,
            method: 'PUT',
            data: model,
            headers: { 'Authorization': 'Bearer ' + localStorage.getItem(ACCESS_TOKEN) }
        });
    }

    delete(url) {
        return axios({
            url: `${DOMAIN}/${url}`,
            method: 'DELETE',
            headers: { 'Authorization': 'Bearer ' + localStorage.getItem(ACCESS_TOKEN) }
        });
    }
}