import { Html, Head, Main, NextScript } from "next/document";
import Script from "next/script";

export default function Document() {
  return (
    <Html>
      <Head>
        <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/css?family=Roboto:300,400,500,700&display=swap"
        />
        <link rel="stylesheet" href="/css/bootstrap.min.css" />
      </Head>
      <body>
        <Main />
        <NextScript />
        <Script
          src="/js/bootstrap.bundle.min.js"
          strategy="beforeInteractive"
        ></Script>
      </body>
    </Html>
  );
}
