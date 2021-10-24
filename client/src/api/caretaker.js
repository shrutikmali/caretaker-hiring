import axios from 'axios';

const URL = 'http://localhost:5000/caretaker';

export const signIn = (credentials) => axios.post(`${URL}/signin`, credentials);
export const signUp = (credentials) => axios.post(`${URL}/signup`, credentials);
export const getPendingRequests = (token) => axios.post(`${URL}/pending`, null, {headers: {auth: `Bearer ${token}`}});
export const acceptRequest = (token, requestID) => axios.post(`${URL}/accept`, {requestID}, {headers: {auth: `Bearer ${token}`}});
export const declineRequest = (token, requestID) => axios.post(`${URL}/decline`, {requestID}, {headers: {auth: `Bearer ${token}`}});
export const currentActivities = (token) => axios.get(`${URL}/current`, {headers: {auth: `Bearer ${token}`}});
export const pastActivities = (token) => axios.get(`${URL}/past`, {headers: {auth: `Bearer ${token}`}});
