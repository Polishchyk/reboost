import type { Schema, Struct } from '@strapi/strapi';

export interface HomeSectionsBenefits extends Struct.ComponentSchema {
  collectionName: 'components_home_sections_benefits';
  info: {
    displayName: 'Benefits';
  };
  attributes: {
    BenefitsItem: Schema.Attribute.Component<
      'home-sections.benefits-item',
      true
    > &
      Schema.Attribute.Required;
    Title: Schema.Attribute.String & Schema.Attribute.Required;
  };
}

export interface HomeSectionsBenefitsItem extends Struct.ComponentSchema {
  collectionName: 'components_home_sections_benefits_items';
  info: {
    displayName: 'Benefits Item';
  };
  attributes: {
    Description: Schema.Attribute.Text & Schema.Attribute.Required;
    ItemCssClass: Schema.Attribute.String & Schema.Attribute.Required;
    Title: Schema.Attribute.String & Schema.Attribute.Required;
  };
}

export interface HomeSectionsBrandsItems extends Struct.ComponentSchema {
  collectionName: 'components_home_sections_brands_items';
  info: {
    displayName: 'BrandsItems';
  };
  attributes: {
    Image: Schema.Attribute.Media<'images' | 'files', true> &
      Schema.Attribute.Required;
  };
}

export interface HomeSectionsDevicesList extends Struct.ComponentSchema {
  collectionName: 'components_home_sections_devices_lists';
  info: {
    displayName: 'DevicesList';
  };
  attributes: {
    BrandsItems: Schema.Attribute.Component<
      'home-sections.brands-items',
      true
    > &
      Schema.Attribute.Required;
    DevicesListItems: Schema.Attribute.Component<
      'home-sections.devices-list-items',
      true
    > &
      Schema.Attribute.Required;
    Title: Schema.Attribute.String & Schema.Attribute.Required;
  };
}

export interface HomeSectionsDevicesListItems extends Struct.ComponentSchema {
  collectionName: 'components_home_sections_devices_list_items';
  info: {
    displayName: 'DevicesListItems';
    icon: 'apps';
  };
  attributes: {
    SvgImage: Schema.Attribute.Text & Schema.Attribute.Required;
    Title: Schema.Attribute.String;
    Url: Schema.Attribute.String & Schema.Attribute.Required;
  };
}

export interface HomeSectionsFaq extends Struct.ComponentSchema {
  collectionName: 'components_home_sections_faqs';
  info: {
    displayName: 'FAQ';
  };
  attributes: {
    Description: Schema.Attribute.Text & Schema.Attribute.Required;
    FAQItems: Schema.Attribute.Component<'home-sections.faq-items', true> &
      Schema.Attribute.Required;
    Title: Schema.Attribute.String & Schema.Attribute.Required;
  };
}

export interface HomeSectionsFaqItems extends Struct.ComponentSchema {
  collectionName: 'components_home_sections_faq_items';
  info: {
    displayName: 'FAQItems';
  };
  attributes: {
    Answer: Schema.Attribute.Text & Schema.Attribute.Required;
    Question: Schema.Attribute.String & Schema.Attribute.Required;
  };
}

export interface HomeSectionsInfoText extends Struct.ComponentSchema {
  collectionName: 'components_home_sections_info_texts';
  info: {
    description: '';
    displayName: 'InfoText';
  };
  attributes: {
    Description: Schema.Attribute.RichText &
      Schema.Attribute.Required &
      Schema.Attribute.CustomField<
        'plugin::ckeditor5.CKEditor',
        {
          preset: 'defaultHtml';
        }
      >;
    Title: Schema.Attribute.String & Schema.Attribute.Required;
  };
}

export interface HomeSectionsMainOffer extends Struct.ComponentSchema {
  collectionName: 'components_home_sections_main_offers';
  info: {
    description: '';
    displayName: 'MainOffer';
    icon: 'dashboard';
  };
  attributes: {
    InfoLeft: Schema.Attribute.String & Schema.Attribute.Required;
    InfoRight: Schema.Attribute.String & Schema.Attribute.Required;
    SelectBrandPlaceholder: Schema.Attribute.String & Schema.Attribute.Required;
    SelectDevicePlaceholder: Schema.Attribute.String &
      Schema.Attribute.Required;
    SelectLabel: Schema.Attribute.String & Schema.Attribute.Required;
    SelectProductPlaceholder: Schema.Attribute.String &
      Schema.Attribute.Required;
    Title: Schema.Attribute.String & Schema.Attribute.Required;
    TitleBlue: Schema.Attribute.String & Schema.Attribute.Required;
  };
}

export interface HomeSectionsPrinciple extends Struct.ComponentSchema {
  collectionName: 'components_home_sections_principles';
  info: {
    displayName: 'Principle';
  };
  attributes: {
    AdditionDescription: Schema.Attribute.Text & Schema.Attribute.Required;
    Description: Schema.Attribute.Text & Schema.Attribute.Required;
    PrinciplesItems: Schema.Attribute.Component<
      'home-sections.principles-items',
      true
    > &
      Schema.Attribute.Required;
    Title: Schema.Attribute.String & Schema.Attribute.Required;
  };
}

export interface HomeSectionsPrinciplesItemList extends Struct.ComponentSchema {
  collectionName: 'components_home_sections_principles_item_lists';
  info: {
    displayName: 'PrinciplesItemList';
  };
  attributes: {
    ItemTitle: Schema.Attribute.String & Schema.Attribute.Required;
  };
}

