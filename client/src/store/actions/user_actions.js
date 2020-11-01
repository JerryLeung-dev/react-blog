import * as types from './types';
import axios from 'axios';

export const loginUser = (data) => {
   const request = axios.post('/api/users/login', data)
                        .then(response => response.data);
    console.log(request);
    return {
        type: types.LOGIN_USER,
        payload: request
    }
}

export const registerUser = (data) => {
    const request = axios.post('/api/users/register', data)
                        .then(response => response.data);
    return {
        type: types.REGISTER_USER,
        payload: request
    }
}