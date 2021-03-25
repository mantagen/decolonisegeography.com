import React from "react";
import styled from "styled-components";

import logo from "../../static/images/logo-105x105.png";

const SiteLogoImg = styled.img`
  height: 6rem;
  min-width: 0;
  padding: 0.5rem 0;
  margin-right: 1rem;
  z-index: 1;
  position: relative;
`;

const SiteLogo: React.FC = (props) => {
  return <SiteLogoImg src={logo} alt="Decolonising Geography Logo" {...props} />;
};

export default SiteLogo;
