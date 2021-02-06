import { graphql, useStaticQuery } from "gatsby";
import React from "react";
import Layout from "../components/layout";
import Page from "../components/page";

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

  return <Page blocks={_rawBody} />;
};

export default About;
