import React from "react";
import { graphql } from "gatsby";
import Layout from "../components/layout";
import Post from "../components/post";
import { DeepRequired } from "../utils/deep-required";

export const query = graphql`
  query PostTemplate($id: String!) {
    post: sanityPost(id: { eq: $id }) {
      title
      subtitle
      publishedAt
      # description
      categories {
        _key
        title
      }
      slug {
        current
      }
      mainImage {
        asset {
          fluid(maxWidth: 1192) {
            aspectRatio
            src
            srcSet
            srcWebp
            srcSetWebp
            sizes
          }
        }
        # alt
      }
      _rawBody(resolveReferences: { maxDepth: 5 })
      authors {
        _key
        # image {
        #   asset {
        #     fixed(width: 40, height: 40) {
        #       ...GatsbySanityImageFixed
        #     }
        #   }
        # }
        name
        # twitter
      }
    }
  }
`;

// type PostTemplateData = DeepRequired

export type PostTemplateData = DeepRequired<
  GatsbyTypes.PostTemplateQuery,
  | ["post", "title"]
  | ["post", "_rawBody"]
  | ["post", "subtitle"]
  | ["post", "slug"]
  | ["post", "authors", "name"]
  | ["post", "publishedAt"]
  | ["post", "categories"]
  | ["post", "mainImage"]
>;

interface PostTemplateProps {
  data: PostTemplateData;
  pageContext: any;
}
const PostTemplate: React.FC<PostTemplateProps> = ({ data, pageContext }) => {
  if (!data || !data.post) {
    return null;
  }

  return (
    <Layout>
      <Post post={data.post} />
    </Layout>
  );
};

export default PostTemplate;
