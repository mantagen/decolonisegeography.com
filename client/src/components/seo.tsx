import React from "react";
import { useLocation } from "@reach/router";
import useSiteSettings from "../hooks/useSiteSettings";

export type SeoProps = {
  title?: string;
  description?: string;
  image?: string;
  author?: Pick<GatsbyTypes.SanityAuthor, "name" | "twitterHandle">;
};

const Seo: React.FC<SeoProps> = props => {
  const { pathname } = useLocation();
  const defaults = useSiteSettings();

  if (defaults.siteUrl === "" && typeof window !== "undefined") {
    defaults.siteUrl = window.location.origin;
  }

  if (defaults.siteUrl === "") {
    console.warn("Please set a siteUrl in your site settings!");
    return null;
  }

  const author = props.author || defaults.author;
  const title = props.title
    ? `${props.title} - ${defaults.title}`
    : defaults.title;
  const description = props.description || defaults.description;
  const url = defaults.siteUrl ? new URL(pathname, defaults.siteUrl).href : "";

  const image = defaults.siteUrl
    ? props.image
      ? new URL(props.image, defaults.siteUrl).href
      : false
    : false;

  const siteTwitterHandle = defaults.twitterHandle;

  return (
    <>
      <title>{props.title || defaults.title}</title>
      <link rel="canonical" href={url} />
      <meta name="description" content={description} />
      {image && <meta name="image" content={image} />}

      <meta property="og:url" content={url} />
      <meta property="og:type" content="article" />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      {image && <meta property="og:image" content={image} />}

      <meta name="twitter:card" content="summary_large_image" />
      {author && <meta name="twitter:creator" content={author.twitterHandle} />}
      {siteTwitterHandle && (
        <meta name="twitter:site" content={siteTwitterHandle} />
      )}
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      {image && <meta name="twitter:image" content={image} />}
      <html lang="en" />
    </>
  );
};

export default Seo;
