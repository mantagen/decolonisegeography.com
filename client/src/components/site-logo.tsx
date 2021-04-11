import React from "react";
import styled from "styled-components";
import useWindowScroll from "react-use/lib/useWindowScroll";

import logo from "../../static/images/logo-105x105.png";

const SiteLogoImg = styled.img<{ transformScale: number }>`
  height: 6rem;
  min-width: 0;
  padding: 0.5rem 0;
  margin-right: 1rem;
  z-index: 1;
  position: relative;

  transform-origin: top left;
  transform: scale(${props => props.transformScale});
  transition: transform ease 0.1s;
`;

const SiteLogo: React.FC = props => {
  const { y } = useWindowScroll();

  const transformScale = Math.min(1, ((Math.max(68 - y, 0) / 68) * 1) / 3 + 2 / 3);

  return (
    <SiteLogoImg
      transformScale={transformScale}
      src={logo}
      alt="Decolonising Geography Logo"
      {...props}
    />
  );
};

export default SiteLogo;
