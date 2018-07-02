import styledNormalize from 'styled-normalize';
import { injectGlobal } from 'styled-components';
import { baseSize, remCalc, serif, sansSerif } from './type';

export default () => injectGlobal`
  ${styledNormalize}

  @font-face {
    font-family: 'Tiempos';
    src: url('${require('../assets/tiempos/TiemposTextWeb-Regular.eot')}?#iefix') format('embedded-opentype'),
         url('${require('../assets/tiempos/TiemposTextWeb-Regular.woff')}') format('woff');
    font-weight: 500;
    font-style: normal;
  }
  @font-face {
    font-family: 'Tiempos';
    src: url('${require('../assets/tiempos/TiemposTextWeb-RegularItalic.eot')}?#iefix') format('embedded-opentype'),
         url('${require('../assets/tiempos/TiemposTextWeb-RegularItalic.woff')}') format('woff');
    font-weight: 500;
    font-style: italic;
  }
  @font-face {
    font-family: 'Tiempos';
    src: url('${require('../assets/tiempos/TiemposTextWeb-Semibold.eot')}?#iefix') format('embedded-opentype'),
         url('${require('../assets/tiempos/TiemposTextWeb-Semibold.woff')}') format('woff');
    font-weight: 700;
    font-style: normal;
  }
  @font-face {
    font-family: 'Tiempos';
    src: url('${require('../assets/tiempos/TiemposTextWeb-SemiboldItalic.eot')}?#iefix') format('embedded-opentype'),
         url('${require('../assets/tiempos/TiemposTextWeb-SemiboldItalic.woff')}') format('woff');
    font-weight: 700;
    font-style: italic;
  }
  @font-face {
    font-family: 'Calibre';
    src: url('${require('../assets/calibre/CalibreWeb-Regular.eot')}?#iefix') format('embedded-opentype'),
         url('${require('../assets/calibre/CalibreWeb-Regular.woff')}') format('woff');
    font-weight: 500;
    font-style: normal;
  }
  @font-face {
    font-family: 'Calibre';
    src: url('${require('../assets/calibre/CalibreWeb-Medium.eot')}?#iefix') format('embedded-opentype'),
         url('${require('../assets/calibre/CalibreWeb-Medium.woff')}') format('woff');
    font-weight: 700;
    font-style: normal;
  }

  html, body {
    height: 100%;
    margin: 0;
  }

  body {
    background-color: #e8f5f9;
    color: #464646;
    font-family: ${sansSerif};
    font-size: ${baseSize}px;
  }

  * {
    box-sizing: border-box;
  }

  #root {
    min-height: 100%;
  }

  h1, h2, h3, h4, h5 {
    font-family: ${serif};
  }

  h2 {
    font-size: ${remCalc(50)};
  }

  p {
    color: #333333;
    font-size: ${remCalc(18)};
    line-height: 1.5;
  }
`;
