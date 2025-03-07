export default {
  routes: [
    {
      method: "GET",
      path: "/sitemap.xml",
      handler: "sitemap.generate",
      config: {
        auth: false,
      },
    },
  ],
};
