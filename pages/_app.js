import "../styles/globals.scss";
import "styles/typo.scss";
import { AppWrapper } from "context/state";
import { useRouter } from "next/router";
import { useEffect } from "react";
import ErrorBoundary from "components/ErrorBoundary";
import TagManager from "react-gtm-module";
import config from "../config/config.json";

const tagManagerArgs = {
  gtmId: config.parameter.tag_manager_id,
};

function MyApp({ Component, pageProps }) {
  const router = useRouter();

  useEffect(() => {
    TagManager.initialize(tagManagerArgs);
  }, []);
  function ErrorFallback({ error, resetErrorBoundary }) {
    console.log("ccc", error);
    return (
      <div role="alert">
        <p>Something went wrong:</p>
        <pre>{error.message}</pre>
        <button onClick={resetErrorBoundary}>Try again</button>
      </div>
    );
  }
  return (
    <ErrorBoundary FallbackComponent={ErrorFallback}>
      <AppWrapper>
        <Component {...pageProps} />
      </AppWrapper>
    </ErrorBoundary>
  );
}

export default MyApp;
