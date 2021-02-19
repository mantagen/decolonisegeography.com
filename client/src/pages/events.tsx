import React, { Fragment } from "react";
import { graphql, useStaticQuery } from "gatsby";

import Layout from "../components/layout";
import Page from "../components/page";
import Seo from "../components/seo";

const Events: React.FC = () => {
  const {
    allEvents: { edges },
  } = useStaticQuery<GatsbyTypes.EventsQuery>(graphql`
    query Events {
      allEvents: allSanityEvents {
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
    console.error("No 'events' page found");
    return <Layout />;
  }

  if (edges.length > 1) {
    console.warn(
      `Only one 'events' page should exist, but found ${edges.length}`
    );
  }

  const [{ node }] = edges;

  const { _rawBody } = node;

  return (
    <Fragment>
      <Seo title="Events" />
      <Page blocks={_rawBody} />;
    </Fragment>
  );
};

export default Events;
