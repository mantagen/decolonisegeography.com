import React from "react";
import { graphql } from "gatsby";
import Layout from "../components/layout";
import Post from "../components/post";
import { DeepRequired } from "../helpers/deep-required";
import useSiteSettings from "../hooks/useSiteSettings";
import Seo from "../components/seo";

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
          gatsbyImageData(width: 1192, layout: CONSTRAINED)
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
        twitterHandle
        websiteUrl
      }
    }
  }
`;

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
}
const PostTemplate: React.FC<PostTemplateProps> = ({ data }) => {
  const siteSettings = useSiteSettings();

  if (!data || !data.post) {
    return null;
  }

  return (
    <Layout>
      <Post post={data.post} siteSettings={siteSettings} />
    </Layout>
  );
};

export default PostTemplate;

export const Head = props => {
  const { title, subtitle, authors = [], mainImage } = props.data.post;
  return (
    <Seo
      title={title}
      description={subtitle}
      image={mainImage?.asset?.gatsbyImageData?.images?.fallback?.src}
      author={authors[0]}
    />
  );
};
