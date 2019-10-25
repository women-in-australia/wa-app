import service from './index';

const userTypeMap = {
  all: 0,
  unreviewed: 1,
  approved: 2,
  rejected: 3,
};

const UserService = {
  logIn: ({ email, password }) => {
    return service.request({
      method: 'post',
      url: 'auth/login',
      data: { email, password },
    });
  },

  register: (form) => {
    return service.request({
      method: 'post',
      url: 'auth/register',
      data: form,
    });
  },

  readAll: ({ type, page, pageSize }) => {
    const review = userTypeMap[type];

    return service.request({
      method: 'get',
      url: 'manage/user/all',
      params: { review, page, pageSize },
    });
  },

  read: ({ uid }) => {
    return service.request({
      method: 'get',
      url: 'manage/user/detail',
      params: { uid },
    });
  },

  activate: ({ uid }) => {
    return service.request({
      method: 'put',
      url: 'manage/user/activate',
      params: { uid },
    });
  },

  reject: ({ uid, feedback }) => {
    return service.request({
      method: 'put',
      url: 'manage/user/reject',
      data: { uid, feedback },
    });
  },

  invite: ({ email, role, message }) => {
    return service.request({
      method: 'post',
      url: 'manage/user/invite',
      data: { email, role, message }
    });
  },

  changeRole: ({ uid, rid }) => {
    return service.request({
      method: 'put',
      url: 'manage/user/role',
      params: { uid, rid },
    });
  },

  getData: () => {
    return service.request({
      method: 'get',
      url: 'user/me',
    });
  },

  readNotifications: ({ page, pageSize }) => {
    return service.request({
      method: 'get',
      url: 'user/message',
      params: { page, pageSize }
    });
  },

  toggleNotifications: ({ enabled }) => {
    return service.request({
      method: 'post',
      url: 'user/email',
      params: { receive: enabled }
    });
  },
};

export default UserService;