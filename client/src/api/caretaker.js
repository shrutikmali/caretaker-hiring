import axios from 'axios';

const URL = 'http://localhost:5000/caretaker';

export const signIn = (credentials) => axios.post(`${URL}/signin`, credentials);
export const signUp = (credentials) => axios.post(`${URL}/signup`, credentials);

