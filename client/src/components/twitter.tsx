import React from "react";
// @ts-ignore
import { TwitterTweetEmbed } from "react-twitter-embed";

interface TwitterProps {
  id: string;
}
const Twitter = (props: TwitterProps) => {
  const { id } = props;
  return <TwitterTweetEmbed tweetId={id} options={{ conversation: "none" }} />;
};

export default Twitter;
