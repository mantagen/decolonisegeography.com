import React, { Fragment } from "react";
import { graphql, useStaticQuery } from "gatsby";

import Layout from "../components/layout";
import Page from "../components/page";
import Seo from "../components/seo";

const Resources: React.FC = () => {
  const {
    allResources: { edges },
  } = useStaticQuery<GatsbyTypes.ResourcesQuery>(graphql`
    query Resources {
      allResources: allSanityResources {
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
    console.error("No 'resources' page found");
    return <Layout />;
  }

  if (edges.length > 1) {
    console.warn(
      `Only one 'resources' page should exist, but found ${edges.length}`
    );
  }

  const [{ node }] = edges;

  const { _rawBody } = node;

  return (
    <Fragment>
      <Seo title="Resources" />
      <Page blocks={_rawBody} />;
    </Fragment>
  );
};

export default Resources;
