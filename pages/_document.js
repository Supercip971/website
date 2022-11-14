// pages/_document.js
import { Html, Head, Main, NextScript } from 'next/document'


export default function Document() {

  /* YES I know, I should use next/font, but I don't know why, but some characters like the arrow don't work with it. */
  return (
    <Html lang='en-US'>
      <Head>


  
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  )
}