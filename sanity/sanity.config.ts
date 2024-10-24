import {defineConfig} from 'sanity'
import {structureTool} from 'sanity/structure'
import {visionTool} from '@sanity/vision'
import {schemaTypes} from './schemaTypes'

import {markdownSchema} from 'sanity-plugin-markdown'

export default defineConfig({
  name: 'default',
  title: 'Gestalt',

  projectId: 'k05lbr97',
  dataset: 'docs',

  plugins: [structureTool(), visionTool(), markdownSchema()],

  auth: {
    mode: 'append',
    providers: [
      {
        name: 'pinterest-sso',
        title: 'Pinterest',
        url: 'https://api.sanity.io/v2021-10-01/auth/saml/login/b5edb0a8',
      },
    ],
  },

  schema: {
    types: schemaTypes,
  },
})
