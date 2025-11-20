import { Global, css } from '@emotion/react';
import Jua from './fonts/'

function App() {
  return (
    <>
      <Global
  styles={css`
    @font-face {
      font-family: 'Jua';
      src: url('./fonts/Jua.otf') format('opentype');
      font-weight: normal;
      font-style: normal;
    }

    * {
      margin: 0;
      padding: 0;
      box-sizing: border-box;
    }

    body {
      font-family: 'Jua', sans-serif;
    }
  `}
/>
    </>
  );
}