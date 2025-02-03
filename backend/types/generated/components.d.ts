import type { Schema, Struct } from '@strapi/strapi';

export interface MenuLink extends Struct.ComponentSchema {
  collectionName: 'components_menu_links';
  info: {
    description: '';
    displayName: 'Link';
    icon: 'link';
  };
  attributes: {
    Target: Schema.Attribute.Enumeration<['_self', '_blank']> &
      Schema.Attribute.Required &
      Schema.Attribute.DefaultTo<'_self'>;
    Title: Schema.Attribute.String & Schema.Attribute.Required;
    Url: Schema.Attribute.String & Schema.Attribute.Required;
  };
}

export interface MenuMenuSubItems extends Struct.ComponentSchema {
  collectionName: 'components_menu_menu_sub_items';
  info: {
    description: '';
    displayName: 'MenuSubItems';
    icon: 'check';
  };
  attributes: {
    menu_sections: Schema.Attribute.Relation<
      'oneToMany',
      'api::menu-section.menu-section'
    >;
    Title: Schema.Attribute.String;
  };
}

export interface SharedMedia extends Struct.ComponentSchema {
  collectionName: 'components_shared_media';
  info: {
    displayName: 'Media';
    icon: 'file-video';
  };
  attributes: {
    file: Schema.Attribute.Media<'images' | 'files' | 'videos'>;
  };
}

export interface SharedQuote extends Struct.ComponentSchema {
  collectionName: 'components_shared_quotes';
  info: {
    displayName: 'Quote';
    icon: 'indent';
  };
  attributes: {
    body: Schema.Attribute.Text;
    title: Schema.Attribute.String;
  };
}

export interface SharedRichText extends Struct.ComponentSchema {
  collectionName: 'components_shared_rich_texts';
  info: {
    description: '';
    displayName: 'Rich text';
    icon: 'align-justify';
  };
  attributes: {
    body: Schema.Attribute.RichText;
  };
}

export interface SharedSeo extends Struct.ComponentSchema {
  collectionName: 'components_shared_seos';
  info: {
    description: '';
    displayName: 'Seo';
    icon: 'allergies';
    name: 'Seo';
  };
  attributes: {
    metaDescription: Schema.Attribute.Text & Schema.Attribute.Required;
    metaTitle: Schema.Attribute.String & Schema.Attribute.Required;
    shareImage: Schema.Attribute.Media<'images'>;
  };
}

export interface SharedSlider extends Struct.ComponentSchema {
  collectionName: 'components_shared_sliders';
  info: {
    description: '';
    displayName: 'Slider';
    icon: 'address-book';
  };
  attributes: {
    files: Schema.Attribute.Media<'images', true>;
  };
}

export interface SharedSocialMediaButtons extends Struct.ComponentSchema {
  collectionName: 'components_shared_social_media_buttons';
  info: {
    description: '';
    displayName: 'SocialMediaButtons';
    icon: 'globe';
  };
  attributes: {
    SvgImage: Schema.Attribute.Text & Schema.Attribute.Required;
    Url: Schema.Attribute.String & Schema.Attribute.Required;
  };
}

export interface ShopShop extends Struct.ComponentSchema {
  collectionName: 'components_shop_shops';
  info: {
    displayName: 'Shop';
    icon: 'shoppingCart';
  };
  attributes: {
    Address: Schema.Attribute.String & Schema.Attribute.Required;
    Phone: Schema.Attribute.String & Schema.Attribute.Required;
    Title: Schema.Attribute.String & Schema.Attribute.Required;
  };
}

export interface ShopsShops extends Struct.ComponentSchema {
  collectionName: 'components_shops_shops';
  info: {
    displayName: 'Shops';
    icon: 'shoppingCart';
  };
  attributes: {
    Shop: Schema.Attribute.Component<'shop.shop', true>;
    TitleComponent: Schema.Attribute.String & Schema.Attribute.Required;
  };
}

declare module '@strapi/strapi' {
  export module Public {
    export interface ComponentSchemas {
      'menu.link': MenuLink;
      'menu.menu-sub-items': MenuMenuSubItems;
      'shared.media': SharedMedia;
      'shared.quote': SharedQuote;
      'shared.rich-text': SharedRichText;
      'shared.seo': SharedSeo;
      'shared.slider': SharedSlider;
      'shared.social-media-buttons': SharedSocialMediaButtons;
      'shop.shop': ShopShop;
      'shops.shops': ShopsShops;
    }
  }
}
