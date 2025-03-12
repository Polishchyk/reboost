/**
 * sell router
 */

export default {
  routes: [
    {
      method: 'GET',
      path: '/sells',
      handler: 'sell.find',
      config: {
        policies: [], // Можеш додати свої політики доступу
      },
    },
    {
      method: 'GET',
      path: '/sells/:slug',
      handler: 'sell.findOne',
      config: {
        policies: [],
      },
    },
    {
      method: 'POST',
      path: '/sells',
      handler: 'sell.create',
      config: {
        policies: [],
      },
    },
    {
      method: 'PUT',
      path: '/sells/:id',
      handler: 'sell.update',
      config: {
        policies: [],
      },
    },
    {
      method: 'DELETE',
      path: '/sells/:id',
      handler: 'sell.delete',
      config: {
        policies: [],
      },
    },
  ],
};
