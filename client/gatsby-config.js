/**
 * Configure your Gatsby site with this file.
 *
 * See: https://www.gatsbyjs.com/docs/gatsby-config/
 */

require("dotenv").config({
  path: `.env`,
});
const sanityConfig = require("./sanity-config");

module.exports = {
  /* Your site config here */
  siteMetadata: {
    title: `Decolonise Geography`,
    author: `Nona Anderson`,
    description: `A blog about decolonising the geography curriculum in schools`,
    siteUrl: `https://decolonisegeography.co.uk`,
  },
  plugins: [
    {
      resolve: `gatsby-plugin-typegen`,
      options: {
        outputPath: `src/__generated__/gatsby-types.d.ts`,
        emitSchema: {
          "src/__generated__/gatsby-introspection.json": true,
          "src/__generated__/gatsby-schema.graphql": true,
        },
        emitPluginDocuments: {
          "src/__generated__/gatsby-plugin-documents.graphql": true,
        },
      },
    },
    {
      resolve: `gatsby-source-sanity`,
      options: {
        ...sanityConfig,
        // a token with read permissions is required
        // if you have a private dataset
        // token: process.env.SANITY_TOKEN,

        // If the Sanity GraphQL API was deployed using `--tag <name>`,
        // use `graphqlTag` to specify the tag name. Defaults to `default`.
        graphqlTag: "default",
      },
    },
    {
      resolve: `gatsby-plugin-typescript`,
      options: {
        isTSX: true, // defaults to false
        jsxPragma: `jsx`, // defaults to "React"
        allExtensions: true, // defaults to false
      },
    },
    `gatsby-plugin-styled-components`,
    `gatsby-plugin-sitemap`,
    {
      resolve: `gatsby-plugin-google-gtag`,
      options: {
        trackingIds: [process.env.GOOGLE_ANALYTICS_GTAG_ID],
      },
    },
    `gatsby-plugin-robots-txt`,
    `gatsby-plugin-react-helmet`,
  ],
};
