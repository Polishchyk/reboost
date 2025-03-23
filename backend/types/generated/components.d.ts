import type { Schema, Struct } from '@strapi/strapi';

export interface ContactUsContactFormFields extends Struct.ComponentSchema {
  collectionName: 'components_contact_us_contact_form_fields';
  info: {
    displayName: 'ContactFormFields';
  };
  attributes: {
    Title: Schema.Attribute.String;
    Type: Schema.Attribute.Enumeration<
      ['text', 'number', 'email', 'textarea']
    > &
      Schema.Attribute.Required &
      Schema.Attribute.DefaultTo<'text'>;
  };
}

export interface DeviceHardware extends Struct.ComponentSchema {
  collectionName: 'components_device_hardware';
  info: {
    description: '';
    displayName: 'Hardware';
  };
  attributes: {
    services: Schema.Attribute.Relation<'oneToMany', 'api::service.service'>;
    Title: Schema.Attribute.String;
  };
}

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
    description: '';
    displayName: 'FAQ';
  };
  attributes: {
    Description: Schema.Attribute.Text;
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

export interface HomeSectionsOtherServicesItems extends Struct.ComponentSchema {
  collectionName: 'components_home_sections_other_services_items';
  info: {
    displayName: 'Other services Items';
  };
  attributes: {
    Title: Schema.Attribute.String & Schema.Attribute.Required;
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

export interface ItSupportIssues extends Struct.ComponentSchema {
  collectionName: 'components_it_support_issues';
  info: {
    displayName: 'Issues';
  };
  attributes: {
    Item: Schema.Attribute.String & Schema.Attribute.Required;
  };
}

export interface ItSupportItManagementPlans extends Struct.ComponentSchema {
  collectionName: 'components_it_support_it_management_plans';
  info: {
    displayName: 'IT Management Plans';
  };
  attributes: {
    plan_item: Schema.Attribute.Component<'it-support.plan-items', true> &
      Schema.Attribute.Required;
    Title: Schema.Attribute.String & Schema.Attribute.Required;
  };
}

export interface ItSupportItServices extends Struct.ComponentSchema {
  collectionName: 'components_it_support_it_services';
  info: {
    displayName: 'IT services';
  };
  attributes: {
    Description: Schema.Attribute.Text & Schema.Attribute.Required;
    service_items: Schema.Attribute.Component<
      'it-support.service-items',
      true
    > &
      Schema.Attribute.Required;
    Title: Schema.Attribute.String & Schema.Attribute.Required;
  };
}

export interface ItSupportOnlineAccess extends Struct.ComponentSchema {
  collectionName: 'components_it_support_online_accesses';
  info: {
    description: '';
    displayName: 'Online access';
  };
  attributes: {
    Description: Schema.Attribute.Text & Schema.Attribute.Required;
    online_access_items: Schema.Attribute.Component<
      'it-support.online-access-items',
      true
    > &
      Schema.Attribute.Required;
    Title: Schema.Attribute.String & Schema.Attribute.Required;
  };
}

export interface ItSupportOnlineAccessItems extends Struct.ComponentSchema {
  collectionName: 'components_it_support_online_access_items';
  info: {
    displayName: 'Online access items';
  };
  attributes: {
    SvgImage: Schema.Attribute.Text & Schema.Attribute.Required;
    Title: Schema.Attribute.String & Schema.Attribute.Required;
    Url: Schema.Attribute.Component<'menu.link', false> &
      Schema.Attribute.Required;
  };
}

export interface ItSupportOtherServices extends Struct.ComponentSchema {
  collectionName: 'components_it_support_other_services';
  info: {
    description: '';
    displayName: 'Other services';
  };
  attributes: {
    other_services_items: Schema.Attribute.Component<
      'home-sections.other-services-items',
      true
    > &
      Schema.Attribute.Required;
    Title: Schema.Attribute.String & Schema.Attribute.Required;
  };
}

export interface ItSupportPlanIncludes extends Struct.ComponentSchema {
  collectionName: 'components_it_support_plan_includes';
  info: {
    displayName: 'Plan Includes';
  };
  attributes: {
    Title: Schema.Attribute.String & Schema.Attribute.Required;
  };
}

export interface ItSupportPlanItems extends Struct.ComponentSchema {
  collectionName: 'components_it_support_plan_items';
  info: {
    description: '';
    displayName: 'Plan items';
  };
  attributes: {
    button: Schema.Attribute.Component<'menu.link', false> &
      Schema.Attribute.Required;
    Description: Schema.Attribute.Text & Schema.Attribute.Required;
    isBest: Schema.Attribute.Boolean &
      Schema.Attribute.Required &
      Schema.Attribute.DefaultTo<false>;
    plan_includes: Schema.Attribute.Component<
      'it-support.plan-includes',
      true
    > &
      Schema.Attribute.Required;
    plan_options: Schema.Attribute.Component<'it-support.plan-options', true> &
      Schema.Attribute.Required;
    Title: Schema.Attribute.String & Schema.Attribute.Required;
  };
}

export interface ItSupportPlanOptions extends Struct.ComponentSchema {
  collectionName: 'components_it_support_plan_options';
  info: {
    displayName: 'Plan options';
  };
  attributes: {
    Title: Schema.Attribute.String & Schema.Attribute.Required;
  };
}

export interface ItSupportServiceItems extends Struct.ComponentSchema {
  collectionName: 'components_it_support_service_items';
  info: {
    displayName: 'Service items';
  };
  attributes: {
    Description: Schema.Attribute.Text & Schema.Attribute.Required;
    Icon: Schema.Attribute.Media<'images' | 'files'> &
      Schema.Attribute.Required;
    Title: Schema.Attribute.String & Schema.Attribute.Required;
  };
}

export interface ItSupportServiceText extends Struct.ComponentSchema {
  collectionName: 'components_it_support_service_texts';
  info: {
    displayName: 'Service Text';
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

export interface ItSupportSupport extends Struct.ComponentSchema {
  collectionName: 'components_it_support_supports';
  info: {
    description: '';
    displayName: 'Support';
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
    Head: Schema.Attribute.Text & Schema.Attribute.Required;
    Issues: Schema.Attribute.Component<'it-support.issues', true> &
      Schema.Attribute.Required;
    title: Schema.Attribute.String & Schema.Attribute.Required;
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
    IsLink: Schema.Attribute.Boolean & Schema.Attribute.DefaultTo<false>;
    menu_sections: Schema.Attribute.Relation<
      'oneToMany',
      'api::menu-section.menu-section'
    >;
    Title: Schema.Attribute.String;
    Url: Schema.Attribute.String;
  };
}

export interface PhoneProtectionComparison extends Struct.ComponentSchema {
  collectionName: 'components_phone_protection_comparisons';
  info: {
    displayName: 'Comparison';
  };
  attributes: {
    Image: Schema.Attribute.Media<'images' | 'files'> &
      Schema.Attribute.Required;
    labels: Schema.Attribute.Component<'phone-protection.labels', true> &
      Schema.Attribute.Required;
  };
}

export interface PhoneProtectionFilmInstallation
  extends Struct.ComponentSchema {
  collectionName: 'components_phone_protection_film_installations';
  info: {
    displayName: 'Film-installation';
  };
  attributes: {
    Description: Schema.Attribute.Text & Schema.Attribute.Required;
    Title: Schema.Attribute.String & Schema.Attribute.Required;
  };
}

export interface PhoneProtectionHowDoesItWork extends Struct.ComponentSchema {
  collectionName: 'components_phone_protection_how_does_it_work_s';
  info: {
    displayName: 'How does it work?';
  };
  attributes: {
    text_cols: Schema.Attribute.Component<'phone-protection.text-cols', true> &
      Schema.Attribute.Required;
    Title: Schema.Attribute.String & Schema.Attribute.Required;
  };
}

export interface PhoneProtectionIllustration extends Struct.ComponentSchema {
  collectionName: 'components_phone_protection_illustrations';
  info: {
    displayName: 'Illustration';
  };
  attributes: {
    Description: Schema.Attribute.Text & Schema.Attribute.Required;
    Icon: Schema.Attribute.Media<'images' | 'files'> &
      Schema.Attribute.Required;
  };
}

export interface PhoneProtectionLabels extends Struct.ComponentSchema {
  collectionName: 'components_phone_protection_labels';
  info: {
    displayName: 'Labels';
  };
  attributes: {
    Title: Schema.Attribute.String & Schema.Attribute.Required;
  };
}

export interface PhoneProtectionPlans extends Struct.ComponentSchema {
  collectionName: 'components_phone_protection_plans';
  info: {
    displayName: 'Plans';
  };
  attributes: {
    Price: Schema.Attribute.String & Schema.Attribute.Required;
    Title: Schema.Attribute.Text & Schema.Attribute.Required;
  };
}

export interface PhoneProtectionTextBox extends Struct.ComponentSchema {
  collectionName: 'components_phone_protection_text_boxes';
  info: {
    displayName: 'Text-box';
  };
  attributes: {
    Subtitle: Schema.Attribute.String & Schema.Attribute.Required;
    Subtitle2: Schema.Attribute.Text & Schema.Attribute.Required;
    Title: Schema.Attribute.String & Schema.Attribute.Required;
  };
}

export interface PhoneProtectionTextCols extends Struct.ComponentSchema {
  collectionName: 'components_phone_protection_text_cols';
  info: {
    displayName: 'Text-cols';
  };
  attributes: {
    Description: Schema.Attribute.Text & Schema.Attribute.Required;
  };
}

export interface PhoneRepairBrands extends Struct.ComponentSchema {
  collectionName: 'components_phone_repair_brands';
  info: {
    description: '';
    displayName: 'Brands';
  };
  attributes: {
    Logo: Schema.Attribute.Media<'images' | 'files'> &
      Schema.Attribute.Required;
    Url: Schema.Attribute.Component<'menu.link', false> &
      Schema.Attribute.Required;
  };
}

export interface ProductCols extends Struct.ComponentSchema {
  collectionName: 'components_product_cols';
  info: {
    displayName: 'Cols';
  };
  attributes: {
    Description: Schema.Attribute.String & Schema.Attribute.Required;
    Title: Schema.Attribute.String & Schema.Attribute.Required;
  };
}

export interface ProductCommonRepairs extends Struct.ComponentSchema {
  collectionName: 'components_product_common_repairs';
  info: {
    displayName: 'common-repairs';
  };
  attributes: {
    cols: Schema.Attribute.Component<'product.cols', true> &
      Schema.Attribute.Required;
    ColsImage: Schema.Attribute.Media<'images' | 'files'> &
      Schema.Attribute.Required;
    Description: Schema.Attribute.Text & Schema.Attribute.Required;
    Title: Schema.Attribute.String & Schema.Attribute.Required;
  };
}

export interface ProductDeviceItems extends Struct.ComponentSchema {
  collectionName: 'components_product_device_items';
  info: {
    displayName: 'DeviceItems';
  };
  attributes: {
    Image: Schema.Attribute.Media<'images' | 'files'> &
      Schema.Attribute.Required;
    Title: Schema.Attribute.String & Schema.Attribute.Required;
    Url: Schema.Attribute.Component<'menu.link', false> &
      Schema.Attribute.Required;
  };
}

export interface ProductIdentification extends Struct.ComponentSchema {
  collectionName: 'components_product_identifications';
  info: {
    displayName: 'Identification';
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
    Image: Schema.Attribute.Media<'images' | 'files'> &
      Schema.Attribute.Required;
    Title: Schema.Attribute.String & Schema.Attribute.Required;
  };
}

export interface ProductReasonItems extends Struct.ComponentSchema {
  collectionName: 'components_product_reason_items';
  info: {
    displayName: 'ReasonItems';
  };
  attributes: {
    Icon: Schema.Attribute.Media<'images' | 'files'> &
      Schema.Attribute.Required;
    Title: Schema.Attribute.String & Schema.Attribute.Required;
  };
}

export interface ProductReasons extends Struct.ComponentSchema {
  collectionName: 'components_product_reasons';
  info: {
    displayName: 'Reasons';
  };
  attributes: {
    reason_items: Schema.Attribute.Component<'product.reason-items', true> &
      Schema.Attribute.Required;
    Title: Schema.Attribute.String & Schema.Attribute.Required;
  };
}

export interface SellPayments extends Struct.ComponentSchema {
  collectionName: 'components_sell_payments';
  info: {
    displayName: 'Payments';
  };
  attributes: {
    Description: Schema.Attribute.Text & Schema.Attribute.Required;
    Icon: Schema.Attribute.Media<'images' | 'files'> &
      Schema.Attribute.Required;
    Title: Schema.Attribute.String & Schema.Attribute.Required;
  };
}

export interface ServiceBooking extends Struct.ComponentSchema {
  collectionName: 'components_service_bookings';
  info: {
    displayName: 'Booking';
  };
  attributes: {
    Action: Schema.Attribute.Component<'menu.link', false> &
      Schema.Attribute.Required;
    info: Schema.Attribute.Component<'service.info', true> &
      Schema.Attribute.Required;
  };
}

export interface ServiceInfo extends Struct.ComponentSchema {
  collectionName: 'components_service_infos';
  info: {
    displayName: 'Info';
  };
  attributes: {
    Label: Schema.Attribute.String & Schema.Attribute.Required;
    Value: Schema.Attribute.String & Schema.Attribute.Required;
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

export interface SharedOpenGraph extends Struct.ComponentSchema {
  collectionName: 'components_shared_open_graphs';
  info: {
    description: '';
    displayName: 'openGraph';
    icon: 'project-diagram';
  };
  attributes: {
    ogDescription: Schema.Attribute.String &
      Schema.Attribute.Required &
      Schema.Attribute.SetMinMaxLength<{
        maxLength: 320;
      }>;
    ogImage: Schema.Attribute.Media<'images'>;
    ogTitle: Schema.Attribute.String &
      Schema.Attribute.Required &
      Schema.Attribute.SetMinMaxLength<{
        maxLength: 120;
      }>;
    ogType: Schema.Attribute.String;
    ogUrl: Schema.Attribute.String;
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
    displayName: 'seo';
    icon: 'search';
  };
  attributes: {
    keywords: Schema.Attribute.Text;
    metaDescription: Schema.Attribute.String &
      Schema.Attribute.Required &
      Schema.Attribute.SetMinMaxLength<{
        maxLength: 320;
      }>;
    metaImage: Schema.Attribute.Media<'images'>;
    metaRobots: Schema.Attribute.String;
    metaTitle: Schema.Attribute.String &
      Schema.Attribute.Required &
      Schema.Attribute.SetMinMaxLength<{
        maxLength: 120;
      }>;
    metaViewport: Schema.Attribute.String;
    openGraph: Schema.Attribute.Component<'shared.open-graph', false>;
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
      'contact-us.contact-form-fields': ContactUsContactFormFields;
      'device.hardware': DeviceHardware;
      'home-sections.benefits': HomeSectionsBenefits;
      'home-sections.benefits-item': HomeSectionsBenefitsItem;
      'home-sections.brands-items': HomeSectionsBrandsItems;
      'home-sections.devices-list': HomeSectionsDevicesList;
      'home-sections.devices-list-items': HomeSectionsDevicesListItems;
      'home-sections.faq': HomeSectionsFaq;
      'home-sections.faq-items': HomeSectionsFaqItems;
      'home-sections.info-text': HomeSectionsInfoText;
      'home-sections.main-offer': HomeSectionsMainOffer;
      'home-sections.other-services-items': HomeSectionsOtherServicesItems;
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
      'it-support.issues': ItSupportIssues;
      'it-support.it-management-plans': ItSupportItManagementPlans;
      'it-support.it-services': ItSupportItServices;
      'it-support.online-access': ItSupportOnlineAccess;
      'it-support.online-access-items': ItSupportOnlineAccessItems;
      'it-support.other-services': ItSupportOtherServices;
      'it-support.plan-includes': ItSupportPlanIncludes;
      'it-support.plan-items': ItSupportPlanItems;
      'it-support.plan-options': ItSupportPlanOptions;
      'it-support.service-items': ItSupportServiceItems;
      'it-support.service-text': ItSupportServiceText;
      'it-support.support': ItSupportSupport;
      'menu.link': MenuLink;
      'menu.menu-sub-items': MenuMenuSubItems;
      'phone-protection.comparison': PhoneProtectionComparison;
      'phone-protection.film-installation': PhoneProtectionFilmInstallation;
      'phone-protection.how-does-it-work': PhoneProtectionHowDoesItWork;
      'phone-protection.illustration': PhoneProtectionIllustration;
      'phone-protection.labels': PhoneProtectionLabels;
      'phone-protection.plans': PhoneProtectionPlans;
      'phone-protection.text-box': PhoneProtectionTextBox;
      'phone-protection.text-cols': PhoneProtectionTextCols;
      'phone-repair.brands': PhoneRepairBrands;
      'product.cols': ProductCols;
      'product.common-repairs': ProductCommonRepairs;
      'product.device-items': ProductDeviceItems;
      'product.identification': ProductIdentification;
      'product.reason-items': ProductReasonItems;
      'product.reasons': ProductReasons;
      'sell.payments': SellPayments;
      'service.booking': ServiceBooking;
      'service.info': ServiceInfo;
      'shared.media': SharedMedia;
      'shared.open-graph': SharedOpenGraph;
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
