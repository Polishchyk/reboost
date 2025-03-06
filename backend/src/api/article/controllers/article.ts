/**
 * device controller
 */

import { factories } from '@strapi/strapi';
import { getFullPopulateObject } from 'strapi-v5-plugin-populate-deep/server/helpers';

export default factories.createCoreController('api::article.article', ({ strapi }) => ({
  // Зберігаємо всі стандартні методи
  async find(ctx) {
    return await super.find(ctx);
  },

  async findOne(ctx) {
    const { slug } = ctx.params;
    const { pLevel } = ctx.query;  // Отримуємо параметр pLevel із запиту

    const defaultDepth = 5; // Можна налаштувати глибину за замовчуванням

    const depth = pLevel || defaultDepth; // Визначаємо глибину

    // Отримуємо повну структуру populate за допомогою плагіна
    const populateObject = getFullPopulateObject('api::article.article', depth, ['users']);

    if (populateObject && populateObject.populate && typeof populateObject.populate === 'object') {
      delete populateObject.populate.createdBy;
      delete populateObject.populate.updatedBy;
    }

    // Виконуємо запит з популяцією та глибиною
    const entity = await strapi.db.query('api::article.article').findOne({
      where: { slug },
      populate: populateObject.populate,  // Використовуємо результат функції плагіна
    });

    if (!entity) {
      return ctx.notFound('Article not found');
    }

    return this.transformResponse(entity);
  },

  async create(ctx) {
    return await super.create(ctx);
  },

  async update(ctx) {
    return await super.update(ctx);
  },

  async delete(ctx) {
    return await super.delete(ctx);
  },
}));

