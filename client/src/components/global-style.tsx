import { createGlobalStyle } from "styled-components";
import { colours } from "../theme";

export const BREAK_POINT_S_PX = 480;
export const BREAK_POINT_M_PX = 760;

const GlobalStyle = createGlobalStyle`
  html {
    -webkit-box-sizing: border-box;
    -moz-box-sizing: border-box;
    box-sizing: border-box;
    -webkit-tap-highlight-color: transparent;
  }
  *,
  *:before,
  *:after {
    -webkit-box-sizing: inherit;
    -moz-box-sizing: inherit;
    box-sizing: inherit;
  }
  body {
    margin: 0;
  }
  html {
    margin: 0;
    padding: 0;
    font-family: "Lora";
    color: ${colours.black};

    font-size: 100%;
    overflow-wrap: break-word;

    @media(min-width: ${BREAK_POINT_S_PX}px) {
      font-size: 131.25%;
    }
  }
  h1,
  h2,
  h3,
  h4,
  h5,
  h6 {
    font-size: 1em;
    font-weight: normal;
    margin: 0;
  }
  a {
    font-family: inherit;
    color: inherit;
    text-decoration: none;
  }
  button {
    &:hover {
      cursor: pointer;
    }
  }
  img {
    max-width: 100%;
  }
  ul {
    list-style-type: none;
    padding: 0;
    margin: 0;
  }
  .spacer {
    margin-left: 6px;
  }
  p {
    margin: 0;
    word-break: break-word;
  }

  ::selection {
    background-color: ${colours.lavendar};
  }
  
  mark {
    background-color: ${colours.yellow};
    color: ${colours.textGrey}; 
  }

  // Ensure full-height flex in React-land
  html {
    height: 100%;
    display: flex;
    flex-direction: column;
  }
  body, #___gatsby, #gatsby-focus-wrapper {
    display: flex;
    flex-direction: column;
    flex-grow: 1;
  }

`;

export default GlobalStyle;
