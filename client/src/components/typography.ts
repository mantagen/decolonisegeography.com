import styled, { css } from "styled-components";
import { BREAK_POINT_S_PX } from "./global-style";

export const articleContentCss = css`
  h1,
  h2,
  p,
  i,
  a,
  .first-letter,
  .authorName a {
    color: rgba(0, 0, 0, 0.84);
    text-rendering: optimizeLegibility;
  }

  h1 {
    font-family: "Playfair Display", serif;
    font-size: 2.2857rem; //48px
    text-align: left;
    margin-bottom: 0.16666667em;
  }

  h2,
  h3,
  h4,
  h5,
  h6 {
    font-family: "Lato", sans-serif;
    font-size: 1.2381rem; //26px
    font-weight: 700;
    padding: 0;
    margin: 2.15385em 0 -0.5em -0.072423em;
    text-align: left;
    line-height: 0.7536em;
    letter-spacing: -0.01731em;
  }

  p,
  i {
    margin-top: 1rem;
    font-size: 1rem;
    letter-spacing: -0.00115em;
    line-height: 1.58em;
  }

  a {
    text-decoration: underline;
  }

  ul {
    display: block;
    list-style-type: disc;
    margin-block-start: 1em;
    margin-block-end: 1em;
    margin-inline-start: 0px;
    margin-inline-end: 0px;
    padding-inline-start: 20px;

    @media (min-width: ${BREAK_POINT_S_PX}px) {
      padding-inline-start: 40px;
    }
  }
  li {
    margin-bottom: 0.5rem;
  }

  blockquote {
    font-family: "Playfair Display", serif;
    font-size: 1.4286rem;
    font-style: italic;
    letter-spacing: -0.36px;
    line-height: 1.48;
    overflow-wrap: break-word;
    margin: 1.833333em 0 1.1em 0;
    /* text-align: center; */
    color: rgba(0, 0, 0, 0.68);
    padding: 0 0 0 1.66667em;
  }

  figure {
    margin: 0;
    margin-block-start: 1em;
    margin-block-end: 1em;
    margin-inline-start: 0;
    margin-inline-end: 0;

    img {
      display: block;
      margin: 0 auto;
    }
  }

  code {
    font-size: 0.85714em;
    background: rgba(0, 0, 0, 0.05);
    border-radius: 2px;
    padding: 3px 5px;
  }

  mark,
  .highlighted {
    background: #7dffb3;
  }

  .first-letter {
    overflow-wrap: break-word;
    font-family: "Playfair Display", serif;
    font-size: 60px;
    line-height: 60px;
    display: block;
    position: relative;
    float: left;
    margin: 0px 7px 0 -5px;
  }
`;

export const H1 = styled.h1`
  font-family: "Playfair Display", serif;
  font-size: 2.2857rem; //48px
  text-align: left;
  margin-bottom: 0.16666667em;
`;

export const H2 = styled.h2`
  font-family: "Lato", sans-serif;
  font-size: 1.2381rem; //26px
  font-weight: 700;
  padding: 0;
  // margin: 2.15385em 0 -0.5em -0.072423em;
  text-align: left;
  // line-height: 0.7536em;
  letter-spacing: -0.01731em;
`;

export const Subtitle = styled.span`
  font-family: "Lato", sans-serif;
  color: rgba(0, 0, 0, 0.54);
  font-size: 1rem;
  line-height: 1.3em;
`;

export const P = styled.p`
  margin-top: 1rem;
  font-size: 1rem;
  letter-spacing: -0.00115em;
  line-height: 1.58em;
`;