export interface HomeSectionsPrinciplesItems extends Struct.ComponentSchema {
  collectionName: 'components_home_sections_principles_items';
  info: {
    displayName: 'PrinciplesItems';
  };
  attributes: {
    Description: Schema.Attribute.Text & Schema.Attribute.Required;
    Icon: Schema.Attribute.Media<'images' | 'files'> &
      Schema.Attribute.Required;
    PrinciplesItemList: Schema.Attribute.Component<
      'home-sections.principles-item-list',
      true
    > &
      Schema.Attribute.Required;
    Title: Schema.Attribute.String & Schema.Attribute.Required;
  };
}

export interface HomeSectionsProposals extends Struct.ComponentSchema {
  collectionName: 'components_home_sections_proposals';
  info: {
    displayName: 'Proposals';
  };
  attributes: {
    ProposalsItems: Schema.Attribute.Component<
      'home-sections.proposals-items',
      true
    > &
      Schema.Attribute.Required;
  };
}

export interface HomeSectionsProposalsItems extends Struct.ComponentSchema {
  collectionName: 'components_home_sections_proposals_items';
  info: {
    displayName: 'Proposals Items';
  };
  attributes: {
    Description: Schema.Attribute.Text & Schema.Attribute.Required;
    ItemCssClass: Schema.Attribute.Enumeration<['screen-protection', 'sell']> &
      Schema.Attribute.Required;
    Title: Schema.Attribute.String & Schema.Attribute.Required;
    Url: Schema.Attribute.Component<'menu.link', false>;
  };
}

export interface HomeSectionsRepairCenterLinks extends Struct.ComponentSchema {
  collectionName: 'components_home_sections_repair_center_links';
  info: {
    displayName: 'RepairCenterLinks';
  };
  attributes: {
    ItemCssClass: Schema.Attribute.String & Schema.Attribute.Required;
    Title: Schema.Attribute.String;
    Url: Schema.Attribute.String & Schema.Attribute.Required;
  };
}

export interface HomeSectionsRepairCenters extends Struct.ComponentSchema {
  collectionName: 'components_home_sections_repair_centers';
  info: {
    displayName: 'RepairCenters';
  };
  attributes: {
    RepairCentersItems: Schema.Attribute.Component<
      'home-sections.repair-centers-items',
      true
    > &
      Schema.Attribute.Required;
    Title: Schema.Attribute.String & Schema.Attribute.Required;
  };
}

export interface HomeSectionsRepairCentersItems extends Struct.ComponentSchema {
  collectionName: 'components_home_sections_repair_centers_items';
  info: {
    displayName: 'RepairCentersItems';
  };
  attributes: {
    Description: Schema.Attribute.Text & Schema.Attribute.Required;
    Phone: Schema.Attribute.String & Schema.Attribute.Required;
    RepairCenterLinks: Schema.Attribute.Component<
      'home-sections.repair-center-links',
      true
    > &
      Schema.Attribute.Required;
    Title: Schema.Attribute.String & Schema.Attribute.Required;
  };
}

export interface HomeSectionsSolutionItems extends Struct.ComponentSchema {
  collectionName: 'components_home_sections_solution_items';
  info: {
    displayName: 'SolutionItems';
    icon: 'lightbulb';
  };
  attributes: {
    Description: Schema.Attribute.Text & Schema.Attribute.Required;
    Title: Schema.Attribute.String & Schema.Attribute.Required;
  };
}

export interface HomeSectionsSolutions extends Struct.ComponentSchema {
  collectionName: 'components_home_sections_solutions';
  info: {
    displayName: 'Solutions';
  };
  attributes: {
    Description: Schema.Attribute.Text & Schema.Attribute.Required;
    SolutionItems: Schema.Attribute.Component<
      'home-sections.solution-items',
      true
    > &
      Schema.Attribute.Required;
    Title: Schema.Attribute.String & Schema.Attribute.Required;
  };
}

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
      'home-sections.benefits': HomeSectionsBenefits;
      'home-sections.benefits-item': HomeSectionsBenefitsItem;
      'home-sections.brands-items': HomeSectionsBrandsItems;
      'home-sections.devices-list': HomeSectionsDevicesList;
      'home-sections.devices-list-items': HomeSectionsDevicesListItems;
      'home-sections.faq': HomeSectionsFaq;
      'home-sections.faq-items': HomeSectionsFaqItems;
      'home-sections.info-text': HomeSectionsInfoText;
      'home-sections.main-offer': HomeSectionsMainOffer;
      'home-sections.principle': HomeSectionsPrinciple;
      'home-sections.principles-item-list': HomeSectionsPrinciplesItemList;
      'home-sections.principles-items': HomeSectionsPrinciplesItems;
      'home-sections.proposals': HomeSectionsProposals;
      'home-sections.proposals-items': HomeSectionsProposalsItems;
      'home-sections.repair-center-links': HomeSectionsRepairCenterLinks;
      'home-sections.repair-centers': HomeSectionsRepairCenters;
      'home-sections.repair-centers-items': HomeSectionsRepairCentersItems;
      'home-sections.solution-items': HomeSectionsSolutionItems;
      'home-sections.solutions': HomeSectionsSolutions;
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
