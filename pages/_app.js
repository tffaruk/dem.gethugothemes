import "../styles/globals.scss";
import "styles/typo.scss";
import { AppWrapper } from "context/state";
// import { useRouter } from "next/router";
import { useEffect } from "react";
// import * as gtag from "../lib/gtag";
// import Script from "next/script";
import TagManager from "react-gtm-module";
import config from "../config/config.json";

const tagManagerArgs = {
  gtmId: config.parameter.tag_manager_id,
};

function MyApp({ Component, pageProps }) {
  useEffect(() => {
    TagManager.initialize(tagManagerArgs);
  }, []);

  return (
    <AppWrapper>
      <Component {...pageProps} />
    </AppWrapper>
  );
}

export default MyApp;
