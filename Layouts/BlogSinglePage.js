/* eslint-disable @next/next/no-before-interactive-script-outside-document */
import { dateFormat, readingTime, strip } from "@/lib/utils";
import common from "styles/common.module.scss";
import styles from "styles/blog.module.scss";
import { DiscussionEmbed } from "disqus-react";
import Layout from "components/Layouts/Layout";
import { MDXRemote } from "next-mdx-remote";
import Image from "next/image";
import { YouTubeLite } from "react-youtube-lite";
import Script from "next/script";
import config from "../config/config.json";

import {
  Button,
  A,
  Download,
  Demo,
  Align,
  Mockup,
  Bundle,
} from "components/MdxComponents";

const components = {
  Button,
  A,
  Download,
  Demo,
  Align,
  Image,
  Mockup,
  Bundle,
  YouTubeLite,
};

const BlogSinglePage = ({
  blog: { frontmatter, slug, content },
  mdxSource,
}) => {
  const { title, date, description, author, meta_title, image, noindex } =
    frontmatter;
  const { logo, site_url, meta_author } = config.parameter;

  return (
    <Layout
      title={title}
      meta_title={meta_title}
      description={description ? description : strip(content.slice(0, 120))}
      image={image}
      noindex={noindex}
    >
      <section className={`${styles.blogSinglePage} ${common.section}`}>
        <div className={`container ${common.container}`}>
          <div className="row justify-content-center">
            <div className="col-xl-8 col-lg-10">
              <h1 className={`${styles.blogSingleTitle} h2`}>{title}</h1>
              <div className={`${styles.postMeta} my-3`}>
                By {author}
                <span className="mx-3">|</span>
                <time className={`${styles.time} d-inline-block`}>
                  {dateFormat(date)}
                </time>
                <span className="mx-3">|</span>
                <span className="d-inline-block">{readingTime(content)}</span>
              </div>

              <article className={`${styles.block} mb-5`}>
                {image && (
                  <Image
                    width="1200"
                    height="600"
                    className="rounded w-100"
                    src={image}
                    alt={title}
                  />
                )}
                <div id="content" className={styles.entryContent}>
                  <MDXRemote {...mdxSource} components={components} />
                </div>
              </article>

              {/* disqus */}
              <DiscussionEmbed
                shortname="themefisher"
                config={{
                  url: `${site_url}${slug}`,
                  identifier: slug,
                  title: title,
                }}
              />
            </div>
          </div>
        </div>
      </section>
      <Script
        strategy="beforeInteractive"
        type="application/ld+json"
        id="schema-script"
        dangerouslySetInnerHTML={{
          __html: `
          {
            "@context": "https://schema.org",
            "@type": "Article",
            "@id": "${site_url}${slug}#content",
            "headline": "${title}",
            "description": "${
              description ? description : strip(content.slice(0, 120))
            }",
            "image": "${image}",
            "url": "${site_url}${slug}",
            "inLanguage": "en-US",
            "author": {
              "@type": "Person",
              "name": "${author}"
            },
            "publisher": {
              "@type": "Organization",
              "name": "${meta_author}",
              "url": "${site_url}",
              "sameAs": ["https://www.facebook.com/gethugothemes","https://twitter.com/gethugothemes","https://www.github.com/gethugothemes"],
              "logo": {
                "@type": "ImageObject",
                "url": "${logo}"
              }
            },
            "datePublished": "${date}"
          }
        `,
        }}
      />
    </Layout>
  );
};

export default BlogSinglePage;
