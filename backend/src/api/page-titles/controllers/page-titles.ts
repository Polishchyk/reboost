import { Context } from 'koa';

export default {
  async find(ctx: Context) {
    const { locale } = ctx.query;

    /*type ModelType = 'about.about' | 'home-page.home-page';*/
    type ModelType = 'about.about';
    /*const models: ModelType[] = ['about.about', 'home-page.home-page'];*/
    const models: ModelType[] = ['about.about'];

    const result: Record<string, string> = {};

    for (const model of models) {
      const entity = await strapi.entityService.findMany(
        `api::${model}`,
        {
          locale,
          fields: 'title',
        }
      );
      if (entity && entity.title) {
        const key = model.split('.')[0];
        result[key] = entity.title;
      }
    }

    ctx.body = result;
  },
};