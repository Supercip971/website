// pages/_document.js
import { Html, Head, Main, NextScript } from 'next/document'


export default function Document() {

  /* YES I know, I should use next/font, but I don't know why, but some characters like the arrow don't work with it. */
  return (
    <Html lang='en-US'>
      <Head>


        
      <link rel="preconnect" href="https://fonts.googleapis.com"/>
      <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin/>
      <link href="https://fonts.googleapis.com/css2?family=Inter:wght@100;200;300;400;500;600;700;800;900&display=swap" rel="stylesheet"/>
  
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  )
}