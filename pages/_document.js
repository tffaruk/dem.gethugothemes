import { Html, Head, Main, NextScript } from "next/document";
import config from "../config/config.json";

const Document = () => {
  const { parameter } = config;
  return (
    <Html>
      <Head>
        <link rel="icon" href={parameter.favicon} />
      </Head>
      <body>
        <Main />
        <NextScript />

        <div id="root"></div>
      </body>
    </Html>
  );
};

export default Document;
