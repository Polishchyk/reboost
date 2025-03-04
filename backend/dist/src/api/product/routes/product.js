"use strict";
/**
 * product router
 */
Object.defineProperty(exports, "__esModule", { value: true });
//import { factories } from '@strapi/strapi';
//export default factories.createCoreRouter('api::product.product');
exports.default = {
    routes: [
        {
            method: 'GET',
            path: '/products',
            handler: 'product.find',
            config: {
                policies: [], // Можеш додати свої політики доступу
            },
        },
        {
            method: 'GET',
            path: '/products/:slug',
            handler: 'product.findOne',
            config: {
                policies: [],
            },
        },
        {
            method: 'POST',
            path: '/products',
            handler: 'product.create',
            config: {
                policies: [],
            },
        },
        {
            method: 'PUT',
            path: '/products/:id',
            handler: 'product.update',
            config: {
                policies: [],
            },
        },
        {
            method: 'DELETE',
            path: '/products/:id',
            handler: 'product.delete',
            config: {
                policies: [],
            },
        },
    ],
};
