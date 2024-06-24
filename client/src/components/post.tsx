import React, { Fragment } from "react";
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
const AuthorLink = styled.a`
  color: rgb(0, 140, 255);
`;
const PublishedAt = styled.span`
  color: rgba(0, 0, 0, 0.84);
`;

const PostSubtitle = styled(Subtitle)`
  margin: 0 0 1.14286em 0;
`;

const SocialLink = styled.a``;

interface PostProps extends PostTemplateData {
  siteSettings: SiteSettings;
}

const Post: React.FC<PostProps> = props => {
  const { post, siteSettings } = props;

  const { siteUrl } = siteSettings;

  let {
    title,
    subtitle,
    authors = [],
    _rawBody,
    mainImage,
    publishedAt,
    slug,
  } = post;

  return (
    <PostArticle>
      <PostHeader>
        <H1>{title}</H1>
        <PostSubtitle as="p">{subtitle}</PostSubtitle>
        <ByLineAndSocial>
          <span>
            Written by{" "}
            {authors.map((author, i) => {
              if (!author) {
                return null;
              }

              const getPunctuation = (index: number, total: number) => {
                const isLast = i === authors.length - 1;
                const isPenultimate = i === authors.length - 2;
                if (isLast) {
                  return " ";
                }
                if (total === 2) {
                  return " and ";
                }
                if (isPenultimate) {
                  return ", and ";
                }
                return ", ";
              };

              const authorHref = author.twitterHandle
                ? `https://twitter.com/${author.twitterHandle}`
                : author.websiteUrl
                ? author.websiteUrl
                : "#";

              return (
                <Fragment>
                  <AuthorLink
                    rel="author"
                    target={authorHref === "#" ? undefined : "_blank"}
                    href={authorHref}
                  >
                    {author.name}
                  </AuthorLink>
                  {getPunctuation(i, authors.length)}
                </Fragment>
              );
            })}
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
