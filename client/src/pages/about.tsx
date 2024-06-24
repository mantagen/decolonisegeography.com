import { graphql, useStaticQuery } from "gatsby";
import React from "react";
import Layout from "../components/layout";
import PortableText from "../components/portable-text";
import PostArticle from "../components/post-article";
import PostContent from "../components/post-content";
import Seo from "../components/seo";

const About: React.FC = () => {
  const {
    allAbout: { edges },
  } = useStaticQuery<GatsbyTypes.AboutQuery>(graphql`
    query About {
      allAbout: allSanityAbout {
        edges {
          node {
            title
            _rawBody(resolveReferences: { maxDepth: 5 })
          }
        }
      }
    }
  `);

  if (!edges[0]) {
    console.error("No 'about' page found");
    return <Layout />;
  }

  if (edges.length > 1) {
    console.warn(
      `Only one 'about' page should exist, but found ${edges.length}`
    );
  }

  const [{ node }] = edges;

  const { _rawBody } = node;

  return (
    <Layout>
      <PostArticle>
        <PostContent>
          <PortableText blocks={_rawBody} />
        </PostContent>
      </PostArticle>
    </Layout>
  );
};

export default About;

export const Head = () => <Seo title="About" />;
