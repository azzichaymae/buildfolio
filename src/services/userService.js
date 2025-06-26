import axios from 'axios';
import { getAuthHeader } from '../Pages/auth';
const API_URL = 'http://localhost:8081/users';
export const getUsers = () => axios.get(API_URL, getAuthHeader());

export const createUser = (user) => axios.post(API_URL, user, getAuthHeader());
export const updateUser = (user) => axios.put(API_URL, user, getAuthHeader());
export const deleteUser = (id) => axios.delete(`${API_URL}/${id}`, getAuthHeader());