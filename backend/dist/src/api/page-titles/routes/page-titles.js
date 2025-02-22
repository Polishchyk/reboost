"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = {
    routes: [
        {
            method: 'GET',
            path: '/page-titles', // Шлях для ендпоінту
            handler: 'page-titles.find', // Виклик методу find з контролера
            config: {
                policies: [], // Додаткові політики (якщо є)
                middlewares: [], // Додаткові проміжні програмні компоненти (якщо є)
            },
        },
    ],
};
