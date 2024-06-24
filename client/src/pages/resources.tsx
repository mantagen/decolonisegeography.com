import React, { useEffect, useState } from "react";
import { graphql, useStaticQuery } from "gatsby";
import styled from "styled-components";

import Layout from "../components/layout";
import Seo from "../components/seo";
import { colours, IMAGE_MAX_WIDTH_PX } from "../theme";
import PostImage from "../components/post-image";
import { H2, Subtitle } from "../components/typography";
import { BREAK_POINT_M_PX, BREAK_POINT_S_PX } from "../components/global-style";
import { useFuse } from "../hooks/useFuse";
import FuseHighlight from "../components/fuse-highlight";

import {
  keyStages,
  resourceTypes,
  examBoards,
} from "../../../cms/schemas/documents/resource";
import { ResourceResult } from "../components/resource-result";

const Container = styled.ul`
  max-width: ${IMAGE_MAX_WIDTH_PX}px;
  width: 100%;
  margin: 0 auto;
  flex: auto;
  display: flex;
  flex-direction: column;
`;

const NoResults = styled(Subtitle)`
  flex: auto;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const ResultsRow = styled.div`
  display: flex;
  flex-wrap: wrap;
  margin-left: -0.5rem;
  margin-right: -0.5rem;
  margin-bottom: 1rem;
`;

const Filters = styled.div`
  background-color: ${colours.backgroundGrey};
  padding: 1rem;
  margin-top: 1rem;
`;

const Search = styled.input`
  border: none;
  font-size: 1.3rem;
  padding: 0 0.2rem;
  background-color: white;
  height: 2rem;
  display: flex;
  margin-bottom: 0.6rem;
  border-radius: 0;
  -webkit-appearance: none;
  -moz-appearance: none;
  appearance: none;
  max-width: 100%;

  &::placeholder {
    color: ${colours.textGrey};
  }
`;

const Select = styled.select`
  border: none;
  font-size: 1.3rem;
  padding: 0 0.2rem;
  background-color: white;
  height: 2rem;
  color: ${colours.textGrey};
  display: flex;
  margin-bottom: 0.6rem;
  border-radius: 0;
  -webkit-appearance: none;
  -moz-appearance: none;
  appearance: none;
`;

const Resources: React.FC = () => {
  const {
    resources: { edges },
  } = useStaticQuery<GatsbyTypes.ResourcesQuery>(graphql`
    query Resources {
      resources: allSanityResource(
        filter: { slug: { current: { ne: null } } }
      ) {
        edges {
          node {
            id
            title
            description
            resourceUrl
            keyStage
            resourceType
            examBoard
            topics {
              slug {
                current
              }
              name
            }
            tags
            image {
              asset {
                gatsbyImageData(width: 1192, layout: CONSTRAINED)
              }
              # alt
            }
            # _rawExcerpt
            slug {
              current
            }
          }
        }
      }
    }
  `);

  const [keyStage, setKeyStage] = useState("");
  const [resourceType, setResourceType] = useState("");
  const [examBoard, setExamBoard] = useState("");
  const [searchTerm, setSearchTerm] = useState("");

  const filteredResults = edges
    .map(edge => edge.node)
    .filter(result => {
      if (keyStage && result.keyStage !== keyStage) {
        return false;
      }

      if (resourceType && result.resourceType !== resourceType) {
        return false;
      }

      if (examBoard && result.examBoard !== examBoard) {
        return false;
      }

      return true;
    });

  const options = {
    // isCaseSensitive: false,
    // includeScore: false,
    // shouldSort: true,
    // includeMatches: false,
    // findAllMatches: false,
    // minMatchCharLength: 1,
    // Set location to a high number as we're not concerned by where the match is
    // distance: 100,
    // useExtendedSearch: false,
    // ignoreFieldNorm: false,
    // threshold: 0.6,
    // ignoreLocation: true,
    location: 9999999,
    keys: ["title", "description", "tags", "topics.name"],
    matchAllOnEmptyQuery: true,
    includeMatches: true,
  };

  const { setQuery, hits } = useFuse(filteredResults, options);

  const filteredAndSearchedResults = hits;

  useEffect(() => {
    setQuery(searchTerm);
  }, [searchTerm]);

  return (
    <Layout>
      <Container>
        <Filters>
          <Search
            onChange={e => setSearchTerm(e.target.value)}
            value={searchTerm}
            placeholder="Search by keyword"
            type="search"
          />
          <Select onChange={e => setKeyStage(e.target.value)} value={keyStage}>
            <option value="">Key stage</option>
            {keyStages.map(({ value, title }) => {
              return (
                <option
                  key={`resources__resource-keyStage--${value}`}
                  value={value}
                >
                  {title}
                </option>
              );
            })}
          </Select>
          <Select
            onChange={e => setResourceType(e.target.value)}
            value={resourceType}
          >
            <option value="">Resource Type</option>
            {resourceTypes.map(({ value, title }) => {
              return (
                <option
                  key={`resources__resource-type--${value}`}
                  value={value}
                >
                  {title}
                </option>
              );
            })}
          </Select>
          <Select
            onChange={e => setExamBoard(e.target.value)}
            value={examBoard}
          >
            <option value="">Exam Board</option>
            {examBoards.map(({ value, title }) => {
              return (
                <option key={`resources__exam-board--${value}`} value={value}>
                  {title}
                </option>
              );
            })}
          </Select>
        </Filters>
        {filteredAndSearchedResults.length === 0 && (
          <NoResults>🤷🏽 We couldn't find any results!</NoResults>
        )}
        <ResultsRow>
          {filteredAndSearchedResults.map(hit => (
            <ResourceResult key={hit.item.id} hit={hit} linkMode="page" />
          ))}
        </ResultsRow>
      </Container>
    </Layout>
  );
};

export default Resources;

export const Head = () => <Seo title="Resources" />;
