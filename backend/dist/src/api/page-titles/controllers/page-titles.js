"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = {
    async find(ctx) {
        const { locale } = ctx.query;
        const models = [
            'phone-protection.phone-protection',
            'it-support.it-support',
            'phone-repair.phone-repair',
            'computer-repair.computer-repair',
            'contact-us.contact-us'
        ];
        const result = {};
        for (const model of models) {
            const entity = await strapi.entityService.findMany(`api::${model}`, {
                locale,
                fields: 'title',
            });
            if (entity && entity.title) {
                const key = model.split('.')[0];
                result[key] = entity.title;
            }
        }
        ctx.body = result;
    },
};
