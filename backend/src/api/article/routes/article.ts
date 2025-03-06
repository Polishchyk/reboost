/**
 * article router
 */

export default {
  routes: [
    {
      method: 'GET',
      path: '/articles',
      handler: 'article.find',
      config: {
        policies: [], // Можеш додати свої політики доступу
      },
    },
    {
      method: 'GET',
      path: '/articles/:slug',
      handler: 'article.findOne',
      config: {
        policies: [],
      },
    },
    {
      method: 'POST',
      path: '/articles',
      handler: 'article.create',
      config: {
        policies: [],
      },
    },
    {
      method: 'PUT',
      path: '/articles/:id',
      handler: 'article.update',
      config: {
        policies: [],
      },
    },
    {
      method: 'DELETE',
      path: '/articles/:id',
      handler: 'article.delete',
      config: {
        policies: [],
      },
    },
  ],
};
