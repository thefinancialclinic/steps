import styledNormalize from 'styled-normalize';
import { injectGlobal } from 'styled-components';
import { baseSize, remCalc } from './type';

export default () => injectGlobal`
  ${styledNormalize}

  html, body {
    height: 100%;
    margin: 0;
  }

  body {
    background-color: #e8f5f9;
    color: #464646;
    font-family: 'Calibre', sans-serif;
    font-size: ${baseSize}px;
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

  h2 {
    font-size: ${remCalc(50)};
  }

  p {
    font-size: ${remCalc(18)};
    line-height: 1.5;
  }
`;
