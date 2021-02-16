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
import useFontsReady from "../helpers/use-fonts-ready";
import { colours } from "../theme";

const SiteHeader = styled.header`
  padding: 1rem;
  position: fixed;
  top: 0;
  right: 0;
  left: 0;
  z-index: 1;
  pointer-events: none;
  user-select: none;
  background-color: ${colours.white};
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
  const fontsReady = useFontsReady();

  return (
    <Fragment>
      <GlobalStyle />
      <SiteHeader>
        <SiteTitle>
          <Link to="/">Decolonise Geography</Link>
        </SiteTitle>
        <Nav />
      </SiteHeader>

      <SiteMain>
        {children ? children : <NoContent>Watch this space!</NoContent>}
      </SiteMain>
    </Fragment>
  );
};

export default Layout;
