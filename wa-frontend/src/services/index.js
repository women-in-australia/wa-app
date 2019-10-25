import axios from 'axios';
import qs from 'qs';

import store from '../redux/store';
import { logOut } from '../redux/session/actions';

const service = axios.create({
  baseURL: 'http://www.womeninau.club/api/'
  // baseURL: 'http://10.13.76.252:8080'
});

service.interceptors.request.use(config => {
  const state = store.getState();
  const { token } = state.session;

  if (token) config.headers.common['Authorization'] = `Bearer ${token}`;

  if (config.method === 'post' || config.method === 'put') {
    config.data = qs.stringify(config.data);
    config.headers.post['Content-Type'] = 'application/x-www-form-urlencoded';
  }

  return config;
});

service.interceptors.response.use(
  response => {
    return response.status === 200 && response.data.code === 200
      ? response.data
      : Promise.reject(new Error(response.msg || response.data.msg));
  },
  error => {
    if (error.response && error.response.status === 401) {
      store.dispatch(logOut());
    }

    return Promise.reject(error);
  }
);

export default service;

import _UserService from './UserService';
import _EntityService from './EntityService';

export const UserService = _UserService;
export const EntityService = _EntityService;
