import type { StrapiApp } from '@strapi/strapi/admin';
import {
  setPluginConfig,
  type PluginConfig,
  type Preset,
  defaultHtmlPreset,
} from '@_sh/strapi-plugin-ckeditor';

const htmlPreset: Preset = {
  ...defaultHtmlPreset,
  editorConfig: {
    ...defaultHtmlPreset.editorConfig,
    toolbar: [
      'heading',
      '|',
      'bold',
      'italic',
      'underline',
      'strikethrough',
      'highlight',
      '|',
      'alignment',
      'indent',
      'outdent',
      '|',
      'numberedList',
      'bulletedList',
      '|',
      'blockQuote',
      'code',
      'codeBlock',
      '|',
      'link',
      'imageUpload',
      'insertTable',
      'mediaEmbed',
      'strapiMediaLib',
      '|',
      'undo',
      'redo',
      'removeFormat',
      'sourceEditing', // Додаємо кнопку перегляду коду
    ],
    link: {
      decorators: {
        openInNewTab: {
          mode: 'manual',
          label: 'Open in a new tab',
          attributes: {
            target: '_blank',
            rel: 'noopener noreferrer',
          },
        },
      },
    },
    htmlSupport: {
      disallow: [
        {
          name: /.*/,        // усі теги
          styles: true       // забороняємо будь-які style=""
        },
      ],
    },
  },
};

const config: PluginConfig = {
  presets: [htmlPreset],
};

export default {
  config: {
    locales: ['uk'], // Урахування мовних налаштувань
  },
  register(app: StrapiApp) {
    setPluginConfig(config);
  },
};