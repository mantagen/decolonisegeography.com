import React from "react";

import getYouTubeId from "get-youtube-id";
import ReactYoutube from "react-youtube";
import styled from "styled-components";

const YoutubeRoot = styled.div`
  margin-top: 1em;
  position: relative;
  overflow: hidden;
  width: 100%;

  &::after {
    display: block;
    content: "";
    padding-top: 56.25%;
  }
`;
const YoutubeIframe = styled(ReactYoutube)`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
`;

interface YoutubeProps {
  url: string;
}
const Youtube: React.FC<YoutubeProps> = props => {
  const { url } = props;
  const id = getYouTubeId(url) || undefined;

  return (
    <YoutubeRoot>
      <YoutubeIframe videoId={id} />;
    </YoutubeRoot>
  );
};

export default Youtube;
