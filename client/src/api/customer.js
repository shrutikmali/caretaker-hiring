import axios from 'axios';

const URL = 'http://localhost:5000/customer';

export const signIn = (credentials) => axios.post(`${URL}/signin`, credentials);
export const signUp = (credentials) => axios.post(`${URL}/signup`, credentials);
export const findCaretakers = () => axios.get(`${URL}/find`);
export const sendRequest = (token, requestDetails) => axios.post(`${URL}/request`, requestDetails, {headers: {auth: `Bearer ${token}`,}});
export const pendingRequests = (token) => axios.post(`${URL}/pending`, null, {headers: {auth: `Bearer ${token}`}});
export const cancelRequest = (requestID, token) => axios.post(`${URL}/cancel`, {requestID: requestID}, {headers: {auth: `Bearer ${token}`}});
export const currentHires = (token) => axios.get(`${URL}/current`, {headers: {auth: `Bearer ${token}`}});
export const pastHires = (token) => axios.get(`${URL}/past`, {headers: {auth: `Bearer ${token}`}});
export const markAsComplete = (token, requestID) => axios.post(`${URL}/complete`, {requestID: requestID}, {headers: {auth: `Bearer ${token}`}});