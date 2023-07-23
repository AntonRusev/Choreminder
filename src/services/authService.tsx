import * as request from './requester';

const baseUrl = 'https://nfts-backend.herokuapp.com/users';

export const login = (data: {}) => {
   return request.post(`${baseUrl}/login`, data);
};

export const register = (data: {}) => {
   return request.post(`${baseUrl}/register`, data);
};

export const logout = () => {
   return request.get(`${baseUrl}/logout`, {});
};