import { injectGlobal } from 'styled-components';

injectGlobal`
  html, body {
    height: 100%;
    margin: 0;
  }

  body {
    background-color: #e8f5f9;
    color: #464646;
    font-family: 'Calibre', sans-serif;
  }

  * {
    box-sizing: border-box;
  }

  #root {
    min-height: 100%;
  }

  h1, h2, h3, h4, h5 {
    font-family: 'Tiempos', serif;
  }
`;
