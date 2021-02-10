import { Link } from "gatsby";
import React from "react";
import styled from "styled-components";
import formatDate from "../helpers/format-date";
import { BREAK_POINT_M_PX, BREAK_POINT_S_PX } from "./global-style";
import PostImage, { PostImageProps } from "./post-image";

const PostPreviewRoot = styled.div<{ variant: PostPreviewVariant }>`
  display: flex;
  flex-direction: column;
  position: relative;
  margin-top: 30px;
  padding: 0 0.5rem;
  width: 100%;
  min-width: 100%;

  ${props =>
    props.variant === "whole" &&
    `
    @media(min-width: ${BREAK_POINT_M_PX}px) {
      flex-direction: row;
    }
  `}

  ${props =>
    props.variant === "half" &&
    `
    @media(min-width: ${BREAK_POINT_S_PX}px) {
      width: 50%;
      min-width: 50%;
    }
  `}

  ${props =>
    props.variant === "third" &&
    `
    @media(min-width: ${BREAK_POINT_M_PX}px) {
      width: 33.33333%;
      min-width: 33.33333%;
    }
  `}
`;
const PostPreviewImageWrapper = styled.div<{ variant: PostPreviewVariant }>`
  width: 100%;
  min-width: 100%;

  ${props =>
    props.variant === "whole" &&
    `
    @media(min-width: ${BREAK_POINT_M_PX}px) {
      width: 66.6666666%;
      min-width: 66.6666666%;
      padding-right: 1rem;
    }
  `}
`;
const PostPreviewImage = styled(PostImage)`
  border: 1px solid rgba(0, 0, 0, 0.15);
  height: 100%;
`;
const PostPreviewTitle = styled.h2<{ variant: PostPreviewVariant }>`
  font-family: "Lato", sans-serif;
  font-weight: 700;
  font-size: 1.2381rem;
  margin: 0.5rem 0;

  ${props =>
    props.variant === "whole" &&
    `
    @media(min-width: ${BREAK_POINT_M_PX}px) {
      margin: 0.2rem 0 0.5rem;
    }
  `}
`;
const PostPreviewSubtitle = styled.p`
  font-family: "Lato", sans-serif;
  color: rgba(0, 0, 0, 0.54);
  font-size: 0.9rem;
  margin: 0 0 0.5em 0;
  line-height: 1.3em;
`;
const PostPreviewLink = styled(Link)`
  text-decoration: none;

  &::after {
    content: "";
    display: block;
    position: absolute;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
  }
`;

const PostPreviewText = styled.div`
  flex: auto;
`;

const PublishedAt = styled.p`
  font-size: 0.9rem;
`;

type PostPreviewVariant = "full" | "whole" | "half" | "third";

interface PostPreviewProps {
  image: PostImageProps;
  title: string;
  subtitle: string;
  path: string;
  publishedAt: string;
  variant: PostPreviewVariant;
}

const PostPreview: React.FC<PostPreviewProps> = props => {
  const { image, title, subtitle, path, publishedAt, variant } = props;

  const postImage = {
    ...image,
    asset: {
      ...image.asset,
      fluid: { ...image.asset.fluid, aspectRatio: 16 / 9 },
    },
  };
  return (
    <PostPreviewRoot variant={variant}>
      <PostPreviewImageWrapper variant={variant}>
        <PostPreviewImage {...postImage} />
      </PostPreviewImageWrapper>
      <PostPreviewText>
        <PostPreviewTitle variant={variant}>
          <PostPreviewLink to={path}>{title}</PostPreviewLink>
        </PostPreviewTitle>
        <PostPreviewSubtitle>{subtitle}</PostPreviewSubtitle>
        <PublishedAt>{formatDate(publishedAt)}</PublishedAt>
      </PostPreviewText>
    </PostPreviewRoot>
  );
};

export default PostPreview;
