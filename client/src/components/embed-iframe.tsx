import React from "react";
import styled from "styled-components";
import { colours } from "../theme";

const EmbedIframeRoot = styled.div`
  background-color: ${colours.backgroundGrey};
  position: relative;
  height: 0;
  padding-bottom: 56.25%;
  overflow: hidden;
  /* Not needed if it's a block element, like a div */
  width: 100%;
  margin-top: 1em;

  iframe {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    border: none;
  }
`;

interface EmbedIframeProps {
  src: string;
}
const EmbedIframe: React.FC<EmbedIframeProps> = props => {
  const { children, src } = props;

  return (
    <EmbedIframeRoot
      dangerouslySetInnerHTML={{
        __html: `<iframe src="${src}"></iframe>`,
      }}
    >
      {children}
    </EmbedIframeRoot>
  );
};
export default EmbedIframe;
