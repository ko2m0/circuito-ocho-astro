// @ts-check

import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';

export default defineConfig({

  site: process.env.PUBLIC_SITE_URL || 'https://circuitoocho.com',

  integrations: [

    sitemap()

  ],

  trailingSlash: 'never'

});