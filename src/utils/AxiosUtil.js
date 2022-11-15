import axios, { Axios } from "axios";
import resolve from "resolve";

axios.defaults.withCredentials = true

const baseURL = "/"
export class AxiosUtil {
    static get = (url, params) => {
        new Promise((resolve, reject) => {
            axios
                .get(baseURL + url, params)
                .then(response => {
                    resolve(response);
                })
                .catch(error => {
                    reject(error);
                });
        })
    }
    static post = (url, params) => {
        return new Promise((resolve, reject) => {
            axios
                .post(baseURL + url, params)
                .then(response => {
                    resolve(response);
                })
                .catch(error => {
                    reject(error);
                });
        })
    }
    static put = (url, params) => {
        return new Promise((resolve, reject) => {
            axios
                .put(baseURL + url, params)
                .then(response => {
                    resolve(response);
                })
                .catch(error => {
                    reject(error);
                });
        })
    }
} 