import React from "react";
// @ts-ignore
import { TwitterTweetEmbed } from "react-twitter-embed";
import styled from "styled-components";

const TwitterRoot = styled(TwitterTweetEmbed)`
  margin-top: 1em;
`;

interface TwitterProps {
  id: string;
}
const Twitter = (props: TwitterProps) => {
  const { id } = props;
  return <TwitterTweetEmbed tweetId={id} options={{ conversation: "none" }} />;
};

export default Twitter;
