const { isFuture, format } = require("date-fns");
/**
 * Implement Gatsby's Node APIs in this file.
 *
 * See: https://www.gatsbyjs.org/docs/node-apis/
 */

// TODO: this is a dupe of src/helpers/getBlogPostPath.ts
function getBlogPostPath({ publishedAt, slug }) {
  const dateSegment = format(new Date(publishedAt), "yyyy/MM");

  return `/blog/${dateSegment}/${slug.current}/`;
}

exports.createPages = async ({ graphql, actions, reporter }) => {
  const { createPage } = actions;
  const postsResult = await graphql(`
    {
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
        component: require.resolve("./src/templates/post.tsx"),
        context: { id },
      });
    });

  const pagesResult = await graphql(`
    {
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

  const pageEdges = (pagesResult.data.allSanityPage || {}).edges || [];

  pageEdges.forEach((edge, index) => {
    const { id, _rawBody, title } = edge.node;
    createPage({
      path: edge.node.slug.current,
      component: require.resolve("./src/templates/page.tsx"),
      context: { id, _rawBody, title },
    });
  });
};
