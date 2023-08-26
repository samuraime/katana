import { createGlobalStyle } from 'styled-components';
import { background, fontFamily, textColor } from './variables';

export const GlobalStyle = createGlobalStyle`
  body {
    margin: 0;
    padding: 0;
    font-family: ${fontFamily.regular};
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    background: ${background};
    color: ${textColor.primary};
  }

  code {
    font-family: ${fontFamily.mono};
  }

  * {
    box-sizing: border-box;
  }

  h1,
  h2,
  h3,
  h4,
  h5,
  h6 {
    font-weight: 500;
    margin-top: 0;
    margin-bottom: 0;
  }

  p {
    margin: 0;
    line-height: 1.5;
  }

  ol,
  ul {
    padding-left: 0;
    margin-top: 0;
    margin-bottom: 0;
    list-style: none;
  }

  button {
    border: none;
  }

  a {
    color: ${textColor.secondary};
    text-decoration: none;

    &:hover {
      text-decoration: underline;
      color: ${textColor.primary};
    }
  }
`;
