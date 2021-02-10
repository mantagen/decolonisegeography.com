import { graphql, useStaticQuery } from "gatsby";

const useSiteSettings = () => {
  const {
    allSiteSettings: { edges },
  } = useStaticQuery<GatsbyTypes.SeoQuery>(graphql`
    query Seo {
      allSiteSettings: allSanitySiteSettings {
        edges {
          node {
            siteUrl
            title
            description
            keywords
            author {
              name
            }
          }
        }
      }
    }
  `);

  if (!edges[0]) {
    throw new Error("No edges returned from allSiteSettings");
  }

  // Destructuring in order to
  const defaults = { ...edges[0].node };

  return defaults;
};

export type SiteSettings = ReturnType<typeof useSiteSettings>;

export default useSiteSettings;
