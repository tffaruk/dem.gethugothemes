/* eslint-disable @next/next/no-before-interactive-script-outside-document */
import Footer from "components/Layouts/Footer";
import Header from "components/Layouts/Header";
import Head from "next/head";
import Script from "next/script";
import { useEffect, useState } from "react";
import styles from "styles/header.module.scss";
import config from "config/config.json";
import { useRouter } from "next/router";

const Layout = ({
  children,
  title,
  description,
  image,
  meta_title,
  noindex,
}) => {
  const [isFixed, setIsFixed] = useState(false);
  const [isOpen, setIsopen] = useState(false);
  const toggle = () => {
    setIsopen(!isOpen);
  };

  useEffect(() => {
    const changeBackground = () => {
      if (window.pageYOffset >= 500) {
        setIsFixed(true);
      } else {
        setIsFixed(false);
      }
    };

    window.addEventListener("scroll", changeBackground);
  });

  const { site_url, meta_image, meta_description, meta_author } =
    config.parameter;
  const router = useRouter();

  return (
    <div className={`body ${isFixed ? styles.navigationFixed : ""}`}>
      {/* <Image src={image} height={600} width={500} alt="alt" /> */}
      <Head>
        {/* meta_title? meta_title : title */}
        <title>{meta_title ? meta_title : title}</title>

        {/* canonical url */}
        <link
          rel="canonical"
          href={`${site_url}${router.asPath}`}
          itemProp="url"
        />

        {/* responsive meta */}
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1, maximum-scale=5"
        />

        {/* noindex robots */}
        {noindex && <meta name="robots" content="noindex" />}

        {/* description ? description : first 120 char from content */}
        <meta
          name="description"
          content={description ? description : meta_description}
        />

        {/* author from config.json */}
        <meta name="author" content={meta_author} />

        {/* meta_title? meta_title : title */}
        <meta property="og:title" content={meta_title ? meta_title : title} />

        {/* description ? description : first 120 char from content */}
        <meta
          property="og:description"
          content={description ? description : meta_description}
        />
        <meta property="og:type" content="website" />
        <meta property="og:url" content={`${site_url}${router.asPath}`} />

        {/* meta_title? meta_title : title */}
        <meta name="twitter:title" content={meta_title ? meta_title : title} />

        {/* description ? description : first 120 char from content */}
        <meta
          name="twitter:description"
          content={description ? description : meta_description}
        />

        {/* image meta */}
        <meta
          property="og:image"
          content={image ? `${image}` : `${meta_image}`}
        />
        <meta
          name="twitter:image"
          content={image ? `${image}` : `${meta_image}`}
        />
        <meta name="twitter:card" content="summary_large_image" />

        {/* 
        <meta property="og:image:width" content="400" />
        <meta property="og:image:height" content="400" />
        <meta property="og:image:type" content="image/png" />
         */}
      </Head>
      <Header toggle={toggle} isOpen={isOpen} />
      {children}
      <Footer />

      {isFixed && (
        <Script
          id="thrivedesk-assistant"
          strategy="afterInteractive"
          dangerouslySetInnerHTML={{
            __html: `
              !function(t,e,n){function s(){const t=e.getElementsByTagName('script')[0],n=e.createElement('script');n.type='text/javascript',n.async=!0,n.src='https://assistant.thrivedesk.io/bootloader.js?'+Date.now(),t.parentNode.insertBefore(n,t)}if(t.Assistant=n=function(e,n,s){t.Assistant.readyQueue.push({method:e,options:n,data:s})},n.readyQueue=[],'complete'===e.readyState)return s();t.attachEvent?t.attachEvent('onload',s):t.addEventListener('load',s,!1)}(window,document,window.Assistant||function(){}),window.Assistant('init','9416737f-790d-4d29-bdab-9fb279b86962');
              `,
          }}
        />
      )}

      {/* netlify cms */}
      {/* <Script
        src="https://identity.netlify.com/v1/netlify-identity-widget.js"
        strategy="beforeInteractive"
      />
      <Script
        id="netlify-cms"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{
          __html: `
            if (window.netlifyIdentity) {
              window.netlifyIdentity.on("init", user => {
                if (!user) {
                  window.netlifyIdentity.on("login", () => {
                    document.location.href = "/admin/";
                  });
                }
              });
            }
          `,
        }}
      /> */}
    </div>
  );
};

export default Layout;
