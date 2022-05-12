/* eslint-disable @next/next/no-before-interactive-script-outside-document */
import { getAllData, getSingleFile } from "@/lib/pages";
import Banner from "components/HomePage/Banner";
import Features from "components/HomePage/Features";
import Service from "components/HomePage/Service";
import Posts from "components/HomePage/Posts";
import Showcase from "components/HomePage/Showcase";
import Testimonial from "components/HomePage/Testimonial";
import Layout from "components/Layouts/Layout";
import Script from "next/script";
import config from "../config/config.json";

const Home = ({
  homePageData,
  // testimonialData: { name, user },
  products,
  productIndex,
  // showcase,
  indexData,
}) => {
  const { banner, features, services } = homePageData.frontmatter;
  const { logo, title, meta_image, meta_description, site_url, meta_author } =
    config.parameter;

  return (
    <Layout
      title={indexData.frontmatter.title}
      description={indexData.frontmatter.description}
    >
      <Banner bannerData={banner} />
      <Posts productIndex={productIndex} products={products} />
      <Features featureData={features} />
      {/* <Testimonial name={name} user={user} /> */}
      {/* <Showcase showcase={showcase} /> */}
      <Service services={services} />
      <Script
        strategy="beforeInteractive"
        type="application/ld+json"
        id="schema-script"
        dangerouslySetInnerHTML={{
          __html: `
          {
            "@context": "https://schema.org",
            "@type": "CollectionPage",
            "@id": "${site_url}#webpage",
            "name": "${title}",
            "description": "${meta_description}",
            "image": "${meta_image}",
            "inLanguage": "en-US",
            "publisher": {
              "@type": "Organization",
              "name": "${meta_author}",
              "url": "${site_url}",
              "sameAs": ["https://www.facebook.com/gethugothemes","https://twitter.com/gethugothemes","https://www.github.com/gethugothemes"],
              "logo": {
                "@type": "ImageObject",
                "url": "${logo}"
              }
            }
          }
        `,
        }}
      />
    </Layout>
  );
};

export default Home;
export const getStaticProps = () => {
  const homePageData = getSingleFile("content/_index.md");
  // testiomial data
  // const testimonial = getSingleFile("content/testimonial.md");
  // const testimonialData = testimonial.frontmatter;
  // showcase data
  // const showcase = getSingleFile("content/showcase.md");
  // const showcaseData = showcase.frontmatter;
  const allProducts = getAllData("content/products", false);
  // _index data
  const productIndex = getSingleFile("content/products/_index.md");
  const indexData = getSingleFile("content/_index.md");

  return {
    props: {
      homePageData: homePageData,
      // testimonialData: testimonialData,
      products: allProducts,
      productIndex: productIndex,
      // showcase: showcaseData,
      indexData: indexData,
    },
  };
};
