import service from './index';

const EntityService = {
  readAll: ({ status, page, pageSize }) => {
    return service.request({
      method: 'get',
      url: 'entity/all',
      params: { status, page, pageSize }
    });
  },

  readUnreviewed: ({ status, page, pageSize }) => {
    return service.request({
      method: 'get',
      url: 'entity/todo',
      params: { status, page, pageSize }
    });
  },

  readMy: ({ status, page, pageSize }) => {
    return service.request({
      method: 'get',
      url: 'entity/my',
      params: { status, page, pageSize, draft: false }
    });
  },

  readDraft: ({ status, page, pageSize }) => {
    return service.request({
      method: 'get',
      url: 'entity/my',
      params: { status, page, pageSize, draft: true },
    });
  },

  create: entityData => {
    return service.request({
      method: 'post',
      url: 'entity/create',
      data: { entityData }
    });
  },

  occupationPrompt: input => {
    return service.request({
      method: 'get',
      url: 'entity/occupation/prompt',
      params: { input }
    });
  },

  delete: ({ eid }) => {
    return service.request({
      method: 'delete',
      url: 'entity/delete',
      params: { eid }
    });
  },

  occupationCheck: input => {
    return service.request({
      method: 'get',
      url: 'entity/occupation/check',
      params: { input }
    });
  },

  entityDetail: eid => {
    return service.request({
      method: 'get',
      url: 'entity/detail',
      params: { eid }
    });
  },

  womanPrompt: input => {
    return service.request({
      method: 'get',
      url: 'entity/related/prompt',
      params: { input, type: 1 }
    });
  },

  organisationPrompt: input => {
    return service.request({
      method: 'get',
      url: 'entity/related/prompt',
      params: { input, type: 2 }
    });
  },

  womanCheck: input => {
    return service.request({
      method: 'get',
      url: 'entity/related/check',
      params: { input, type: 1 }
    });
  },

  organisationCheck: input => {
    return service.request({
      method: 'get',
      url: 'entity/related/check',
      params: { input, type: 2 }
    });
  },

  review: reviewData => {
    return service.request({
      method: 'post',
      url: 'entity/review',
      data: { reviewData }
    });
  }
};

export default EntityService;
