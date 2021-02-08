// https://orbit.love/blog/how-to-add-twitter-and-instagram-embeds-on-an-eleventy-website-using-sanity/

import React from "react";

import { TwitterTweetEmbed } from "react-twitter-embed";

const Preview = ({ value }) => {
  const { id } = value;
  return <TwitterTweetEmbed tweetId={id} options={{ conversation: "none" }} />;
};

export default {
  name: "twitter",
  type: "object",
  title: "Twitter Embed",
  icon: () => (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 29 29"
      fill="currentColor"
    >
      <path d="M22.05 7.54a4.47 4.47 0 0 0-3.3-1.46 4.53 4.53 0 0 0-4.53 4.53c0 .35.04.7.08 1.05A12.9 12.9 0 0 1 5 6.89a5.1 5.1 0 0 0-.65 2.26c.03 1.6.83 2.99 2.02 3.79a4.3 4.3 0 0 1-2.02-.57v.08a4.55 4.55 0 0 0 3.63 4.44c-.4.08-.8.13-1.21.16l-.81-.08a4.54 4.54 0 0 0 4.2 3.15 9.56 9.56 0 0 1-5.66 1.94l-1.05-.08c2 1.27 4.38 2.02 6.94 2.02 8.3 0 12.86-6.9 12.84-12.85.02-.24 0-.43 0-.65a8.68 8.68 0 0 0 2.26-2.34c-.82.38-1.7.62-2.6.72a4.37 4.37 0 0 0 1.95-2.51c-.84.53-1.81.9-2.83 1.13z"></path>
    </svg>
  ),
  fields: [
    {
      name: "id",
      type: "string",
      title: "Twitter tweet ID",
    },
  ],
  preview: {
    select: {
      id: "id",
    },
    component: Preview,
  },
};
