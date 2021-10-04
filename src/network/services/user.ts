import { APIManager } from '../core';

export function register(user_info: any) {
    let data = user_info;
    return APIManager.post('http://localhost:3500/api/user/signup', {data}, false)
}

export function login(user_credentials: any) {
    let data = user_credentials;
    return APIManager.post('http://localhost:3500/api/user/login', {data}, false)
}

export function listUsers() {
    return APIManager.get('http://localhost:3500/api/user')
}

export function updateProfile(id: string, data: any) {
    return APIManager.put('http://localhost:3500/api/user/editProfile/' + id, {data});
}

export function getUser(user_id: string) {
    return APIManager.get('http://localhost:3500/api/user/' + user_id)
}