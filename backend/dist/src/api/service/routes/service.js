"use strict";
/**
 * service router
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = {
    routes: [
        {
            method: 'GET',
            path: '/services',
            handler: 'service.find',
            config: {
                policies: [], // Можеш додати свої політики доступу
            },
        },
        {
            method: 'GET',
            path: '/services/:slug',
            handler: 'service.findOne',
            config: {
                policies: [],
            },
        },
        {
            method: 'POST',
            path: '/services',
            handler: 'service.create',
            config: {
                policies: [],
            },
        },
        {
            method: 'PUT',
            path: '/services/:id',
            handler: 'service.update',
            config: {
                policies: [],
            },
        },
        {
            method: 'DELETE',
            path: '/services/:id',
            handler: 'service.delete',
            config: {
                policies: [],
            },
        },
    ],
};
