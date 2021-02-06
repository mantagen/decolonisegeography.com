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

const SiteHeader = styled.header`
  padding: 1rem;
  position: fixed;
  top: 0;
  right: 0;
  left: 0;
  z-index: 1;
  pointer-events: none;
  user-select: none;
`;
const SiteTitle = styled.span`
  font-size: 1.2rem;
  pointer-events: auto;

  @media (min-width: ${BREAK_POINT_M_PX}px) {
    font-size: 2rem;
  }
`;
const SiteMain = styled.main`
  margin: 5rem 1rem;
  display: flex;
  flex-direction: column;
  flex-grow: 1;
`;

const Layout: React.FC = props => {
  return (
    <Fragment>
      <GlobalStyle />
      <SiteHeader>
        <SiteTitle>
          <Link to="/">Decolonise Geography</Link>
        </SiteTitle>
        <Nav />
      </SiteHeader>
      <SiteMain>{props.children}</SiteMain>
    </Fragment>
  );
};

export default Layout;
