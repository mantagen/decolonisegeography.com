import { graphql, useStaticQuery } from "gatsby";
import React from "react";
import Layout from "../components/layout";
import Page from "../components/page";

const About: React.FC = () => {
  const {
    allContact: { edges },
  } = useStaticQuery<GatsbyTypes.ContactQuery>(graphql`
    query Contact {
      allContact: allSanityContact {
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
    console.error("No 'contact' page found");
    return <Layout />;
  }

  if (edges.length > 1) {
    console.warn(
      `Only one 'contact' page should exist, but found ${edges.length}`
    );
    return <Layout />;
  }

  const [{ node }] = edges;

  const { _rawBody } = node;

  return <Page blocks={_rawBody} />;
};

export default About;
