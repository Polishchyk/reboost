import { Context } from 'koa';

export default {
  async generate(ctx: Context) {
    const baseUrl = process.env.PUBLIC_URL || 'http://localhost:1337';

    interface Localization {
      locale: string;
      slug: string;
    }

    interface Article {
      slug: string;
      locale: string;
      localizations?: Localization[];
    }

    interface Sell {
      slug: string;
      locale: string;
      localizations?: Localization[];
    }

    interface Category {
      slug: string;
    }

    interface Product {
      slug?: string;
      category?: Category;
      localizations?: Localization[];
    }

    interface Device {
      slug?: string;
      product?: { slug?: string };
      category?: Category;
      localizations?: Localization[];
      Software?: { services?: Service[] };
      hardware?: { services?: Service[] };
    }

    interface Service {
      slug: string;
      locale: string;
      localizations?: Localization[];
    }

    const languages = ['en', 'fr', 'it', 'de'];

    // Визначаємо типи для результатів запитів
    // Тип assertion для articles
    const articles = (await strapi.entityService.findMany('api::article.article', {
      fields: ['slug', 'locale'],
      populate: {
        localizations: {
          fields: ['slug', 'locale'],
        },
      },
    })) as Article[];

    const sells = (await strapi.entityService.findMany('api::sell.sell', {
      fields: ['slug', 'locale'],
      populate: {
        localizations: {
          fields: ['slug', 'locale'],
        },
      },
    })) as Sell[];

    const products: Product[] = await strapi.entityService.findMany('api::product.product', {
      fields: ['slug', 'locale'],
      populate: {
        category: { fields: ['slug'] },
        localizations: {
          fields: ['slug', 'locale'],
        },
      },
    });

    const devices = (await strapi.entityService.findMany('api::device.device', {
      fields: ['slug', 'locale'],
      populate: {
        product: { fields: ['slug'] },
        category: { fields: ['slug'] },
        localizations: {
          fields: ['slug', 'locale'],
        },
        /*Software: {
          populate: {
            services: {
              fields: ['slug', 'locale'],
              populate: {
                localizations: {
                  fields: ['slug', 'locale']
                }
              }
            }
          }
        },
        hardware: {
          populate: {
            services: {
              fields: ['slug', 'locale'],
              populate: {
                localizations: {
                  fields: ['slug', 'locale']
                }
              }
            }
          }
        },*/
      },
    })) as Device[];

    // Тип assertion для services
    const services = (await strapi.entityService.findMany('api::service.service', {
      fields: ['slug', 'locale'],
      populate: {
        localizations: {
          fields: ['slug', 'locale'],
        },
      },
    })) as Service[];

    const getLocalizedSlug = (localizations: Localization[], lang: string): string | null => {
      const localization = localizations?.find((loc) => loc.locale === lang);
      return localization ? localization.slug : null;
    };

    let urls = [
      { loc: `${baseUrl}/`, priority: 1.0 },
      { loc: `${baseUrl}/blog`, priority: 0.8 },
      { loc: `${baseUrl}/contact-us`, priority: 0.8 },
      { loc: `${baseUrl}/it-support`, priority: 0.7 },
      { loc: `${baseUrl}/phone-protection`, priority: 0.7 },
      { loc: `${baseUrl}/computer-repair`, priority: 0.7 },
      { loc: `${baseUrl}/phone-repair`, priority: 0.7 },
    ];

    languages.forEach((lang) => {
      articles.forEach((article) => {
        let slug = article.slug;
        if (article.localizations) {
          slug = getLocalizedSlug(article.localizations, lang) || slug;
        }
        const urlPath = lang === 'it' ? `/blog/${slug}` : `/${lang}/blog/${slug}`;
        urls.push({ loc: `${baseUrl}${urlPath}`, priority: 0.9 });
      });

      sells.forEach((sell) => {
        let slug = sell.slug;
        if (sell.localizations) {
          slug = getLocalizedSlug(sell.localizations, lang) || slug;
        }
        const urlPath = lang === 'it' ? `/sell/${slug}` : `/${lang}/sell/${slug}`;
        urls.push({ loc: `${baseUrl}${urlPath}`, priority: 0.9 });
      });

      services.forEach((sell) => {
        let slug = sell.slug;
        if (sell.localizations) {
          slug = getLocalizedSlug(sell.localizations, lang) || slug;
        }
        const urlPath = lang === 'it' ? `/service/${slug}` : `/${lang}/service/${slug}`;
        urls.push({ loc: `${baseUrl}${urlPath}`, priority: 0.9 });
      });

      products.forEach((product: Product) => {
        let slug = product.slug;
        if (product.localizations) {
          slug = getLocalizedSlug(product.localizations, lang) || slug;
        }
        const { category } = product;
        if (slug && category) {
          if(category.slug === 'phone-repair') {
            const productUrl = lang === 'it'
              ? `/${category.slug}/${slug}`
              : `/${lang}/${category.slug}/${slug}`;
            urls.push({loc: `${baseUrl}${productUrl}`, priority: 0.8});
          }
        }
      });

      devices.forEach((device: Device) => {
        let slug = device.slug;
        if (device.localizations) {
          slug = getLocalizedSlug(device.localizations, lang) || slug;
        }
        const { product, category, Software, hardware } = device;
        if (slug && product && category) {
          const deviceUrl = lang === 'it'
            ? `${baseUrl}/${category.slug}/${product.slug}/${slug}`
            : `${baseUrl}/${lang}/${category.slug}/${product.slug}/${slug}`;
          urls.push({ loc: deviceUrl, priority: 0.7 });

          // Додаємо посилання на software services
          /*if (Software && Software.services && Software.services.length > 0) {
            Software.services.forEach((service) => {
              let serviceSlug = service.slug;
              if (service.localizations) {
                serviceSlug = getLocalizedSlug(service.localizations, lang) || serviceSlug;
              }
              const serviceUrl = `${deviceUrl}/${serviceSlug}`;
              urls.push({ loc: serviceUrl, priority: 0.6 });
            });
          }*/

          // Додаємо посилання на hardware services
          /*if (hardware && hardware.services && hardware.services.length > 0) {
            hardware.services.forEach((service) => {
              let serviceSlug = service.slug;
              if (service.localizations) {
                serviceSlug = getLocalizedSlug(service.localizations, lang) || serviceSlug;
              }
              const serviceUrl = `${deviceUrl}/${serviceSlug}`;
              urls.push({ loc: serviceUrl, priority: 0.6 });
            });
          }*/
        }
      });

      if (lang !== 'it') {
        const langPrefix = `/${lang}`;
        urls.push({ loc: `${baseUrl}${langPrefix}/blog`, priority: 0.8 });
        urls.push({ loc: `${baseUrl}${langPrefix}/contact-us`, priority: 0.8 });
        urls.push({ loc: `${baseUrl}${langPrefix}/it-support`, priority: 0.7 });
        urls.push({ loc: `${baseUrl}${langPrefix}/phone-protection`, priority: 0.7 });
        urls.push({ loc: `${baseUrl}${langPrefix}/computer-repair`, priority: 0.7 });
        urls.push({ loc: `${baseUrl}${langPrefix}/phone-repair`, priority: 0.7 });
      }
    });

    const sitemapXml = `<?xml version="1.0" encoding="UTF-8"?>
      <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
        ${urls.map(url => `<url><loc>${url.loc}</loc><priority>${url.priority}</priority></url>`).join('\n')}
      </urlset>`;

    ctx.set('Content-Type', 'application/xml');
    ctx.body = sitemapXml;
  },
};