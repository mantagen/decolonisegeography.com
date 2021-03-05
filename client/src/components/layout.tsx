import React, { Fragment } from "react";
import styled from "styled-components";

import "@fontsource/lato";
import "@fontsource/lato/700.css";
import "@fontsource/lora";
import "@fontsource/playfair-display/700-italic.css";
import "@fontsource/playfair-display/900.css";

import GlobalStyle, { BREAK_POINT_M_PX } from "./global-style";
import Nav from "./nav";
import { Link } from "gatsby";
import { colours } from "../theme";
import logo from "../../static/images/logo-105x105.png";
import SrOnly from "./sr-only";

const SiteHeader = styled.header`
  padding: 0 1rem;
  position: fixed;
  top: 0;
  right: 0;
  left: 0;
  z-index: 1;
  pointer-events: none;
  user-select: none;
  background-color: transparent;
  display: flex;
  align-items: center;
`;
const SiteTitle = styled.span`
  font-size: 1.2rem;

  @media (min-width: ${BREAK_POINT_M_PX}px) {
    font-size: 2rem;
  }
`;
const HomeLink = styled(Link)`
  display: flex;
  align-items: center;
  pointer-events: auto;
`;

const SiteLogo = styled.img`
  height: 6rem;
  min-width: 0;
  padding: 0.5rem 0;
  margin-right: 1rem;
`;
const SiteMain = styled.main`
  margin: 6rem 1rem;
  display: flex;
  flex-direction: column;
  flex-grow: 1;
`;

const NoContent = styled.div`
  font-size: 1rem;
  flex: auto;
  display: flex;
  align-items: center;
  justify-content: center;
  color: ${colours.textGrey};
`;

const Layout: React.FC = props => {
  const { children } = props;

  return (
    <Fragment>
      <GlobalStyle />
      <SiteHeader>
        <HomeLink to="/">
          <SiteLogo src={logo} alt="Decolonising Geography Logo" />
          <SiteTitle>
            <SrOnly>Decolonising Geography</SrOnly>
          </SiteTitle>
        </HomeLink>
        <Nav />
      </SiteHeader>

      <SiteMain>
        {children ? children : <NoContent>Watch this space!</NoContent>}
      </SiteMain>
    </Fragment>
  );
};

export default Layout;
