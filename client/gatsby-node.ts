import { CreatePagesArgs } from "gatsby";
import { format } from "date-fns";
import path from "path";
import getResourcePagePath from "./src/helpers/get-resource-page-path";

/**
 * Implement Gatsby's Node APIs in this file.
 *
 * See: https://www.gatsbyjs.org/docs/node-apis/
 */

// TODO: this is a dupe of src/helpers/getBlogPostPath.ts
function getBlogPostPath({
  publishedAt,
  slug,
}: {
  publishedAt: string;
  slug: { current: string };
}) {
  const dateSegment = format(new Date(publishedAt), "yyyy/MM");

  return `/blog/${dateSegment}/${slug.current}/`;
}

export const createPages = async ({
  graphql,
  actions,
  reporter,
}: CreatePagesArgs) => {
  console.log("Creating pages");

  const { createPage } = actions;
  const postsResult = await graphql(`
    query GetPosts {
      allSanityPost(
        filter: { slug: { current: { ne: null } }, publishedAt: { ne: null } }
      ) {
        edges {
          node {
            id
            publishedAt
            slug {
              current
            }
          }
        }
      }
    }
  `);

  if (postsResult.errors) {
    console.log(postsResult.errors);
    reporter.panicOnBuild(`Error while running posts GraphQL query.`);
    return;
  }

  const postEdges = (postsResult.data.allSanityPost || {}).edges || [];

  postEdges
    // TODO: we can't filter here because it's build time filter, so when the publish date
    // becomes past, we will need to trigger a build in order for this page to exist.
    // Therefore, even with 'future' published article, they will still be accessible,
    // just not visible on the home page
    // .filter(edge => !isFuture(new Date(edge.node.publishedAt)))
    .forEach((edge, index) => {
      const { id } = edge.node;
      createPage({
        path: getBlogPostPath(edge.node),
        component: path.resolve("./src/templates/post.tsx"),
        context: { id },
      });
    });

  const pagesResult = await graphql(`
    query GetPages {
      allSanityPage(filter: { slug: { current: { ne: null } } }) {
        edges {
          node {
            id
            slug {
              current
            }
            _rawBody
            title
          }
        }
      }
    }
  `);

  if (pagesResult.errors) {
    console.log(pagesResult.errors);
    reporter.panicOnBuild(`Error while running pages GraphQL query.`);
    return;
  }

  const pageEdges = (pagesResult?.data?.allSanityPage || {}).edges || [];

  pageEdges.forEach((edge, index) => {
    const { id, _rawBody, title } = edge.node;
    createPage({
      path: edge.node.slug.current,
      component: path.resolve("./src/templates/page.tsx"),
      context: { id, _rawBody, title },
    });
  });

  const resourcesResult = await graphql(`
    query Resources {
      resources: allSanityResource(
        filter: { slug: { current: { ne: null } } }
      ) {
        edges {
          node {
            id
            title
            description
            resourceUrl
            keyStage
            resourceType
            examBoard
            topics {
              slug {
                current
              }
              name
            }
            tags
            image {
              asset {
                gatsbyImageData(width: 1192, layout: CONSTRAINED)
              }
              # alt
            }
            # _rawExcerpt
            slug {
              current
            }
          }
        }
      }
    }
  `);

  if (resourcesResult.errors) {
    console.log(resourcesResult.errors);
    reporter.panicOnBuild(`Error while running posts GraphQL query.`);
    throw new Error("Error while running resources GraphQL query.");
  }

  console.log(
    resourcesResult,
    `
    
    
    GOT IT
    
    
    
    `
  );

  const resourceEdges = resourcesResult?.data?.resources?.edges || [];

  resourceEdges.forEach((edge, index) => {
    console.log("Creating page: ", edge.node.slug.current);
    createPage({
      path: getResourcePagePath(edge.node),
      component: path.resolve("./src/templates/resource.tsx"),
      context: edge.node,
    });
  });
};
 