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
  const result = await graphql(`
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

  if (result.errors) {
    reporter.panicOnBuild(`Error while running GraphQL query.`);
    return;
  }

  const postEdges = (result.data.allSanityPost || {}).edges || [];

  postEdges
    .filter(edge => !isFuture(new Date(edge.node.publishedAt)))
    .forEach((edge, index) => {
      const { id } = edge.node;
      createPage({
        path: getBlogPostPath(edge.node),
        component: require.resolve("./src/templates/post.tsx"),
        context: { id },
      });
    });
};
