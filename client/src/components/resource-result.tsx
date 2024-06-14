import React from "react";
import PostImage from "../components/post-image";
import { H2 } from "../components/typography";
import { BREAK_POINT_M_PX, BREAK_POINT_S_PX } from "../components/global-style";
import FuseHighlight from "../components/fuse-highlight";

import {
  keyStages,
  resourceTypes,
  examBoards,
} from "../../../cms/schemas/documents/resource";
import styled from "styled-components";
import { colours } from "../theme";
import getResourcePagePath from "../helpers/get-resource-page-path";

const getKeyStage = (value: string | undefined) => {
  return keyStages.find(keyStage => keyStage.value === value);
};

const getResourceType = (value: string | undefined) => {
  return resourceTypes.find(resourceType => resourceType.value === value);
};

const getExamBoard = (value: string | undefined) => {
  return examBoards.find(examBoard => examBoard.value === value);
};

const Result = styled.div`
  position: relative;
  margin-top: 2rem;
  padding: 0 0.5rem;
  width: 100%;
  min-width: 100%;

  transition: opacity 0.1s ease-out;
  &:hover {
    opacity: 0.9;
  }

  @media (min-width: ${BREAK_POINT_M_PX}px) {
    width: 33.33333%;
    min-width: 33.33333%;
  }
`;
const ResultContent = styled.div`
  display: flex;
  flex-direction: column;
  box-shadow: rgba(0, 0, 0, 0.08) 0px 0px 4px, rgba(0, 0, 0, 0.16) 0px 4px 12px;
`;

const ResultImageWrapper = styled.div`
  position: relative;
`;
const ResultImageShadow = styled.div`
  word-break: break-word;
  max-width: 100%;
  align-items: flex-end;
  display: flex;
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  height: 3rem;
  padding: 0.5rem;
  background: linear-gradient(rgba(0, 0, 0, 0) 0%, rgba(0, 0, 0, 0.6) 100%);
`;
const ResultImage = styled(PostImage)`
  width: 100%;
  height: 150px;

  @media (min-width: ${BREAK_POINT_S_PX}px) {
    height: 220px;
  }
`;

const ResultTextWrapper = styled.div`
  padding: 1rem;
`;
const ResourceResourceUrl = styled.a`
  &:after {
    content: "";
    display: block;
    position: absolute;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
  }
`;
const ResultTitle = styled(H2)`
  margin-bottom: 0.5rem;
`;
const ResultResourceType = styled.div`
  font-family: "Lato", sans-serif;
  margin-bottom: 0.5rem;
`;
const ResultKeyStage = styled.div`
  font-family: "Lato", sans-serif;
  margin-bottom: 0.5rem;
`;
const ResultTags = styled.div`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
`;
const ResultTag = styled.span`
  display: inline-flex;
  background-color: ${colours.backgroundGrey};
  color: ${colours.black};
  font-size: 0.8rem;
  margin-left: 0.2rem;
  padding: 0 0.3rem;
  align-items: center;
  font-family: "Lato", sans-serif;
`;

export function ResourceResult({
  linkMode,
  hit,
}: {
  linkMode: "page" | "asset";
  hit: {
    item: {
      id: string;
      image: any;
      resourceUrl: string;
      title: string;
      resourceType: string;
      keyStage: string;
      slug: { current: string };
      topics: { slug: { current: string }; name: string }[];
      examBoard: string;
    };
    matches: any[];
    refIndex: number;
    score: number;
  };
}) {
  const resourceUrlProps =
    linkMode === "page"
      ? { href: getResourcePagePath(hit.item) }
      : { href: hit.item?.resourceUrl, target: "_blank" };

  return (
    <Result key={`resources__resource--${hit.item?.id}`}>
      <ResultContent>
        <ResultImageWrapper>
          <ResultImage {...hit.item?.image} />
          <ResultImageShadow />
        </ResultImageWrapper>
        <ResultTextWrapper>
          <ResultTitle>
            <ResourceResourceUrl {...resourceUrlProps}>
              <FuseHighlight
                hit={hit}
                fallback={hit.item.title}
                isMatch={m => m.key === "title"}
              />
            </ResourceResourceUrl>
          </ResultTitle>
          <ResultResourceType>
            📝 {getResourceType(hit.item?.resourceType)?.title}
          </ResultResourceType>
          <ResultKeyStage>
            🎓 {getKeyStage(hit.item?.keyStage)?.title}
          </ResultKeyStage>
          <ResultTags>
            🏷️
            {hit.item?.topics?.map((topic, i) => (
              <ResultTag key={`resources__resource-tag--${topic.slug.current}`}>
                <FuseHighlight
                  hit={hit}
                  fallback={topic.name}
                  isMatch={m => m.key === "topics.name" && m.refIndex === i}
                />
              </ResultTag>
            ))}
            {hit.item?.examBoard && (
              <ResultTag>{getExamBoard(hit.item?.examBoard)?.title}</ResultTag>
            )}
          </ResultTags>
        </ResultTextWrapper>
      </ResultContent>
    </Result>
  );
}
