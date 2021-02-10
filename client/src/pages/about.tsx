import { graphql, useStaticQuery } from "gatsby";
import React from "react";
import styled from "styled-components";
import Layout from "../components/layout";
import PortableText from "../components/portable-text";
import PostArticle from "../components/post-article";
import PostContent from "../components/post-content";
import Seo from "../components/seo";
import { IMAGE_MAX_WIDTH_PX } from "../theme";
// import Page from "../components/page";
import map from "./map.png";

const MapContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  flex: auto;
`;
const MapImg = styled.img`
  max-width: ${IMAGE_MAX_WIDTH_PX}px;
  width: 100%;
`;

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
      <Seo title="About" />
      <PostArticle>
        <PostContent>
          <PortableText blocks={_rawBody} />
        </PostContent>
      </PostArticle>
    </Layout>
  );
};

export default About;
