import { APIManager } from '../core';

export function getAllSedes() {
    return APIManager.get('http://localhost:3500/api/sede', {}, false);
}