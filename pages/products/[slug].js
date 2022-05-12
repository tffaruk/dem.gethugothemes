import { getAllData, getAllDataSlug, getChangelogData } from "@/lib/pages";
import Iframe from "components/ProductSinglePage/Iframe";
import Layout from "components/Layouts/Layout";
import ProductCard from "components/ProductSinglePage/ProductCard";
import ThemeInfo from "components/ProductSinglePage/ThemeInfo";
import ProductDescription from "components/ProductSinglePage/ProductDescription";
import styles from "styles/singleDownload.module.scss";
import common from "styles/common.module.scss";
import singlePage from "styles/singleDownload.module.scss";
import Products from "components/Products";
import { useRouter } from "next/router";
import { useState, useEffect } from "react";
import { serialize } from "next-mdx-remote/serialize";
import { similerProduct, strip } from "@/lib/utils";
import rehypeSlug from "rehype-slug";
const SinglePage = ({
  slug,
  singleProduct,
  allProducts: { posts },
  changelogData,
  mdxSource,
}) => {
  const [showChangelog, setShowChangelog] = useState(false);
  console.log(singleProduct);
  const router = useRouter();
  useEffect(() => {
    if (router.query.changelog == "show") {
      setShowChangelog(true);
    }
  }, [router.query.changelog]);

  // similer products
  const similer_Products = similerProduct(posts, singleProduct, slug);
  // end

  const { title, meta_title, description, image, noindex } =
    singleProduct.frontmatter;
  // change log
  const changelog = changelogData.filter((c) => c.slug == slug);

  return (
    <Layout
      title={title}
      meta_title={meta_title}
      description={
        description ? description : strip(singleProduct.content.slice(0, 120))
      }
      image={image}
      noindex={noindex}
    >
      <section className={styles.productPageHeader}>
        <div className={`${common.container} container`}>
          <div className="row pb-5">
            <div className="col-lg-8">
              <Iframe singleProduct={singleProduct} />
              <ProductDescription
                singleProduct={singleProduct}
                mdxSource={mdxSource}
              />
            </div>
            <aside className={`col-lg-4 mt-5 mt-lg-0`}>
              <div className="ps-0 ps-xl-4">
                <div className={`${styles.productPageSidebar}`}>
                  <ProductCard singleProduct={singleProduct} />
                  <ThemeInfo
                    singleProduct={singleProduct}
                    changelogData={changelog}
                    showChangelog={showChangelog}
                  />
                </div>
              </div>
            </aside>
          </div>
        </div>
      </section>

      <section className={singlePage.relatedPost}>
        <div className={`${common.container} container`}>
          <div className="row">
            <div className="col-md-12 mb-5">
              <div className={`${common.sectionTitle} mt-5 pb-3 `}>
                <div className={`${common.textCenter} text-center`}>
                  <h2 className={common.title}>Related Themes</h2>
                </div>
              </div>
            </div>
          </div>
          <Products products={similer_Products.slice(0, 3)} />
        </div>
      </section>
    </Layout>
  );
};

export default SinglePage;
export const getStaticPaths = () => {
  const allProducts = getAllData("content/products", false);
  const { posts } = allProducts;

  const paths = posts.map((slug) => ({
    params: {
      slug: slug.slug,
    },
  }));
  return {
    paths,
    fallback: false,
  };
};

export const getStaticProps = async ({ params }) => {
  const { slug } = params;
  const slugData = getAllDataSlug("content/products", slug);

  const { content } = slugData;
  const options = {
    mdxOptions: {
      rehypePlugins: [rehypeSlug],
    },
  };
  const mdxSource = await serialize(content, options);

  const changelogData = getChangelogData();
  const allProducts = getAllData("content/products", false);
  return {
    props: {
      singleProduct: slugData,
      slug: slug,
      allProducts: allProducts,
      changelogData: changelogData,
      mdxSource: mdxSource,
    },
  };
};
