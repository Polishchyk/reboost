"use strict";
/**
 * product controller
 */
Object.defineProperty(exports, "__esModule", { value: true });
const strapi_1 = require("@strapi/strapi");
const helpers_1 = require("strapi-v5-plugin-populate-deep/server/helpers");
exports.default = strapi_1.factories.createCoreController('api::product.product', ({ strapi }) => ({
    // Зберігаємо всі стандартні методи
    async find(ctx) {
        return await super.find(ctx);
    },
    async findOne(ctx) {
        const { slug } = ctx.params;
        const { pLevel } = ctx.query; // Отримуємо параметр pLevel із запиту
        const defaultDepth = 5; // Можна налаштувати глибину за замовчуванням
        const depth = pLevel || defaultDepth; // Визначаємо глибину
        // Отримуємо повну структуру populate за допомогою плагіна
        const populateObject = (0, helpers_1.getFullPopulateObject)('api::product.product', depth, ['users']);
        if (populateObject && populateObject.populate && typeof populateObject.populate === 'object') {
            delete populateObject.populate.createdBy;
            delete populateObject.populate.updatedBy;
        }
        // Виконуємо запит з популяцією та глибиною
        const entity = await strapi.db.query('api::product.product').findOne({
            where: { slug },
            populate: populateObject.populate, // Використовуємо результат функції плагіна
        });
        if (!entity) {
            return ctx.notFound('Product not found');
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
