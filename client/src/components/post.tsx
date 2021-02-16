import { Link } from "gatsby";
import React from "react";
import styled from "styled-components";

import { PostTemplateData } from "../templates/post";
import formatDate from "../helpers/format-date";
import getBlogPostPath from "../helpers/get-blog-post-path";
import PortableText from "./portable-text";
import TwitterIcon from "./twitter-icon";
import { H1, Subtitle } from "./typography";
import PostArticle from "./post-article";
import PostContent from "./post-content";
import PostHeader from "./post-header";
import PostImage from "./post-image";
import PostMainImage from "./post-main-image";
import { SiteSettings } from "../hooks/useSiteSettings";
import Seo from "./seo";

const ByLineAndSocial = styled.div`
  display: flex;
  justify-content: space-between;
  color: rgba(0, 0, 0, 0.54);
`;
const AuthorLink = styled(Link)`
  color: rgb(0, 140, 255);
`;
const PublishedAt = styled.span`
  color: rgba(0, 0, 0, 0.84);
`;

const SocialLink = styled.a``;

interface PostProps extends PostTemplateData {
  siteSettings: SiteSettings;
}

const Post: React.FC<PostProps> = props => {
  const { post, siteSettings } = props;

  const { siteUrl } = siteSettings;

  const {
    title,
    subtitle,
    authors,
    _rawBody,
    mainImage,
    publishedAt,
    slug,
  } = post;

  return (
    <PostArticle>
      <Seo
        title={title}
        description={subtitle}
        image={mainImage.asset?.fluid?.src}
        author={authors[0]}
      />
      <PostHeader>
        <H1>{title}</H1>
        <Subtitle as="p">{subtitle}</Subtitle>
        <ByLineAndSocial>
          <span>
            Written by{" "}
            <AuthorLink
              rel="author"
              to={
                authors[0]?.twitterHandle
                  ? `https://twitter.com/${authors[0].twitterHandle}`
                  : "/about"
              }
            >
              {authors[0]?.name}
            </AuthorLink>{" "}
            on <PublishedAt>{formatDate(publishedAt)}</PublishedAt>
          </span>
          <SocialLink
            // TODO: add author data to the tweet text
            href={`https://twitter.com/share?url=${siteUrl}${getBlogPostPath({
              publishedAt,
              slug,
            })}&text=${title}:`}
            target="_blank"
          >
            <TwitterIcon width={"1.5rem"} height={"1.5rem"} />
          </SocialLink>
        </ByLineAndSocial>
      </PostHeader>
      {mainImage && (
        <PostMainImage>
          <PostImage
            {...{
              ...mainImage,
              asset: {
                ...mainImage.asset,
                fluid: { ...mainImage.asset.fluid, aspectRatio: 16 / 9 },
              },
            }}
          />
        </PostMainImage>
      )}
      <PostContent>
        <PortableText blocks={_rawBody} />
      </PostContent>
    </PostArticle>
  );
};

export default Post;
