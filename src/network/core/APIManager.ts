import axios, { ResponseType } from 'axios';

interface IRequestConfig {
    params?: any;
    data?: any;
}

export const APIManager = {
    get(url: string, config: IRequestConfig = {}, tokenRequired: boolean = true) {
        const { params } = config;
        let token = localStorage.getItem('accessToken');
        if (!token) token = '';
        token = `bearer ${token}`;
        const headers = {Authorization: token };
        if(tokenRequired) {
            return axios.get(url, {params, headers})
        } else {
            return axios.get(url, {params})
        }
    },
    post(url: string, config: IRequestConfig = {}, tokenRequired: boolean = true) {
        const { params, data } = config;
        let token = localStorage.getItem('accessToken');
        if (!token) token = '';
        token = `bearer ${token}`;
        const headers: any = { 'Content-type': 'application/json', Accept: 'application/json' };
        if(tokenRequired) {
            headers['Authorization'] = token;   
        }
        return axios.post(url, data, {params, headers})
    },
    put(url: string, config: IRequestConfig = {}, tokenRequired: boolean = true) {
        const { params, data } = config;
        let token = localStorage.getItem('accessToken');
        if (!token) token = '';
        token = `bearer ${token}`;
        const headers: any = { 'Content-type': 'application/json' };
        if(tokenRequired) {
            headers['Authorization'] = token;   
        }
        return axios.put(url, data, {params, headers})
    }
}
