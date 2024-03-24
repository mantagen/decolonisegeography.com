/**
 * Configure your Gatsby site with this file.
 *
 * See: https://www.gatsbyjs.com/docs/gatsby-config/
 */

import { GatsbyConfig } from "gatsby";

import sanityConfig from "./sanity-config";

const config: GatsbyConfig = {
  /* Your site config here */
  siteMetadata: {
    title: `Decolonise Geography`,
    author: `Nona Anderson`,
    description: `A blog about decolonising the geography curriculum in schools`,
    siteUrl: `https://decolonisegeography.co.uk`,
  },
  graphqlTypegen: true,
  plugins: [
    `gatsby-plugin-sharp`,
    `gatsby-transformer-sharp`,
    `gatsby-plugin-styled-components`,
    `gatsby-plugin-sitemap`,
    `gatsby-plugin-robots-txt`,
    `gatsby-plugin-image`,
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
    ...(process.env.GOOGLE_ANALYTICS_GTAG_ID
      ? [
          {
            resolve: `gatsby-plugin-google-gtag`,
            options: {
              trackingIds: [process.env.GOOGLE_ANALYTICS_GTAG_ID],
            },
          },
        ]
      : []),
  ],
};

export default config;
