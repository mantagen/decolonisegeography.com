import React from "react";

import getYouTubeId from "get-youtube-id";
import ReactYoutube from "react-youtube";

interface YoutubeProps {
  url: string;
}
const Youtube: React.FC<YoutubeProps> = props => {
  const { url } = props;
  const id = getYouTubeId(url) || undefined;

  return <ReactYoutube videoId={id} />;
};

export default Youtube;
